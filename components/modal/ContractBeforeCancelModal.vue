<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="cancel-container">
				<p class="cancel-modal-content">확인해주세요</p>
				<p class="cancel-modal-title">등록을 취소하시겠어요?</p>
				<p class="cancel-modal-subtitle">
					계약정보를 수정하려면<br />다시 등록하기를 클릭해주세요
				</p>
				<div class="cancel-modal-buttons">
					<button
						class="cancel-modal-button button--black"
						@click="handlerClickApplyButton"
					>
						등록취소
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

const emit = defineEmits([
	'close-modal',
	'click-cancel-button',
	'click-re-reg-button',
]);
const closeModal = () => {
	emit('close-modal');
};

const handlerClickApplyButton = () => {
	emit('click-cancel-button');
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
.cancel-modal-buttons {
	display: flex;
	align-items: center;
	gap: 12px;
}
.cancel-modal-button {
	flex: 1;
	padding: 14px 0;
	border-radius: 8px;
	font-size: 14px;
	font-weight: $ft-bold;
	&.button--black {
		background-color: #000000;
		color: #ffffff;
	}
	&.button--blue {
		background-color: #29cdff;
		color: #f5f5f5;
	}
}
</style>
