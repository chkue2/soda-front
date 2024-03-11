<template>
	<HeaderClose title="공지사항" />
	<div class="notice-container">
		<NoticeItem v-for="i in 5" :key="i" />
	</div>
	<Pagination />
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import NoticeItem from '~/components/item/NoticeItem.vue';
import Pagination from '~/components/paging/Pagination.vue';
</script>

<style lang="scss" scoped>
.notice-container {
	padding: 38px 15px;
}
</style>
