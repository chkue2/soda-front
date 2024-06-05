<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="complete-container">
				<p class="complete-modal-content">탁월한 선택이예요!</p>
				<p class="complete-modal-title">사무소 선택을 완료했어요</p>
				<p class="complete-modal-subtitle">
					등기프로가 수임확정하면<br />알림톡을 보내드려요.
				</p>
				<button class="complete-modal-button" @click="closeModal">확인</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal', 'click-ok-button']);
const closeModal = () => {
	emit('close-modal');
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
