<template>
	<HeaderClose title="등기프로 찾기" />
	<div class="preview-container">
		<div v-if="false" class="preview-section">
			<p class="preview-title">선택 사무소</p>
			<ExpertListItem />
		</div>
		<div class="preview-section">
			<p class="preview-title mb20">선택한 서비스</p>
			<div class="preview-service-column">
				<p class="preview-service-title">서비스 유형</p>
				<p class="preview-service-content">{{ serviceTypeText }}</p>
			</div>
			<div class="preview-service-column">
				<p class="preview-service-title">보수금액</p>
				<p class="preview-service-content">{{ typeObj.amount }}만원</p>
			</div>
		</div>
		<div class="preview-section">
			<p class="preview-title mb10">입력한 계약정보</p>
			<div class="preview-info-container">
				<p class="preview-name">{{ useAuth.user.profile.userName }}</p>
				<p class="preview-address">
					{{ form.address }} {{ form.detailAddress }}
				</p>
				<div class="preview-file">
					<img src="/img/icon/folder-yellow.png" />
					<p>매매계약서</p>
					<a :href="contractFileUrl" target="_blank">보기</a>
				</div>
				<p class="preview-price">
					<b>매매대금 {{ (Number(form.price) || 0).toLocaleString() }}</b> 원
				</p>
				<div class="preview-date-column mt20">
					<img src="/img/icon/calendar-color.png" />
					<p class="preview-date-title">계약일</p>
					<p class="preview-date-content">{{ form.cDate }}</p>
				</div>
				<div class="preview-date-column mt10">
					<img src="/img/icon/clock-color.png" />
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
			title="뒤로"
			progress-color="#d9d9d9"
			@click="handlerClickBackButton"
		/>
		<ProgressBackgroundButton
			title="완료"
			@click="toggleLawyerFindTypeCompleteModal"
		/>
	</div>
	<LawyerFindTypeCompleteModal
		v-if="isLawyerFindTypeCompleteModalShow"
		@close-modal="toggleLawyerFindTypeCompleteModal"
		@click-apply-button="handlerClickApplyButton"
	/>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertListItem from '~/components/item/ExpertListItem.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import LawyerFindTypeCompleteModal from '~/components/modal/LawyerFindTypeCompleteModal.vue';

import { useAuthStore } from '~/store/auth.js';
import { lawyerContract } from '~/services/lawyerContract.js';
import { getServiceType } from '~/assets/js/serviceType.js';
import {
	LAWYER_FIND_TMP_KEY,
	LAWTER_FIND_TYPE_KEY,
} from '~/assets/js/storageKeys.js';

definePageMeta({
	middleware: 'auth',
});

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
const typeObj = ref({
	type: 0,
	amount: 0,
});

const route = useRoute();
const router = useRouter();

const useAuth = useAuthStore();

onMounted(() => {
	const mode = route.params.mode;

	const typeStorage = window.localStorage.getItem(LAWTER_FIND_TYPE_KEY);
	if (typeStorage) {
		typeObj.value = JSON.parse(typeStorage);
	}

	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);
	if (tmpKeyStorage) {
		tmpKey.value = tmpKeyStorage;
	}

	if (typeStorage && tmpKeyStorage) {
		lawyerContract
			.getLawyerContract({ tmpKey: tmpKey.value, mode })
			.then(({ data }) => {
				form.value.bDate = data.bdate;
				form.value.address = data.address;
				form.value.detailAddress = data.detailAddress;
				form.value.cDate = data.cdate;
				form.value.price = data.price;
				form.value.contract = data.contractFileName;
				form.value.contractUrl = data.contractUrl;
			})
			.catch(e => {
				alert(e.response.data.message);
			});
	} else {
		alert('잘못된 경로로 접근했네요. 다시 홈으로 돌아갈게요.');
		router.push('/');
	}
});

const serviceTypeText = computed(() => {
	return getServiceType(typeObj.value.type);
});

const contractFileUrl = computed(() => {
	const domain =
		location.href.includes('.local') || location.href.includes('.dev')
			? 'https://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';
	return `${domain}${form.value.contractUrl}`;
});

const isLawyerFindTypeCompleteModalShow = ref(false);
const toggleLawyerFindTypeCompleteModal = () => {
	isLawyerFindTypeCompleteModalShow.value =
		!isLawyerFindTypeCompleteModalShow.value;
};

const handlerClickBackButton = () => {
	router.back();
};

const handlerClickApplyButton = () => {
	lawyerContract
		.doneLawyerContract({
			tmpKey: tmpKey.value,
			formData: {
				serviceType: typeObj.value.type,
				servicePrice: typeObj.value.amount * 10000,
			},
		})
		.then(() => {
			window.localStorage.removeItem(LAWYER_FIND_TMP_KEY);
			window.localStorage.removeItem(LAWTER_FIND_TYPE_KEY);
			router.push('/lawyer/find/complete');
		})
		.catch(e => {
			alert(e.response.data.message);
		});
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
