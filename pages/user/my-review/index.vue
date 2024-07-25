<template>
	<HeaderClose title="내 리뷰 관리" />
	<ListEmptyItem
		v-if="reviewList.length === 0"
		title="아직 작성한 리뷰가 없어요"
	/>
	<div v-if="reviewList.length > 0" class="my-review-container">
		<p class="my-review-title">내가 쓴 리뷰 {{ reviewCount }}개</p>
		<MyReviewItem
			v-for="(review, index) in reviewList"
			:key="index"
			:review="review"
			@click-update="openReviewUpdateModal"
			@click-delete="openReviewDeleteConfirmModal"
		/>
	</div>
	<ReviewUpdateModal
		v-if="isReviewUpdateModalShow"
		:seq="selectSeq"
		@re-call-api="callApi"
		@click-delete-button="openReviewDeleteConfirmModal"
		@close-modal="toggleReviewUpdateModal"
	/>
	<ReviewDeleteConfirmModal
		v-if="isReviewDeleteConfirmModalShow"
		@click-delete-button="deleteReview"
		@close-modal="toggleReviewDeleteConfirmModal"
	/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import MyReviewItem from '~/components/item/MyReviewItem.vue';
import ReviewUpdateModal from '~/components/modal/ReviewUpdateModal.vue';
import ReviewDeleteConfirmModal from '~/components/modal/ReviewDeleteConfirmModal.vue';

import { useLoadingStore } from '~/store/loading.js';
import { user } from '~/services/user.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	middleware: 'auth',
});

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const reviewCount = ref(0);
const reviewList = ref([]);

const selectSeq = ref(0);

onMounted(() => {
	callApi();
});

const callApi = () => {
	loadingStore.setLoadingShow(true);
	Promise.all([getReviewCount(), getReviewList()]).finally(() => {
		loadingStore.setLoadingShow(false);
	});
};

const getReviewCount = () => {
	user
		.getReviewCount()
		.then(({ data }) => {
			reviewCount.value = data.count;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const getReviewList = () => {
	user
		.getReviewList()
		.then(({ data }) => {
			reviewList.value = data;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const router = useRouter();
const deleteReview = () => {
	user
		.deleteReview(selectSeq.value)
		.then(() => {
			alertStore.open('작성하신 리뷰가 삭제되었습니다.');
			router.go(0);
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const isReviewUpdateModalShow = ref(false);
const toggleReviewUpdateModal = () => {
	isReviewUpdateModalShow.value = !isReviewUpdateModalShow.value;
};

const openReviewUpdateModal = seq => {
	selectSeq.value = seq;
	toggleReviewUpdateModal();
};

const isReviewDeleteConfirmModalShow = ref(false);
const toggleReviewDeleteConfirmModal = () => {
	isReviewDeleteConfirmModalShow.value = !isReviewDeleteConfirmModalShow.value;
};

const openReviewDeleteConfirmModal = seq => {
	selectSeq.value = seq;
	toggleReviewDeleteConfirmModal();
};
</script>

<style lang="scss" scoped>
.my-review-container {
	padding: 0 20px 24px;
}
.my-review-title {
	padding: 17px 0 12px;
	font-weight: $ft-bold;
	color: #252525;
}
</style>
