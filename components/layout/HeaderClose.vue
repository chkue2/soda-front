<template>
	<div class="header-close-container">
		<p class="header-title">{{ props.title }}</p>
		<button class="header-close" @click="handlerClickClose">
			<img src="/img/icon/close-black.svg" alt="뒤로가기" />
		</button>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
});

const router = useRouter();
const handlerClickClose = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
.header-close-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 62px;
	padding: 0 20px;
	background-color: #ffffff;
	z-index: $zi-sticky;
	position: sticky;
	top: 0;
}
.header-title {
	font-weight: $ft-bold;
}
.header-close {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
}
</style>
