<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="confirm-container">
				<p class="confirm-title">리뷰 삭제</p>
				<p class="confirm-content">해당 리뷰를 삭제하시겠어요?</p>
				<div class="confirm-buttons">
					<button class="cancel-button" @click="closeModal">취소</button>
					<button class="confirm-button" @click="handlerClickDeleteButton">
						삭제
					</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-delete-button']);

const closeModal = () => {
	emit('close-modal');
};

const handlerClickDeleteButton = () => {
	emit('click-delete-button');
};
</script>

<style lang="scss">
.confirm-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 28px 20px;
}
.confirm-title {
	font-size: 18px;
	font-weight: $ft-bold;
}
.confirm-content {
	margin: 17px 0 30px;
}
.confirm-buttons {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	& > button {
		flex: 1;
		height: 44px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #ffffff;
	}
}
.cancel-button {
	background-color: #d9d9d9;
}
.confirm-button {
	background-color: #29cdff;
}
</style>
