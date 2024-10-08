<template>
	<HeaderClose title="등기프로 찾기" />
	<div class="preview-container">
		<div v-if="firmCode !== undefined" class="preview-section">
			<p class="preview-title mb12">선택 사무소</p>
			<ExpertListItem :item="lawyerDetail" />
		</div>
		<div class="preview-section">
			<p class="preview-title mb20">선택한 서비스</p>
			<div class="preview-service-column">
				<p class="preview-service-title">서비스 유형</p>
				<p class="preview-service-content">{{ serviceTypeText }}</p>
			</div>
			<div class="preview-service-column">
				<p class="preview-service-title">보수금액</p>
				<p class="preview-service-content">{{ serviceAmountText }}</p>
			</div>
		</div>
		<div class="preview-section">
			<p class="preview-title mb10">입력한 계약정보</p>
			<div class="preview-info-container">
				<p class="preview-name">
					{{ useAuth.user ? useAuth.user.profile.userName : '' }}
				</p>
				<p class="preview-address">
					{{ form.address }} {{ form.detailAddress }}
				</p>
				<div class="preview-file">
					<img src="/img/icon/folder-yellow.png" alt="매매계약서" />
					<p>매매계약서</p>
					<a :href="contractFileUrl" target="_blank">보기</a>
				</div>
				<p class="preview-price">
					<b>매매대금 {{ (Number(form.price) || 0).toLocaleString() }}</b> 원
				</p>
				<div v-if="props.ins === 'soda'" class="preview-date-column mt20">
					<img src="/img/icon/calendar-color.png" alt="계약일" />
					<p class="preview-date-title">계약일</p>
					<p class="preview-date-content">{{ form.cDate }}</p>
				</div>
				<div class="preview-date-column mt10">
					<img src="/img/icon/clock-color.png" alt="잔금일" />
					<p class="preview-date-title">잔금일</p>
					<p class="preview-date-content">{{ form.bDate }}</p>
				</div>
			</div>
		</div>
		<div class="preview-section">
			<p class="preview-help-text mt10">
				입력한 정보를 확인하고 완료버튼 눌러주세요
			</p>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="수정하기"
			progress-color="#d9d9d9"
			@click="handlerClickBackButton"
		/>
		<ProgressBackgroundButton
			v-if="mode === 'ESTIMATE'"
			title="완료"
			@click="toggleLawyerFindTypeCompleteModal"
		/>
		<ProgressBackgroundButton
			v-if="mode === 'PRO_CARD'"
			title="완료"
			@click="handlerClickApplyButton"
		/>
	</div>
	<LawyerFindTypeCompleteModal
		v-if="isLawyerFindTypeCompleteModalShow"
		@close-modal="toggleLawyerFindTypeCompleteModal"
		@click-apply-button="handlerClickApplyButton"
	/>
	<LawyerFindSelectCompleteModal
		v-if="isLawyerFindSelectCompleteModalShow"
		@close-modal="moveToContractList"
	/>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import ExpertListItem from '~/components/item/ExpertListItem.vue';
import HeaderClose from '~/components/layout/HeaderClose.vue';
import LawyerFindSelectCompleteModal from '~/components/modal/LawyerFindSelectCompleteModal.vue';
import LawyerFindTypeCompleteModal from '~/components/modal/LawyerFindTypeCompleteModal.vue';

import { usePageLeave } from '~/composables/usePageLeave.js';
import { getServiceType } from '~/assets/js/serviceType.js';
import {
	LAWTER_FIND_TYPE_KEY,
	LAWYER_FIND_TMP_KEY,
	BANK_AUTH_KEY,
} from '~/assets/js/storageKeys.js';
import { lawyerContract } from '~/services/lawyerContract.js';
import { useAuthStore } from '~/store/auth.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	middleware: 'auth',
});

const props = defineProps({
	ins: {
		type: String,
		default: 'soda',
	},
});

const route = useRoute();
const router = useRouter();

const loadingStore = useLoadingStore();
const useAuth = useAuthStore();
const alertStore = useAlertStore();

const mode = route.params.mode;
const firmCode = route.params.firmCode;

const tmpKey = ref('');
const form = ref({
	bDate: '',
	address: '',
	detailAddress: '',
	cDate: '',
	price: '',
	contract: '',
	contractUrl: '',
});
const lawyerDetail = ref({});
const typeObj = ref({
	type: 0,
	amount: 0,
});

usePageLeave();

