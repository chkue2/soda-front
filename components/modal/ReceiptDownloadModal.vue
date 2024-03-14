<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="receipt-container">
				<p class="receipt-modal-subtitle">다운로드 받을 수 있어요</p>
				<p class="receipt-modal-title">상환영수증</p>
				<div class="receipt-modal-contents">
					<div v-for="i in 4" :key="i" class="receipt-item">
						<p>상환영수증({{ i }}).pdf</p>
						<img src="/img/icon/download-black.svg" />
					</div>
				</div>
				<button class="receipt-modal-button" @click="CloseModal">닫기</button>
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
.receipt-container {
	padding: 0 28px 20px;
}
.receipt-modal-subtitle {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
}
.receipt-modal-title {
	margin: 23px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.receipt-modal-contents {
	padding: 0 15px;
	margin: 23px 0 27px;
	border: 1px solid #dfdfdf;
	border-radius: 8px;
}
.receipt-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 13px 0;
	& + .receipt-item {
		border-top: 1px solid rgba(26, 56, 96, 0.1);
	}
	& > p {
		font-size: 14px;
		font-weight: $ft-medium;
		color: #3172f7;
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.25;
		white-space: nowrap;
	}
	& > img {
		cursor: pointer;
	}
}
.receipt-modal-button {
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
