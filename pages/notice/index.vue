<template>
	<HeaderClose title="공지사항" />
	<div class="notice-container">
		<NoticeItem
			v-for="(noti, index) in noticeList"
			:key="index"
			:notice="noti"
		/>
	</div>
	<Pagination :paging="paging" @click-page="callApi" />
</template>

<script setup>
import { onMounted, ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import NoticeItem from '~/components/item/NoticeItem.vue';
import Pagination from '~/components/paging/Pagination.vue';

import { useLoadingStore } from '~/store/loading.js';
import { notice } from '~/services/notice.js';
import { useAlertStore } from '~/store/alert.js';

const alertStore = useAlertStore();

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
	callApi(paging.value.pageNo);
});

const loadingStore = useLoadingStore();
const callApi = pageNo => {
	loadingStore.setLoadingShow(true);
	notice
		.getNotice(pageNo)
		.then(({ data }) => {
			noticeList.value = data.noticeList;
			paging.value = data.paging;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};
</script>

<style lang="scss" scoped>
.notice-container {
	padding: 38px 15px;
}
</style>
