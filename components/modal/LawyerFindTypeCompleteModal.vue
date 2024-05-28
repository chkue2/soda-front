<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="complete-container">
				<p class="complete-modal-content">확인후 모집이 시작됩니다.</p>
				<p class="complete-modal-title">모집을 시작하시겠어요?</p>
				<p class="complete-modal-subtitle">
					모집중에는<br />입력하신 정보 수정이 불가합니다.
				</p>
				<button class="complete-modal-button" @click="handlerClickApplyButton">
					모집 시작하기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-apply-button']);
const closeModal = () => {
	emit('close-modal');
};

const handlerClickApplyButton = () => {
	emit('click-apply-button');
};
</script>

<style lang="scss" scoped>
.complete-container {
	padding: 0 20px 28px;
}
.complete-modal-content {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
	line-height: 1.5;
}
.complete-modal-title {
	margin: 15px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
	line-height: 1.3;
}
.complete-modal-subtitle {
	margin: 17px 0 26px;
	text-align: center;
}
.complete-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
}
</style>
