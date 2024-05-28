<template>
	<div class="my-review-item">
		<div class="my-review-title" @click="moveToLawyerDetailPage">
			<p>{{ props.review.firmName }}</p>
			<img src="/img/icon/expand-right-black.svg" />
		</div>
		<div class="my-review-rating">
			<div class="my-review-rating-column">
				<p>시간준수</p>
				<div>
					<img
						v-for="i in props.review.timeCriteria"
						:key="i"
						src="/img/icon/star-yellow-02.svg"
					/>
					<img
						v-for="i in 5 - props.review.timeCriteria"
						:key="i"
						src="/img/icon/star-gray.svg"
					/>
				</div>
			</div>
			<div class="my-review-rating-column">
				<p>친절만족</p>
				<div>
					<img
						v-for="i in props.review.kindCriteria"
						:key="i"
						src="/img/icon/star-yellow-02.svg"
					/>
					<img
						v-for="i in 5 - props.review.kindCriteria"
						:key="i"
						src="/img/icon/star-gray.svg"
					/>
				</div>
			</div>
			<div class="my-review-rating-column">
				<p>업무수행</p>
				<div>
					<img
						v-for="i in props.review.rapidCriteria"
						:key="i"
						src="/img/icon/star-yellow-02.svg"
					/>
					<img
						v-for="i in 5 - props.review.rapidCriteria"
						:key="i"
						src="/img/icon/star-gray.svg"
					/>
				</div>
			</div>
		</div>
		<p class="my-review-reg-date">작성일 {{ created }}</p>
		<div class="my-review-content" v-html="memo"></div>
		<div class="my-review-buttons">
			<button @click="handlerClickUpdateButton">수정</button>
			<button @click="handlerClickDeleteButton">삭제</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import dayjs from 'dayjs';

const props = defineProps({
	review: {
		type: Object,
		default: () => {},
	},
});

const created = computed(() =>
	dayjs(props.review.created).format('YYYY-MM-DD'),
);
const memo = computed(() => props.review.memo.replaceAll('\n', '<br>'));

const emit = defineEmits(['click-update', 'click-delete']);

const handlerClickUpdateButton = () => {
	emit('click-update', props.review.seq);
};

const handlerClickDeleteButton = () => {
	emit('click-delete', props.review.seq);
};

const router = useRouter();
const moveToLawyerDetailPage = () => {
	router.push(`/lawyer/detail/${props.review.firmCode}`);
};
</script>

<style lang="scss" scoped>
.my-review-item {
	padding: 35px 0 14px;
}
.my-review-title {
	padding: 5px 0 14px;
	border-bottom: 1px solid #ebebeb;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	& > p {
		font-size: 14px;
		font-weight: $ft-bold;
	}
	& > img {
		margin-right: 7px;
	}
}
.my-review-rating {
	margin: 13px 0;
}
.my-review-rating-column {
	display: flex;
	gap: 13px;
	align-items: center;
	& + .my-review-rating-column {
		margin-top: 3px;
	}
	& > p {
		font-size: 12px;
		font-weight: $ft-bold;
		color: #787878;
	}
	& > div {
		display: flex;
		align-content: center;
		& > img {
			width: 17px;
			height: 17px;
		}
	}
}
.my-review-reg-date {
	font-size: 12px;
	font-weight: $ft-medium;
	color: #929292;
	text-align: right;
}
.my-review-content {
	padding: 14px 8px 27px;
	font-size: 14px;
	color: #252525;
	margin: 6px 0 13px;
	background-color: #f8f8f8;
}
.my-review-buttons {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 8px;
	& > button {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #929292;
	}
}
</style>
