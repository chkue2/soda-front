<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="cancel-container">
				<p class="cancel-modal-content">확인해주세요</p>
				<p class="cancel-modal-title">
					계약을 취소하였습니다.<br />기존 정보로 다시 등록하시겠어요?
				</p>
				<div class="cancel-modal-buttons">
					<button class="cancel-modal-button button--black" @click="closeModal">
						닫기
					</button>
					<button
						class="cancel-modal-button button--blue"
						@click="handlerClickReRegButton"
					>
						다시 등록하기
					</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-re-reg-button']);
const closeModal = () => {
	emit('close-modal');
};

const handlerClickReRegButton = () => {
	emit('click-re-reg-button');
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
	margin: 18px 0 34px;
	font-size: 14px;
	font-weight: $ft-bold;
	text-align: center;
	line-height: 1.3;
}
.cancel-modal-subtitle {
	margin: 17px 0 26px;
	text-align: center;
}
.cancel-modal-buttons {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
.cancel-modal-button {
	flex: 1;
	height: 44px;
	border-radius: 8px;
	font-size: 14px;
	font-weight: $ft-bold;
	&.button--black {
		background-color: #000000;
		color: #ffffff;
	}
	&.button--blue {
		background-color: #29cdff;
		color: #ffffff;
	}
}
</style>
