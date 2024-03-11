<template>
	<HeaderClose title="내 계약 관리" />
	<div class="contract-manage-container">
		<div class="contract-manage-title">
			<p>지정 법무사</p>
			<button @click="toggleLawyerCancelModal">취소하기</button>
		</div>
		<div class="contract-manage-list">
			<ExpertListItem />
		</div>
		<p class="contract-manage-help-text">
			지정법무사를 취소할 경우,<br />
			해당 법무사와는 더 이상 대화할 수 없습니다.
		</p>
	</div>
	<LawyerCancelModal
		v-if="isLawyerCancelModalShow"
		@close-modal="toggleLawyerCancelModal"
		@open-complete-modal="toggleLawyerCancelCompleteModal"
	/>
	<LawyerCancelCompleteModal
		v-if="isLawyerCancelCompleteModalShow"
		@close-modal="toggleLawyerCancelCompleteModal"
	/>
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertListItem from '~/components/item/ExpertListItem.vue';
import LawyerCancelModal from '~/components/modal/LawyerCancelModal.vue';
import LawyerCancelCompleteModal from '~/components/modal/LawyerCancelCompleteModal.vue';

const isLawyerCancelModalShow = ref(false);
const toggleLawyerCancelModal = () => {
	isLawyerCancelModalShow.value = !isLawyerCancelModalShow.value;
};

const isLawyerCancelCompleteModalShow = ref(false);
const toggleLawyerCancelCompleteModal = () => {
	isLawyerCancelCompleteModalShow.value =
		!isLawyerCancelCompleteModalShow.value;
};
</script>

<style lang="scss" scoped>
.contract-manage-container {
	padding: 13px 15px 38px;
}
.contract-manage-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25px 0;
	border-bottom: 1px solid #ebebeb;
	& > p {
		font-size: 14px;
		font-weight: $ft-bold;
	}
	& > button {
		padding: 0;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #29cdff;
	}
}
.contract-manage-list {
	margin: 13px 0;
}
.contract-manage-help-text {
	font-size: 14px;
	color: #949494;
	line-height: 1.25;
}
</style>
