<template>
	<div
		class="review-list"
		:style="{
			margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
		}"
	>
		<ReviewItem
			v-for="(review, index) in reviews"
			:key="index"
			:review="review"
		/>
	</div>
</template>

<script setup>
import ReviewItem from '~/components/item/ReviewItem.vue';

const props = defineProps({
	margin: {
		type: Array,
		default: () => [0, 0, 0, 0],
	},
	reviews: {
		type: Array,
		default: () => [],
	},
});
</script>

<style lang="scss" scoped>
.review-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 20px;
	grid-row-gap: 20px;
}

@media all and (max-width: 640px) {
	.review-list {
		grid-template-columns: repeat(1, 1fr);
		grid-row-gap: 20px;
	}
}
</style>
