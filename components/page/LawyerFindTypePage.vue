<template>
	<HeaderClose title="서비스유형 선택하기" />
	<div v-if="type === ''" class="type-title-container">
		<p class="type-title-top">서비스 유형을<br />선택해 주세요</p>
		<p class="type-title-bottom mt12">
			공과금제외 시장가격은
			<span>{{ (legalpayPrice * 10000).toLocaleString() }}원</span>
		</p>
	</div>
	<div v-if="type !== ''" class="type-top-container">
		<img
			v-if="type === 'PASS'"
			src="/img/cow/cow-08.gif"
			class="type-top-cow"
			alt="소다패스 이미지"
		/>
		<img
			v-if="type === 'PREMIUM'"
			src="/img/cow/cow-11.png"
			class="type-top-cow"
			alt="프리미엄 이미지"
		/>
		<img
			v-if="type === 'NORMAL'"
			src="/img/cow/cow-10.png"
			class="type-top-cow"
			alt="일반 선택 이미지"
		/>
		<img
			v-if="type === 'OFFER'"
			src="/img/cow/cow-09.png"
			class="type-top-cow"
			alt="직접 선택 이미지"
		/>
	</div>
	<div v-if="type === ''" class="type-middle-container">
		<div class="type-middle-box">
			<div class="type-middle-help-text pb11 mb14">
				<p>하나부터 열까지 알아서 해주는 서비스</p>
				<img src="/img/icon/lightning.svg" alt="소다패스" />
			</div>
			<div
				class="type-middle-item select-none"
				@click="handlerClickItem('PASS')"
			>
				<i
					class="type-middle-item-circle"
					:class="{ 'active-2': type === 'PASS' }"
				></i>
				<div class="type-middle-item-content">
					<div class="type-middle-item-top">
						<div class="type-middle-item-title">
							<p>SODA 패스</p>
						</div>
						<div class="type-middle-item-price">
							<b>{{ passPrice }}</b> 만원
						</div>
					</div>
					<p class="type-middle-item-bottom">
						등기소다가 할인견적으로 원스톱 자동배정
					</p>
				</div>
			</div>
		</div>
		<div class="type-middle-box">
			<div class="type-middle-help-text mb12 pb12">
				<p>직접 가격 제안하고 선택하는 서비스</p>
			</div>
			<div
				class="type-middle-item select-none mt12"
				@click="handlerClickItem('OFFER')"
			>
				<i
					class="type-middle-item-circle"
					:class="{ 'active-2': type === 'OFFER' }"
				></i>
				<div class="type-middle-item-content">
					<div class="type-middle-item-top">
						<div class="type-middle-item-title">
							<p>내가 직접 가격 제안</p>
						</div>
						<div class="type-middle-item-price">
							<b>{{ offerPrice }}</b> 만원부터~
						</div>
					</div>
					<p class="type-middle-item-bottom">내가 제안한 가격으로 모집 시작</p>
				</div>
			</div>
			<div
				class="type-middle-item select-none mt32"
				@click="handlerClickItem('NORMAL')"
			>
				<i
					class="type-middle-item-circle"
					:class="{ 'active-2': type === 'NORMAL' }"
				></i>
				<div class="type-middle-item-content">
					<div class="type-middle-item-top">
						<div class="type-middle-item-title">
							<p>일반 견적으로 제안</p>
						</div>
						<div class="type-middle-item-price">
							<b>{{ normalPrice }}</b> 만원
						</div>
					</div>
					<p class="type-middle-item-bottom">모두가 좋아하는 등기소다 베스트</p>
				</div>
			</div>
			<div
				class="type-middle-item select-none mt32"
				@click="handlerClickItem('PREMIUM')"
			>
				<i
					class="type-middle-item-circle"
					:class="{ 'active-2': type === 'PREMIUM' }"
				></i>
				<div class="type-middle-item-content">
					<div class="type-middle-item-top">
						<div class="type-middle-item-title">
							<p>프리미엄 견적으로 제안</p>
						</div>
						<div class="type-middle-item-price">
							<b>{{ premiumPrice }}</b> 만원
						</div>
					</div>
					<p class="type-middle-item-bottom">법무사/변호사가 직접 출석</p>
				</div>
			</div>
		</div>
	</div>
	<div v-if="type !== ''" class="type-bottom-container">
		<div v-if="type === 'PASS'" class="type-bottom-item">
			<i class="type-middle-item-circle active"></i>
			<div class="type-middle-item-content">
				<div class="type-middle-item-top">
					<div class="type-middle-item-title">
						<p>SODA 패스</p>
						<img src="/img/icon/lightning.svg" alt="소다패스" />
					</div>
					<div class="type-middle-item-price">
						<b>{{ passPrice }}</b> 만원
					</div>
				</div>
				<p class="type-middle-item-bottom">
					등기소다가 할인견적으로 원스톱 자동배정
				</p>
			</div>
		</div>
		<div v-if="type === 'OFFER'" class="type-bottom-item">
			<i class="type-middle-item-circle active"></i>
			<div class="type-middle-item-content">
				<div class="type-middle-item-top">
					<div class="type-middle-item-title">
						<p>내가 직접 가격 제안</p>
					</div>
					<div class="type-middle-item-price">
						<b>{{ offerPrice }}</b> 만원부터~
					</div>
				</div>
				<p class="type-middle-item-bottom">내가 제안한 가격으로 모집 시작</p>
			</div>
		</div>
		<div v-if="type === 'NORMAL'" class="type-bottom-item">
			<i class="type-middle-item-circle active"></i>
			<div class="type-middle-item-content">
				<div class="type-middle-item-top">
					<div class="type-middle-item-title">
						<p>일반 견적으로 제안</p>
					</div>
					<div class="type-middle-item-price">
						<b>{{ normalPrice }}</b> 만원
					</div>
				</div>
				<p class="type-middle-item-bottom">모두가 좋아하는 등기소다 베스트</p>
			</div>
		</div>
		<div v-if="type === 'PREMIUM'" class="type-bottom-item">
			<i class="type-middle-item-circle active"></i>
			<div class="type-middle-item-content">
				<div class="type-middle-item-top">
					<div class="type-middle-item-title">
						<p>프리미엄 견적으로 제안</p>
					</div>
					<div class="type-middle-item-price">
						<b>{{ premiumPrice }}</b> 만원
					</div>
				</div>
				<p class="type-middle-item-bottom">법무사/변호사가 직접 출석</p>
			</div>
		</div>
		<div v-if="type !== ''" class="type-bottom-contents-container">
			<div v-if="type === 'PREMIUM'" class="type-bottom-contents-text">
				법무사, 변호사 자격자 본인이<br />직접 현장에 방문하여 업무를
				수행합니다.
			</div>
			<div v-if="type === 'NORMAL'" class="type-bottom-contents-text">
				등기소다의 모든 등기프로가 지원할 수 있습니다.<br />모두가 검증된
				전문가이므로 안심하고 맡겨주세요.
			</div>
			<div v-if="type === 'OFFER'" class="type-bottom-contents-form">
				<p class="form-title mb11">
					소다에서 제안하는 금액은 {{ normalPrice }}만원 입니다.
				</p>
				<div
					class="form-input-container"
					:class="{ warning: isPriceWarningCheck }"
				>
					<input v-model="price" type="tel" placeholder="0" />
					<span>만원</span>
				</div>
				<p v-if="isPriceWarningCheck" class="form-warning-text mt11">
					제안할 수 있는 최소금액 이상 입력해주세요
				</p>
			</div>
			<div v-if="type === 'PASS'" class="type-bottom-contents-text">
				등기프로 선택절차를 생략하고 할인된 견적으로<br />등기프로를 자동배정
				(통상 1일이내)합니다.
			</div>
		</div>
	</div>
	<div v-if="type !== ''" class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="뒤로"
			progress-color="#d9d9d9"
			@click-button="handlerClickBackButton"
		/>
		<ProgressBackgroundButton
			title="선택하기"
			@click-button="handlerClickApplyButton"
		/>
	</div>
