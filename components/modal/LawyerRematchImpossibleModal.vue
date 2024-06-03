<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="rematch-container">
				<p class="rematch-modal-warning">잔금일 D-5일 전 계약은 재모집불가</p>
				<p class="rematch-modal-title">
					모집된 인원중에서 선택하시거나<br />고객센터로 연락부탁드립니다.
				</p>
				<p class="rematch-modal-content">고객센터 1670-2361</p>
				<button class="rematch-modal-button" @click="CloseModal">닫기</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);
const CloseModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.rematch-container {
	padding: 0 28px 20px;
}
.rematch-modal-warning {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #ed3241;
	text-align: center;
}
.rematch-modal-title {
	margin: 17px 0;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
	line-height: 1.5;
}
.rematch-modal-content {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
	margin: 17px 0 27px;
}
.rematch-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #000000;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
}
</style>
