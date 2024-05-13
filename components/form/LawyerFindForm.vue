<template>
	<div class="form-container">
		<p class="form-title mb11">계약일자를 선택해주세요</p>
		<div class="form-input mb27">
			<input v-model="form['cDate']" type="date" />
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
			<img src="/img/icon/search-black.svg" />
		</div>
		<div class="form-input mb27">
			<input
				v-model="form['detailAddress']"
				type="text"
				placeholder="상세주소를 입력해주세요"
			/>
		</div>
		<p class="form-title mb11">잔금일자를 선택해주세요</p>
		<div class="form-input mb27">
			<input v-model="form['bDate']" type="date" />
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
				@change="handlerChangeContractFile"
			/>
			<p>{{ contractFileText }}</p>
			<img src="/img/icon/folder-black.svg" />
		</div>
		<p class="form-help-text">주민번호 뒷자리는 가려서 올려주세요</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="다음"
			:progress-width="(validateCount / 6) * 100"
			@click-button="handlerClickNextButton"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import {
	keyupToLocaleString,
	convertToKoreanCurrency,
} from '~/assets/js/utils.js';
import { lawyerContract } from '~/services/lawyerContract.js';
import { useAuthStore } from '~/store/auth.js';
import { LAWYER_FIND_TMP_KEY } from '~/assets/js/storageKeys.js';

const props = defineProps({
	mode: {
		type: String,
		default: 'ESTIMATE',
	},
});

const tmpKey = ref('');
const form = ref({
	bDate: '',
	address: '',
	detailAddress: '',
	cDate: '',
	price: '',
	contract: null,
});
const won = ref('');

onMounted(() => {
	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);
	if (tmpKeyStorage) {
		tmpKey.value = tmpKeyStorage;

		lawyerContract
			.getLawyerContract({ tmpKey: tmpKey.value, mode: props.mode })
			.then(({ data }) => {
				form.value.bDate = data.bdate;
				form.value.address = data.address;
				form.value.detailAddress = data.detailAddress;
				form.value.cDate = data.cdate;
				form.value.price = data.price;
				form.value.contract = data.contractFileName;
			})
			.catch(e => {
				alert(e.response.data.message);
			});
	}
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

const handlerClickSearchAddress = () => {
	new window.daum.Postcode({
		onComplete: function (data) {
			form.value.address = data.roadAddress;
		},
	}).open();
};

const contractFile = ref(null);
const handlerClickContractFile = () => {
	contractFile.value.click();
};
const handlerChangeContractFile = e => {
	const files = e.target.files;
	if (files.length === 0) return false;

	form.value.contract = files[0];
};
const contractFileText = computed(() =>
	!form.value.contract
		? '파일업로드'
		: typeof form.value.contract === 'object'
			? form.value.contract.name
			: form.value.contract,
);

const useAuth = useAuthStore();
const router = useRouter();
const handlerClickNextButton = () => {
	if (!isValidation.value) return false;

	const formData = new FormData();
	formData.append('mode', props.mode);
	formData.append('detailAddress', form.value.detailAddress);
	formData.append('userId', useAuth.user.profile.userId);
	formData.append('price', form.value.price.replaceAll(',', ''));
	formData.append('bDate', form.value.bDate);
	formData.append('cDate', form.value.cDate);
	formData.append('address', form.value.address);
	formData.append('firmCode', '');
	if (typeof form.value.contract === 'object') {
		formData.append('contract', form.value.contract);
	}

	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);
	if (tmpKeyStorage) {
		lawyerContract
			.updateLawyerContract({ tmpKey: tmpKey.value, formData })
			.then(({ data }) => {
				window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
				router.push(
					props.mode === 'ESTIMATE'
						? '/lawyer/find/type'
						: 'lawyer/find/preview',
				);
			})
			.catch(e => {
				alert(e.response.data.message);
			});
	} else {
		lawyerContract
			.setLawyerContract(formData)
			.then(({ data }) => {
				window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
				router.push(
					props.mode === 'ESTIMATE'
						? '/lawyer/find/type'
						: '/lawyer/find/preview',
				);
			})
			.catch(e => {
				alert(e.response.data.message);
			});
	}
};
</script>

<style lang="scss" scoped>
.form-container {
	padding: 30px;
	margin-bottom: 56px;
}
</style>
