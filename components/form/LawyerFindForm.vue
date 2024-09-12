<template>
	<div class="form-container">
		<p class="form-title mb11">잔금일자를 선택해주세요</p>
		<div class="form-input mb27">
			<input v-model="form['bDate']" type="date" placeholder="YYYY-MM-DD" />
		</div>
		<p class="form-title mb11">목적물 소재지를 입력해주세요</p>
		<div class="form-input pointer mb11" @click="handlerClickSearchAddress">
			<input
				v-model="form['address']"
				type="text"
				class="pointer"
				readonly
				placeholder="주소를 검색해주세요"
			/>
			<img src="/img/icon/search-black.svg" alt="주소검색" />
		</div>
		<div class="form-input mb27">
			<input
				v-model="form['detailAddress']"
				type="text"
				placeholder="상세주소를 입력해주세요"
			/>
		</div>
		<p class="form-title mb11">매매대금을 입력해주세요</p>
		<div class="form-input mb11">
			<input v-model="form['price']" type="tel" placeholder="0" />
			<span>원</span>
		</div>
		<p class="form-won-text">{{ won }} 원</p>
		<p class="form-title mt14 mb11">계약서 사진 업로드</p>
		<div class="form-input input-file mb11" @click="handlerClickContractFile">
			<input
				ref="contractFile"
				type="file"
				accept=".png, .gif, .jpg, .jpeg, .pdf"
				@change="handlerChangeContractFile"
			/>
			<p>{{ contractFileText }}</p>
			<img src="/img/icon/folder-black.svg" alt="계약서 사진 업로드" />
		</div>
		<p class="form-help-text">주민등록번호 뒷자리는 가려서 올려주세요</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="다음"
			:progress-width="(validateCount / 5) * 100"
			@click-button="handlerClickNextButton"
		/>
	</div>
	<LawyerFindOnlyOneModal
		v-if="isLawyerFindOnlyOneModalShow"
		@close-modal="() => router.replace('/user/contract-manage/list')"
	/>
	<LawyerFindMaxCountModal
		v-if="isLawyerFindMaxCountModalShow"
		@close-modal="() => router.replace('/user/contract-manage/list')"
	/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import LawyerFindMaxCountModal from '~/components/modal/LawyerFindMaxCountModal.vue';
import LawyerFindOnlyOneModal from '~/components/modal/LawyerFindOnlyOneModal.vue';

import {
	LAWTER_FIND_TYPE_KEY,
	LAWYER_FIND_TMP_KEY,
} from '~/assets/js/storageKeys.js';
import {
	convertToKoreanCurrency,
	keyupToLocaleString,
} from '~/assets/js/utils.js';
import { lawyerContract } from '~/services/lawyerContract.js';
import { useAuthStore } from '~/store/auth.js';
import { useAlertStore } from '~/store/alert.js';

const props = defineProps({
	mode: {
		type: String,
		default: 'ESTIMATE',
	},
	firmCode: {
		type: String,
		default: '',
	},
});

const router = useRouter();

const useAuth = useAuthStore();
const alertStore = useAlertStore();

const tmpKey = ref('');
const form = ref({
	bDate: '',
	address: '',
	detailAddress: '',
	price: '',
	contract: null,
});
const won = ref('');
const contractFile = ref(null);
const isLawyerFindOnlyOneModalShow = ref(false);
const isLawyerFindMaxCountModalShow = ref(false);

