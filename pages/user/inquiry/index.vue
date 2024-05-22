<template>
	<HeaderClose title="1:1 문의" />
	<div v-if="inquiryList.length === 0" class="inquiry-empty">
		<img src="/img/cow/cow-07.png" />
		<p class="empty-title">아직 문의내역이 없습니다</p>
		<NuxtLink to="/user/inquiry/write" class="inquiry-write">글쓰기</NuxtLink>
	</div>
	<div v-if="inquiryList.length > 0" class="inquiry-list">
		<InquiryItem
			v-for="(inq, index) in inquiryList"
			:key="index"
			:inquiry="inq"
		/>
		<div class="inquiry-buttons">
			<NuxtLink to="/user/inquiry/write" class="inquiry-write">글쓰기</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import InquiryItem from '~/components/item/InquiryItem.vue';

import { inquiry } from '~/services/inquiry.js';
import { useLoadingStore } from '~/store/loading.js';

definePageMeta({
	middleware: 'auth',
});

const inquiryList = ref([]);

const loadingStore = useLoadingStore();
onMounted(() => {
	loadingStore.setLoadingShow(true);
	inquiry
		.getInquiry()
		.then(({ data }) => {
			inquiryList.value = data;
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
});
</script>

<style lang="scss" scoped>
.inquiry-empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 105px;
	.empty-title {
		font-weight: $ft-bold;
		color: #acacac;
		margin: 11px 0;
		line-height: 32px;
	}
	& > img {
		width: 203px;
		height: 203px;
	}
}
.inquiry-list {
	padding: 12px 15px;
}
.inquiry-write {
	padding: 9px 22px;
	border-radius: 6px;
	background-color: #29cbff;
	font-size: 12px;
	font-weight: $ft-medium;
	color: #ffffff;
	text-decoration: none;
}
.inquiry-buttons {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin: 17px 0 24px;
}
</style>
