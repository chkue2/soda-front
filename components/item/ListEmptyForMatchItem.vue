<template>
	<div
		class="empty-container"
		:style="{
			margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
		}"
	>
		<img src="/img/cow/cow-03.gif" alt="목록이 비어있음" />
		<p class="empty-title">{{ props.title }}</p>
		<p
			v-if="props.subTitle !== ''"
			class="empty-subtitle"
			v-html="cleanHTML"
		></p>
	</div>
</template>

<script setup>
import DOMPurify from 'dompurify';
import { computed } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	subTitle: {
		type: String,
		default: '',
	},
	margin: {
		type: Array,
		default: () => [141, 0, 0, 0],
	},
});

const cleanHTML = computed(() => DOMPurify.sanitize(props.subTitle));
</script>

<style lang="scss" scoped>
.empty-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 141px;
	& > img {
		width: 180px;
		height: auto;
	}
}
.empty-title {
	margin: 15px 0 9px;
	font-weight: $ft-bold;
	color: #acacac;
	text-align: center;
}
.empty-subtitle {
	font-size: 14px;
	color: #acacac;
	text-align: center;
	line-height: 1.4;
}
</style>
