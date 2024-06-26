<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="cancel-container">
				<p class="cancel-modal-content">한번에 1건만 등록할 수 있어요</p>
				<p class="cancel-modal-title">지금은 등록할 수 없어요</p>
				<p class="cancel-modal-subtitle">
					이미 등록한 계약이 있어요.<br />모집마감후 다시 시도해주세요.
				</p>
				<button class="cancel-modal-button" @click="closeModal">확인</button>
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
