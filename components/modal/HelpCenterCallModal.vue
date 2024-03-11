<template>
	<CommonModal @close-modal="handlerClickCloseModal">
		<template #modal-body>
			<p class="modal-text">고객센터 1670-2361로<br />전화하시겠습니까?</p>
			<div class="modal-buttons">
				<button class="button--gray" @click="handlerClickCloseModal">
					닫기
				</button>
				<button class="button--blue" @click="handlerClickCallButton">
					전화하기
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);

const handlerClickCallButton = () => {
	location.href = 'tel://1670-2361';
};
const handlerClickCloseModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/modal/text-modal.scss';
</style>
