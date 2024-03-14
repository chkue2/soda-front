<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="balance-container">
				<p class="balance-modal-subtitle">앗! 지금은 아니예요!</p>
				<p class="balance-modal-title">잔금시간 안내</p>
				<p class="balance-modal-content">
					선택한 사무소와 협의해야해요.<br />담당법무사가 잔금일 전에
					연락드립니다.
				</p>
				<button class="balance-modal-button" @click="CloseModal">닫기</button>
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
.balance-container {
	padding: 0 28px 20px;
}
.balance-modal-subtitle {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
}
.balance-modal-title {
	margin: 23px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.balance-modal-content {
	text-align: center;
	line-height: 1.5;
}
.balance-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #000000;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
	margin-top: 29px;
}
</style>
