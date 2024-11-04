<template>
	<TermsContainerModal
		title="광고성 정보 수신 동의 약관"
		@close-modal="closeModal"
	>
		<template #body>
			<div class="terms-ad-container">
				<div class="terms-ad-table">
					<div class="terms-ad-table-title">목적</div>
					<div class="terms-ad-table-content">
						마케팅 정보 활용(혜택, 이벤트, 상품정보 등 안내)
					</div>
					<div class="terms-ad-table-title">항목</div>
					<div class="terms-ad-table-content">이름, 휴대전화번호</div>
					<div class="terms-ad-table-title">보유기간</div>
					<div class="terms-ad-table-content">서비스 탈퇴시까지</div>
				</div>
				<p class="terms-ad-warning-text">
					이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 다만,
					동의 거부 시 서비스에서 제공하는 혜택, 이벤트, 상품정보 등의 안내를
					받으실 수 없습니다. 
				</p>
			</div>
		</template>
	</TermsContainerModal>
</template>

<script setup>
import TermsContainerModal from '~/components/modal/TermsContainerModal.vue';

const emit = defineEmits(['close-modal']);

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.terms-ad-container {
	padding: 12px 4px;
}
.terms-ad-table {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}
.terms-ad-table-title {
	height: 54px;
	grid-column: 1 span;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 13px;
	font-weight: $ft-bold;
	border: 1px solid #ebebeb;
	border-top: none;
	border-left: none;
}
.terms-ad-table-content {
	height: 54px;
	grid-column: 3 span;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 13px;
	border-bottom: 1px solid #ebebeb;
	padding: 0 9px;
}
.terms-ad-warning-text {
	margin-top: 12px;
	font-size: 13px;
	color: #888888;
}
</style>
