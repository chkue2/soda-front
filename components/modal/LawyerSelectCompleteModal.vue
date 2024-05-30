<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="select-container">
				<p class="select-modal-content">탁월한 선택이예요!</p>
				<p class="select-modal-title">사무소 선택을 완료했어요</p>
				<p class="select-modal-text">
					등기프로가 수임확정하면<br />알림톡을 보내드려요.
				</p>
				<button
					v-if="ins === 'soda'"
					class="select-modal-button"
					@click="handlerClickPageMoveButton"
				>
					바로가기
				</button>
				<button
					v-if="ins === 'bank'"
					class="select-modal-button"
					@click="closeModal"
				>
					확인
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { useRouter } from 'vue-router';

import CommonModal from '~/components/modal/CommonModal.vue';

const props = defineProps({
	ins: {
		type: String,
		default: 'soda',
	},
});

const emit = defineEmits(['close-modal', 'click-select-button']);
const closeModal = () => {
	emit('close-modal');
};

const router = useRouter();
const handlerClickPageMoveButton = () => {
	router.push('/user/contract-manage/list');
};
</script>

<style lang="scss" scoped>
.select-container {
	padding: 0 28px 20px;
}
.select-modal-content {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
	line-height: 1.5;
}
.select-modal-title {
	margin: 23px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.select-modal-text {
	text-align: center;
	line-height: 1.5;
}
.select-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
	margin-top: 29px;
}
</style>
