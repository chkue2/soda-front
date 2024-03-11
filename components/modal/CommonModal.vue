<template>
	<div class="common-modal">
		<div class="modal-bg" @click="handlerClickCloseModal"></div>
		<div class="modal-container">
			<div class="modal-title-container">
				<p class="modal-title">{{ props.title }}</p>
				<button class="modal-close" @click="handlerClickCloseModal">
					<img src="/img/icon/close-circle-gray.svg" />
				</button>
			</div>
			<slot name="modal-body"></slot>
		</div>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	isBodyLock: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(['close-modal']);
const handlerClickCloseModal = () => {
	emit('close-modal');
};

onMounted(() => {
	if (props.isBodyLock === true)
		document.querySelector('body').style.overflow = 'hidden';
});
onBeforeUnmount(() => {
	if (props.isBodyLock === true)
		document.querySelector('body').removeAttribute('style');
});
</script>

<style lang="scss" scoped>
.common-modal {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: $zi-modal;
	.modal-bg {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.modal-container {
		width: calc(100% - 30px);
		max-width: 400px;
		max-height: calc(100vh - 150px);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		border-radius: 15px;
		z-index: 2;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.modal-title-container {
		padding: 15px 17px 6px;
		background-color: #ffffff;
		position: sticky;
		top: 0;
		z-index: $zi-sticky;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.modal-close {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		background-color: transparent;
		cursor: pointer;
	}
}
</style>
