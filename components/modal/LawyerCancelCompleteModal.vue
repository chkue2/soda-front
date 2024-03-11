<template>
	<CommonModal @close-modal="handlerClickCloseButton">
		<template #modal-body>
			<p class="modal-text">지정취소가 완료되었습니다.</p>
			<div class="modal-buttons">
				<button class="button--black" @click="handlerClickCloseButton">
					닫기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal';

const emit = defineEmits(['close-modal']);
const handlerClickCloseButton = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modal/text-modal.scss';
</style>
