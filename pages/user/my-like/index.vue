<template>
	<HeaderClose title="좋아요 활동" />
	<ListEmptyItem
		v-if="likeList.length === 0"
		title="종아요한 등기프로가 없어요"
		sub-title="등기프로 찾기로 내주변 등기프로를 찾아보세요"
	/>
	<div v-if="likeList.length > 0" class="my-like-container">
		<ExpertList :list="likeList" />
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import ExpertList from '~/components/list/ExpertList.vue';

import { firmLike } from '~/services/firmLike.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	middleware: 'auth',
});

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const likeList = ref([]);

onMounted(() => {
	loadingStore.setLoadingShow(true);
	firmLike
		.getList()
		.then(({ data }) => {
			likeList.value = data;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
});
</script>

<style lang="scss">
.my-like-container {
	margin: 40px 0;
	padding: 0 9px;
}
</style>
