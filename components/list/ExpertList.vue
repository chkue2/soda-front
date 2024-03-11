<template>
	<div
		class="expert-list"
		:style="{
			margin: `${props.margin[0]}px ${props.margin[1]}px ${props.margin[2]}px ${props.margin[3]}px`,
		}"
	>
		<ExpertListItem v-for="i in 5" :key="i" />
	</div>
</template>

<script setup>
import ExpertListItem from '~/components/item/ExpertListItem.vue';

const props = defineProps({
	margin: {
		type: Array,
		default: () => [0, 0, 0, 0],
	},
});
</script>

<style lang="scss" scoped>
.expert-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-column-gap: 20px;
	grid-row-gap: 26px;
}

@media all and (max-width: 640px) {
	.expert-list {
		grid-template-columns: repeat(1, 1fr);
		grid-row-gap: 20px;
	}
}
</style>
