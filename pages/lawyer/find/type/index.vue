<template>
	<HeaderClose title="전문가 찾기" />
	<div class="type-top-container">
		<img v-if="type === 3" src="/img/cow/cow-02.png" class="type-top-cow" />
		<img v-if="type === 2" src="/img/cow/cow-05.png" class="type-top-cow" />
		<img v-if="type === 1" src="/img/cow/cow-04.png" class="type-top-cow" />
		<p v-if="type === 0" class="type-top-title">
			아래의 3가지 유형 중 하나를 선택하세요
		</p>
	</div>
	<div class="type-bottom-container">
		<div
			v-if="type === 0 || type === 3"
			class="type-bottom-item"
			:class="{ active: type > 0 }"
			@click="handlerClickItem(3)"
		>
			<div class="type-item-left">
				<img src="/img/icon/pointer-blue-02.svg" />
				<div class="type-item-text">
					<p class="type-item-title">내가 직접 가격제안하기</p>
					<p class="type-item-subtitle">평균 공임료 내에서 가격제안하기</p>
				</div>
			</div>
			<div class="type-item-price">50만원부터~</div>
		</div>
		<div
			v-if="type === 0 || type === 2"
			class="type-bottom-item"
			:class="{ active: type > 0 }"
			@click="handlerClickItem(2)"
		>
			<div class="type-item-left">
				<img src="/img/icon/chart-blue.svg" />
				<div class="type-item-text">
					<p class="type-item-title">일반 등기프로 찾기</p>
					<p class="type-item-subtitle">모든 등기프로 참여 가능</p>
				</div>
			</div>
			<div class="type-item-price">60만원대</div>
		</div>
		<div
			v-if="type === 0 || type === 1"
			class="type-bottom-item"
			:class="{ active: type > 0 }"
			@click="handlerClickItem(1)"
		>
			<div class="type-item-left">
				<img src="/img/icon/medal-blue-02.svg" />
				<div class="type-item-text">
					<p class="type-item-title">프리미엄 등기프로 찾기</p>
					<p class="type-item-subtitle">법무사/변호사가 직접 출석하는 상품</p>
				</div>
			</div>
			<div class="type-item-price">70만원대</div>
		</div>
		<div v-if="type > 0" class="type-bottom-contents-container">
			<div v-if="type === 1" class="type-bottom-contents-text">
				프리미엄 서비스는 법무사 또는 변호사가 직접 잔금일에 출석하여 업무처리를
				진행하는 서비스입니다.
			</div>
			<div v-if="type === 2" class="type-bottom-contents-text">
				모든 전문가가 지원할 수 있습니다. 모두가 검증된 전문가이므로 안심하고
				맡기셔도 됩니다.
			</div>
			<div v-if="type === 3" class="type-bottom-contents-form">
				<p class="form-title mb11">제안하고 싶은 금액을 입력해주세요</p>
				<div
					class="form-input-container"
					:class="{ warning: isPriceWarningCheck }"
				>
					<input v-model="price" type="tel" placeholder="0" />
					<span>만원</span>
				</div>
				<p v-if="isPriceWarningCheck" class="form-warning-text mt11">
					제안할 수 있는 공임료의 최소금액은 50만원 이상
				</p>
			</div>
		</div>
	</div>
	<div v-if="type === 0" class="form-bottom-buttons">
		<p class="type-top-help-text">
			공과금을 제외한 법정보수는 <b>100만원</b> 입니다.
		</p>
	</div>
	<div v-if="type > 0" class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="뒤로"
			progress-color="#d9d9d9"
			@click-button="handlerClickBackButton"
		/>
		<ProgressBackgroundButton
			title="선택하기"
			@click-button="toggleLawyerFindTypeCompleteModal"
		/>
	</div>
	<LawyerFindTypeCompleteModal
		v-if="isLawyerFindTypeCompleteModalShow"
		@close-modal="toggleLawyerFindTypeCompleteModal"
		@click-apply-button="handlerClickApplyButton"
	/>
</template>

<!-- 
	type
	1: 프리미엄
	2: 일반
	3: 직접제안
 -->

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import LawyerFindTypeCompleteModal from '~/components/modal/LawyerFindTypeCompleteModal.vue';

import { keyupToLocaleString } from '~/assets/js/utils.js';

const type = ref(0);

const handlerClickItem = idx => {
	type.value = idx;
};
const handlerClickBackButton = () => {
	type.value = 0;
};

const price = ref('');
watch(
	() => price.value,
	() => {
		price.value = keyupToLocaleString(price.value);
	},
);

const isPriceWarningCheck = computed(
	() => price.value !== '' && parseInt(price.value) < 50,
);

const isLawyerFindTypeCompleteModalShow = ref(false);
const toggleLawyerFindTypeCompleteModal = () => {
	isLawyerFindTypeCompleteModalShow.value =
		!isLawyerFindTypeCompleteModalShow.value;
};

const router = useRouter();
const handlerClickApplyButton = () => {
	router.push('/lawyer/find/complete');
};
</script>

<style lang="scss" scoped>
.type-top-container {
	padding: 27px 14px 14px;
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
	width: 180px;
	height: auto;
	margin: 85px 0 88px;
}
.type-bottom-container {
	display: flex;
	flex-direction: column;
	border-top: 1px solid #e1e1e1;
	margin-bottom: 52px;
}
.type-bottom-item {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	border-bottom: 1px solid #e1e1e1;
	padding: 22px 26px 30px;
	cursor: pointer;
	&.active {
		border-bottom: none;
	}
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
	padding: 30px 15px;
}
.type-bottom-contents-text {
	padding: 20px 13px;
	background-color: #f6f6f6;
	font-size: 13px;
	line-height: 26px;
	word-break: keep-all;
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
	text-align: center;
}
</style>
