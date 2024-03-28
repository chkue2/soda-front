<template>
	<HeaderClose title="내 리뷰 관리" />
	<ListEmptyItem v-if="false" title="아직 작성한 리뷰가 없어요" />
	<div class="my-review-container">
		<p class="my-review-title">내가 쓴 리뷰 1개</p>
		<MyReviewItem v-for="i in 5" :key="i" />
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import MyReviewItem from '~/components/item/MyReviewItem.vue';
</script>

<style lang="scss" scoped>
.my-review-container {
	padding: 0 20px;
}
.my-review-title {
	padding: 17px 0 12px;
	font-weight: $ft-bold;
	color: #252525;
}
</style>