onMounted(() => {
	if (props.ins === 'bank' && !window.localStorage.getItem(BANK_AUTH_KEY)) {
		router.go(-1);
	}

	const typeStorage = window.localStorage.getItem(LAWTER_FIND_TYPE_KEY);
	if (typeStorage) {
		typeObj.value = JSON.parse(typeStorage);
	}

	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);
	if (tmpKeyStorage) {
		tmpKey.value = tmpKeyStorage;
	}

	if (typeStorage && tmpKeyStorage) {
		loadingStore.setLoadingShow(true);
		lawyerContract
			.getLawyerContract({ tmpKey: tmpKey.value, mode }, props.ins)
			.then(({ data }) => {
				form.value.bDate = data.contract.bdate;
				form.value.address = data.contract.address;
				form.value.detailAddress = data.contract.detailAddress;
				form.value.cDate = data.contract.cdate;
				form.value.price = data.contract.price;
				form.value.contract = data.contract.contractFileName;
				form.value.contractUrl = data.contract.contractUrl;
				lawyerDetail.value = data.firm;
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
			})
			.finally(() => {
				loadingStore.setLoadingShow(false);
			});
	} else {
		alertStore.open('잘못된 경로로 접근했네요. 다시 홈으로 돌아갈게요.');
		router.push('/');
	}
});

const serviceTypeText = computed(() => {
	return getServiceType(typeObj.value.type);
});
const serviceAmountText = computed(() => {
	return typeObj.value.type === 'CARD'
		? '협의완료'
		: `${(typeObj.value.amount * 10000).toLocaleString()}원`;
});

const contractFileUrl = computed(() => {
	const domain =
		location.href.includes('.local') || location.href.includes('dev.')
			? 'https://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';
	return `${domain}${form.value.contractUrl}`;
});

const isLawyerFindTypeCompleteModalShow = ref(false);
const toggleLawyerFindTypeCompleteModal = () => {
	isLawyerFindTypeCompleteModalShow.value =
		!isLawyerFindTypeCompleteModalShow.value;
};
const isLawyerFindSelectCompleteModalShow = ref(false);
const toggleLawyerFindSelectCompleteModal = () => {
	isLawyerFindSelectCompleteModalShow.value =
		!isLawyerFindSelectCompleteModalShow.value;
};

const handlerClickBackButton = () => {
	router.back();
};

const handlerClickApplyButton = () => {
	lawyerContract
		.doneLawyerContract(
			{
				tmpKey: tmpKey.value,
				formData: {
					serviceType: typeObj.value.type,
					servicePrice: typeObj.value.amount * 10000,
				},
			},
			props.ins,
		)
		.then(() => {
			window.localStorage.removeItem(LAWYER_FIND_TMP_KEY);
			window.localStorage.removeItem(LAWTER_FIND_TYPE_KEY);
			if (mode === 'PRO_CARD') {
				toggleLawyerFindSelectCompleteModal();
			} else {
				router.push(`/lawyer/find/complete/${props.ins}`);
			}
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const moveToContractList = () => {
	router.push('/user/contract-manage/list');
};
</script>

<style lang="scss" scoped>
.preview-container {
	padding: 0 20px 70px;
}
.preview-section {
	margin: 25px 0;
}
.preview-title {
	font-weight: $ft-bold;
}
.preview-service-column {
	display: flex;
	justify-content: space-between;
	align-items: center;
	& + .preview-service-column {
		margin-top: 8px;
	}
}
.preview-service-title {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #929292;
}
.preview-service-content {
	font-size: 14px;
	font-weight: $ft-bold;
}
.preview-info-container {
	padding: 16px 23px;
	border-radius: 14px;
	border: 1px solid #dadada;
	.preview-name {
		font-weight: $ft-bold;
	}
	.preview-address {
		font-size: 14px;
		color: #505050;
		margin: 15px 0;
	}
	.preview-file {
		display: flex;
		align-items: center;
		gap: 3px;
		& > img {
			width: 19px;
			height: auto;
		}
		& > p {
			font-size: 12px;
			font-weight: $ft-bold;
		}
		& > a {
			font-size: 12px;
			font-weight: $ft-bold;
			color: #097cff;
			text-decoration: underline;
			cursor: pointer;
			margin-left: 5px;
		}
	}
	.preview-price {
		padding-bottom: 5px;
		margin-top: 13px;
		font-size: 13px;
		color: #252525;
		font-weight: $ft-bold;
		text-align: right;
		border-bottom: 1px solid #dadada;
		& > b {
			font-size: 12px;
		}
	}
	.preview-date-column {
		display: flex;
		align-items: center;
		gap: 5px;
		& > img {
			width: 19px;
			height: auto;
		}
		& > p {
			font-size: 14px;
			font-weight: $ft-bold;
		}
		.preview-date-content {
			margin-left: 10px;
		}
	}
}
.preview-help-text {
	border-radius: 5px;
	background-color: #f6f6f6;
	line-height: 46px;
	text-align: center;
	font-size: 13px;
	font-weight: $ft-bold;
	color: #8b8b8b;
}
</style>
