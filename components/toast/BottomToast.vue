<template>
	<div
		class="bottom-toast"
		:style="{
			bottom: `${props.bottom}px`,
			backgroundColor: props.backgroundColor,
		}"
	>
		<div class="bottom-toast-left">
			<img :src="`/img/icon/${props.emoji}`" />
			<div class="bottom-toast-left-text">
				<p class="bottom-toast-title">{{ props.title }}</p>
				<p class="bottom-toast-content">{{ props.content }}</p>
			</div>
		</div>
		<button
			class="bottom-toast-button"
			:class="{ disable: isDisable }"
			@click="handlerClickButton"
		>
			{{ props.buttonText }}
		</button>
	</div>
</template>

<script setup>
const props = defineProps({
	bottom: {
		type: Number,
		default: 0,
	},
	backgroundColor: {
		type: String,
		default: '#818181',
	},
	emoji: {
		type: String,
		default: 'love-letter.svg',
	},
	title: {
		type: String,
		default: '',
	},
	content: {
		type: String,
		default: '',
	},
	buttonText: {
		type: String,
		default: '',
	},
	isDisable: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(['click-button']);
const handlerClickButton = () => {
	if (props.isDisable) return false;

	emit('click-button');
};
</script>

<style lang="scss" scoped>
.bottom-toast {
	width: calc(100% - 20px);
	max-width: 630px;
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	padding: 16px;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: $zi-fixed;
}
.bottom-toast-left {
	display: flex;
	gap: 10px;
	& > img {
		width: 32px;
		height: 32px;
	}
}
.bottom-toast-title {
	font-size: 14px;
	font-weight: $ft-bold;
	color: #ffffff;
	margin-bottom: 6px;
}
.bottom-toast-content {
	font-size: 12px;
	font-weight: $ft-bold;
	color: #ffffff;
}
.bottom-toast-button {
	padding: 8px 15px;
	border-radius: 6px;
	background-color: #ffffff;
	&.disable {
		background-color: #f4f4f4;
		color: #8d939f;
	}
}
</style>
