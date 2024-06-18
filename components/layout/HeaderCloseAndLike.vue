<template>
	<div class="header-close-container">
		<p class="header-title">{{ props.title }}</p>
		<div class="header-right">
			<button
				v-if="props.ins === 'soda'"
				class="header-like"
				@click="handlerClickLikeButton"
			>
				<img v-if="!props.isLike" src="/img/icon/heart-gray.svg" />
				<img v-if="props.isLike" src="/img/icon/heart-red.svg" />
			</button>
			<button class="header-close" @click="handlerClickClose">
				<img src="/img/icon/close-black.svg" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	isLike: {
		type: Boolean,
		default: false,
	},
	ins: {
		type: String,
		default: 'soda',
	},
});

const router = useRouter();
const handlerClickClose = () => {
	router.back();
};

const emit = defineEmits(['click-like-button']);
const handlerClickLikeButton = () => {
	emit('click-like-button');
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
	max-width: 50%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	word-break: break-all;
	line-height: 20px;
}
.header-right {
	display: flex;
	align-items: center;
	gap: 20px;
}
.header-close {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0;
}
</style>
