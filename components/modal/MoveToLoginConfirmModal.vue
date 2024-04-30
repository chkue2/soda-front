<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="confirm-container">
				<p class="confirm-title">로그인이 필요해요</p>
				<p class="confirm-content">로그인 페이지로 이동하시겠어요?</p>
				<button
					class="confirm-button"
					@click="handlerClickMoveToLoginPageButton"
				>
					로그인할게요!
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);

const closeModal = () => {
	emit('close-modal');
};

const handlerClickMoveToLoginPageButton = () => {
	closeModal();
	return navigateTo('/login');
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
.confirm-button {
	width: 100%;
	height: 44px;
	border-radius: 8px;
	background-color: #29cdff;
	color: #f5f5f5;
	font-size: 14px;
	font-weight: $ft-bold;
}
</style>