onMounted(() => {
	lawyerContract
		.checkValid()
		.then(({ data }) => {
			if (data.status === 'TRADING') {
				togglelawyerFindOnlyOneModal();
			} else if (data.status === 'LIMIT_OVER') {
				toggleLawyerFindMaxCountModal();
			} else {
				const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);
				if (tmpKeyStorage) {
					tmpKey.value = tmpKeyStorage;

					lawyerContract
						.getLawyerContract({ tmpKey: tmpKey.value, mode: props.mode })
						.then(({ data }) => {
							form.value.bDate = data.contract.bdate;
							form.value.address = data.contract.address;
							form.value.detailAddress = data.contract.detailAddress;
							form.value.price = data.contract.price;
							form.value.contract = data.contract.contractFileName;
						})
						.catch(e => {
							window.localStorage.removeItem(LAWYER_FIND_TMP_KEY);
							alertStore.open(e.response.data.message);
						});
				}
			}
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
});

watch(
	() => form.value.price,
	() => {
		form.value.price = keyupToLocaleString(form.value.price);
		won.value = convertToKoreanCurrency(form.value.price.replace(/,/gi, ''));
	},
);

const validateCount = computed(
	() => Object.values(form.value).filter(v => v !== '' && v !== null).length,
);

const isValidation = computed(
	() => validateCount.value === Object.values(form.value).length,
);

const contractFileText = computed(() =>
	!form.value.contract
		? '파일업로드'
		: typeof form.value.contract === 'object'
			? form.value.contract.name
			: form.value.contract,
);

const handlerClickSearchAddress = () => {
	new window.daum.Postcode({
		onComplete: function (data) {
			form.value.address = data.roadAddress;
		},
	}).open();
};

const handlerClickContractFile = () => {
	contractFile.value.click();
};
const handlerChangeContractFile = e => {
	const files = e.target.files;
	if (files.length === 0) return false;

	form.value.contract = files[0];
};

const handlerClickNextButton = () => {
	if (!isValidation.value) {
		if (form.value.bDate === '') {
			alertStore.open('잔금일자를 선택해주세요.');
		} else if (form.value.address === '' || form.value.detailAddress === '') {
			alertStore.open('목적물 소재지를 입력해주세요.');
		} else if (form.value.price === '') {
			alertStore.open('매매대금을 입력해주세요.');
		} else if (form.value.contract === null) {
			alertStore.open('계약서 사진을 등록해주세요.');
		}

		return false;
	}

	const formData = new FormData();
	formData.append('mode', props.mode);
	formData.append('detailAddress', form.value.detailAddress);
	formData.append('userId', useAuth.user.profile.userId);
	formData.append('price', form.value.price.replaceAll(',', ''));
	formData.append('bDate', form.value.bDate);
	formData.append('address', form.value.address);
	formData.append('firmCode', props.firmCode);
	if (typeof form.value.contract === 'object') {
		formData.append('contract', form.value.contract);
	}

	if (props.mode === 'PRO_CARD') {
		window.localStorage.setItem(
			LAWTER_FIND_TYPE_KEY,
			JSON.stringify({
				type: 'CARD',
				amount: 0,
			}),
		);
	}

	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);

	if (tmpKeyStorage) {
		lawyerContract
			.updateLawyerContract({ tmpKey: tmpKey.value, formData })
			.then(({ data }) => {
				window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
				router.push(
					props.mode === 'ESTIMATE'
						? '/lawyer/find/soda/type'
						: `/lawyer/find/PRO_CARD/preview/${props.firmCode}`,
				);
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
			});
	} else {
		lawyerContract
			.setLawyerContract(formData)
			.then(({ data }) => {
				window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
				router.push(
					props.mode === 'ESTIMATE'
						? '/lawyer/find/soda/type'
						: `/lawyer/find/PRO_CARD/preview/${props.firmCode}`,
				);
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
			});
	}
};

const togglelawyerFindOnlyOneModal = () => {
	isLawyerFindOnlyOneModalShow.value = !isLawyerFindOnlyOneModalShow.value;
};

const toggleLawyerFindMaxCountModal = () => {
	isLawyerFindMaxCountModalShow.value = !isLawyerFindMaxCountModalShow.value;
};
</script>

<style lang="scss" scoped>
.form-container {
	padding: 30px;
	margin-bottom: 56px;
}
</style>
