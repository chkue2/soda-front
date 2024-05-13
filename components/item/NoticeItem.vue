<template>
	<div class="notice-item" :class="{ open: isOpen }">
		<div class="notice-item-title" @click="handlerClickItem">
			<div class="notice-item-title-left">
				<img src="/img/icon/pin-black.svg" />
				<span v-if="isNewBoard" class="new-badge">NEW</span>
				<p>{{ props.notice.title }}</p>
			</div>
			<img
				src="/img/icon/expand-down-black.svg"
				class="notice-item-title-expand"
			/>
		</div>
		<div class="notice-item-content" v-html="props.notice.content"></div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

import dayjs from 'dayjs';

const isOpen = ref(false);
const handlerClickItem = () => {
	isOpen.value = !isOpen.value;
};

const props = defineProps({
	notice: {
		type: Object,
		default: () => {},
	},
});

const isNewBoard = computed(
	() => dayjs().diff(dayjs(props.notice.created), 'days') < 7,
);
</script>

<style lang="scss" scoped>
.notice-item {
	& + .notice-item {
		margin-top: 13px;
	}
	&.open {
		.notice-item-content {
			max-height: 9999px;
			margin-top: 13px;
			padding: 14px 9px;
		}
	}
}
.notice-item-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 9px;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;
}
.notice-item-title-left {
	display: flex;
	align-items: center;
	gap: 8px;
	.new-badge {
		width: 38px;
		height: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 96px;
		background-color: #ed3241;
		font-size: 10px;
		font-weight: $ft-semibold;
		color: #ffffff;
	}
	& > p {
		font-size: 14px;
	}
}
.notice-item-content {
	background-color: #f8f8f8;
	font-size: 14px;
	line-height: 24px;
	max-height: 0;
	overflow: hidden;
	margin-top: 0;
	padding: 0 9px;
	transition: all 0.3s ease-in-out;
}
</style>
