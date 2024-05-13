<template>
	<HeaderClose title="공지사항" />
	<div class="notice-container">
		<NoticeItem
			v-for="(noti, index) in noticeList"
			:key="index"
			:notice="noti"
		/>
	</div>
	<Pagination />
</template>

<script setup>
import { onMounted, ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import NoticeItem from '~/components/item/NoticeItem.vue';
import Pagination from '~/components/paging/Pagination.vue';

import { notice } from '~/services/notice.js';

const paging = ref({
	startPage: 1,
	endPage: 1,
	pageNo: 1,
	totalPage: 1,
	prevPageGroup: 1,
	nextPageGroup: 1,
});
const noticeList = ref([]);

onMounted(() => {
	notice
		.getNotice(paging.value.pageNo)
		.then(({ data }) => {
			noticeList.value = data.noticeList;
			paging.value = data.paging;
		})
		.catch(e => {
			alert(e.response.data.message);
		});
});
</script>

<style lang="scss" scoped>
.notice-container {
	padding: 38px 15px;
}
</style>
