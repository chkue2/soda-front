<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="rematch-container">
				<p class="rematch-modal-content">
					다시찾기는 이번이 마지막이예요!<br />
					진행할경우 서비스유형선택 단계로 이동합니다.
				</p>
				<p class="rematch-modal-title">
					등기프로 다시찾기를<br />진행하시겠습니까?
				</p>
				<button class="rematch-modal-button" @click="handlerClickRematchButton">
					다시 찾아보기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-rematch-button']);
const closeModal = () => {
	emit('close-modal');
};

const handlerClickRematchButton = () => {
	emit('click-rematch-button');
};
</script>

<style lang="scss" scoped>
.rematch-container {
	padding: 0 28px 20px;
}
.rematch-modal-content {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
	line-height: 1.5;
}
.rematch-modal-title {
	margin: 21px 0 30px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
	line-height: 1.3;
}
.rematch-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
}
</style>