</template>

<!-- 
	type
	1: 프리미엄
	2: 일반
	3: 직접제안
	4: 로켓진행 (소다패스)
 -->

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import HeaderClose from '~/components/layout/HeaderClose.vue';

import { usePageLeave } from '~/composables/usePageLeave.js';
import { BANK_AUTH_KEY, LAWYER_FIND_TMP_KEY } from '~/assets/js/storageKeys.js';
import { keyupToLocaleString } from '~/assets/js/utils.js';
import { calculate } from '~/services/calculate.js';
import { lawyerContract } from '~/services/lawyerContract.js';
import { useAlertStore } from '~/store/alert.js';

const props = defineProps({
	ins: {
		type: String,
		default: 'soda',
	},
});

const emit = defineEmits(['click-apply-button']);

const router = useRouter();
const route = useRoute();

const alertStore = useAlertStore();

const offerPrice = ref(0);
const normalPrice = ref(0);
const premiumPrice = ref(0);
const passPrice = ref(0);
const legalpayPrice = ref(0);

usePageLeave();

onMounted(() => {
	if (route.params.id) {
		lawyerContract
			.getLawyerContractTmpKey(route.params.id)
			.then(({ data }) => {
				window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
				callApi();
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
				window.localStorage.removeItem(BANK_AUTH_KEY);
				router.go(0);
			});
	} else {
		callApi();
	}
});

