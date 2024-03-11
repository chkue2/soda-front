<template>
	<CommonModal @close-modal="handlerClickCloseButton">
		<template #modal-body>
			<p class="modal-text">지정 법무사를 취소하겠습니까?</p>
			<div class="modal-buttons">
				<button class="button--gray" @click="handlerClickCloseButton">
					닫기
				</button>
				<button class="button--blue" @click="handlerClickCancelButton">
					취소하기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal';

const emit = defineEmits(['close-modal', 'open-complete-modal']);
const handlerClickCloseButton = () => {
	emit('close-modal');
};

const handlerClickCancelButton = () => {
	emit('close-modal');
	emit('open-complete-modal');
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modal/text-modal.scss';
</style>
