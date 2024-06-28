<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="cancel-container">
				<p class="cancel-modal-content">확인해주세요</p>
				<p class="cancel-modal-title">등록을 취소하시겠어요?</p>
				<p class="cancel-modal-subtitle">
					등록을 취소하면<br />모든 계약정보가 삭제됩니다.
				</p>
				<button class="cancel-modal-button" @click="handlerClickApplyButton">
					그래도 취소하기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-cancel-button']);
const closeModal = () => {
	emit('close-modal');
};

const handlerClickApplyButton = () => {
	emit('click-cancel-button');
};
</script>

<style lang="scss" scoped>
.cancel-container {
	padding: 0 20px 28px;
}
.cancel-modal-content {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
	line-height: 1.5;
}
.cancel-modal-title {
	margin: 15px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
	line-height: 1.3;
}
.cancel-modal-subtitle {
	margin: 17px 0 26px;
	text-align: center;
}
.cancel-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
}
</style>