const callApi = () => {
	const tmpKeyStorage = window.localStorage.getItem(LAWYER_FIND_TMP_KEY);

	if (tmpKeyStorage) {
		calculate
			.type({ tmpKey: tmpKeyStorage }, props.ins)
			.then(({ data }) => {
				offerPrice.value = data.serviceType.OFFER / 10000;
				normalPrice.value = data.serviceType.NORMAL / 10000;
				premiumPrice.value = data.serviceType.PREMIUM / 10000;
				passPrice.value = data.serviceType.PASS / 10000;
				legalpayPrice.value = data.serviceType.LEGALPAY / 10000;
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
			});
	} else {
		alertStore.open('잘못된 경로로 접근했네요. 다시 홈으로 돌아갈게요.');
		location.href = '/';
	}
};

const type = ref('');
const amount = ref(0);

const handlerClickItem = val => {
	if (val === 'PREMIUM') {
		amount.value = premiumPrice.value;
	} else if (val === 'NORMAL') {
		amount.value = normalPrice.value;
	} else if (val === 'PASS') {
		amount.value = passPrice.value;
	} else {
		amount.value = 0;
	}
	type.value = val;
};
const handlerClickBackButton = () => {
	type.value = '';
	price.value = '';
};

const price = ref('');
watch(
	() => price.value,
	() => {
		price.value = keyupToLocaleString(price.value);
		amount.value =
			price.value === '0' ? 0 : Number(price.value.replaceAll(',', ''));
	},
);

const isPriceWarningCheck = computed(
	() => price.value !== '' && parseInt(amount.value) < offerPrice.value,
);

const isValidateNextStep = computed(
	() =>
		(type.value !== 'OFFER' && amount.value > 0) ||
		(type.value === 'OFFER' && amount.value >= offerPrice.value),
);

const handlerClickApplyButton = () => {
	if (!isValidateNextStep.value) return false;
	emit('click-apply-button', type.value, amount.value);
};
</script>

