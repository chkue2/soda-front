<template>
	<div class="toggle-box" :class="{ on: isToggle }" @click="handlerClickToggle">
		<i></i>
	</div>
</template>

<script setup>
const props = defineProps({
	isToggle: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['click-toggle']);
const handlerClickToggle = () => {
	emit('click-toggle');
};
</script>

<style lang="scss" scoped>
.toggle-box {
	width: 36px;
	height: 20px;
	border-radius: 100px;
	background-color: #e5e5e5;
	position: relative;
	cursor: pointer;
	&.on {
		background-color: #2563eb;
		& > i {
			transform: translate(18px, -50%);
		}
	}
	& > i {
		display: block;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #ffffff;
		position: absolute;
		top: 50%;
		transform: translate(2px, -50%);
		transition: all 0.3s linear;
	}
}
</style>
