<template>
	<button
		class="progress-background-button"
		:style="{ height: `${props.height}px` }"
		@click="handlerClickButton"
	>
		<div
			class="progress-background"
			:style="{
				width: `${props.progressWidth}%`,
				backgroundColor: props.progressColor,
			}"
		></div>
		<span>{{ props.title }}</span>
	</button>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	height: {
		type: Number,
		default: 56,
	},
	progressColor: {
		type: String,
		default: '#29CDFF',
	},
	progressWidth: {
		type: Number,
		default: 100,
	},
});

const emit = defineEmits(['click-button']);
const handlerClickButton = () => {
	emit('click-button');
};
</script>

<style lang="scss" scoped>
.progress-background-button {
	flex: 1;
	background-color: #d9d9d9;
	position: relative;
	& > span {
		font-size: 16px;
		font-weight: $ft-bold;
		color: #ffffff;
		position: relative;
		z-index: 2;
	}
	.progress-background {
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		transition: width 0.3s ease-in-out;
	}
}
</style>