<style lang="scss" scoped>
.type-title-container {
	padding: 33px 25px 56px;
}
.type-title-top {
	font-size: 26px;
	font-weight: $ft-bold;
}
.type-title-bottom {
	font-weight: $ft-bold;
	color: #818181;
	& > span {
		color: #29cdff;
	}
}
.type-middle-help-text {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #efefef;
	& > img {
		width: 18px;
		height: 18px;
	}
	& > p {
		font-weight: $ft-bold;
		color: #0a7aff;
	}
}
.type-top-container {
	padding: 0 0 34px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.type-top-title {
	font-size: 14px;
	font-weight: $ft-bold;
	color: #252525;
	width: 100%;
	text-align: left;
}
.type-top-help-text {
	width: 100%;
	border-radius: 5px;
	background: #f6f6f6;
	font-size: 13px;
	font-weight: $ft-bold;
	color: #888888;
	text-align: center;
	margin: 29px 15px;
	padding: 25px 0;
	& > b {
		color: #222222;
	}
}
.type-top-cow {
	width: 100%;
	height: auto;
	max-width: 480px;
}
.type-middle-container {
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 8px;
}
.type-middle-box {
	padding: 21px 24px;
	border: 1px solid #e8e8e8;
	border-radius: 9px;
}
.type-middle-item {
	padding: 22px 18px;
	border: 1px solid #e8e8e8;
	border-radius: 9px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	cursor: pointer;
	&.select-none {
		border: none;
		padding: 0;
		.type-middle-item-top {
			border: none;
			padding-bottom: 0;
		}
	}
}
.type-middle-item-circle {
	display: block;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid #e8e8e8;
	margin-right: 8px;
	margin-top: 3px;
	&.active {
		border-color: #29cdff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			background-color: #29cdff;
			border-radius: 50%;
		}
	}
	&.active-2 {
		border-color: #0a7aff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		&::before {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			background-color: #0a7aff;
			border-radius: 50%;
		}
	}
}
.type-middle-item-content {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.type-middle-item-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 10px;
	margin-bottom: 5px;
	border-bottom: 1px solid #efefef;
}
.type-middle-item-title {
	font-weight: $ft-bold;
	display: flex;
	align-items: center;
	& > img {
		margin-left: 2px;
	}
}
.type-middle-item-price {
	font-size: 18px;
	font-weight: $ft-bold;
	& > b {
		color: #29cbff;
	}
}
.type-middle-item-bottom {
	font-size: 14px;
	color: #878787;
}
.type-bottom-container {
	display: flex;
	flex-direction: column;
	border: 2px solid #29cdff;
	padding: 21px 18px 30px;
	border-radius: 10px;
	margin: 0 12px 80px;
}
.type-bottom-item {
	width: 100%;
	display: flex;
	cursor: pointer;
}
.type-item-left {
	flex: 1;
	display: flex;
	gap: 20px;
}
.type-item-text {
	display: flex;
	flex-direction: column;
}
.type-item-title {
	font-size: 14px;
	color: #252525;
	margin-top: 4px;
	line-height: 16px;
}
.type-item-subtitle {
	font-size: 12px;
	color: #a3a3a3;
	line-height: 17px;
}
.type-item-price {
	font-size: 14px;
	font-weight: $ft-bold;
	color: #252525;
	margin-top: 4px;
}
.type-bottom-contents-container {
	padding-top: 40px;
}
.type-bottom-contents-text {
	padding: 11px 13px;
	background-color: #f6f6f6;
	font-size: 13px;
	line-height: 26px;
	word-break: keep-all;
	text-align: center;
}
.type-bottom-contents-form {
	.form-title {
		text-align: center;
	}
}
.form-input-container {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 6px;
	border-radius: 30px;
	border: 1px solid #c5c6cc;
	padding: 13px 20px;
	&.warning {
		border-color: #f00000;
	}
	& > input {
		width: 180px;
		border: none;
		font-size: 20px;
		font-weight: $ft-bold;
		color: #29cdff;
		text-align: right;
	}
	& > span {
		line-height: 20px;
		margin-bottom: 4px;
	}
}
.form-warning-text {
	font-size: 14px;
	color: #f00000;
	text-align: right;
}
</style>
