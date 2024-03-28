<template>
	<HeaderClose title="좋아요 활동" />
	<ListEmptyItem
		v-if="false"
		title="종아요한 등기프로가 없어요"
		sub-title="법무사찾기로 내주변 등기프로를 찾아보세요"
	/>
	<div class="my-like-container">
		<ExpertList />
		<Pagination margin-top="30px" />
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import Pagination from '~/components/paging/Pagination.vue';
</script>

<style lang="scss">
.my-like-container {
	margin: 40px 0;
	padding: 0 9px;
}
</style>
