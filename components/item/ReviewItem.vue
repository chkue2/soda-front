<template>
	<div class="review-item">
		<img class="review-profile" :src="imageUrl" alt="프로필 이미지" />
		<div class="review-item-contents">
			<div class="review-title">
				<p class="review-id">{{ props.review.userName }}님</p>
				<p class="review-date">{{ createdAt }}</p>
			</div>
			<div class="review-comment">
				{{ props.review.memo }}
			</div>
			<div class="review-rate">
				<img
					v-for="i in parseInt(props.review.star)"
					:key="i"
					src="/img/icon/star-yellow-02.svg"
					alt="별점"
				/>
				<img
					v-for="i in 5 - parseInt(props.review.star)"
					:key="i"
					src="/img/icon/star-gray.svg"
					alt="별점"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps({
	review: {
		type: Object,
		default: () => {},
	},
});

const createdAt = computed(() =>
	dayjs(props.review.created).format('YYYY.MM.DD'),
);

const imageUrl = computed(() =>
	props.review.profileImg
		? `${useRuntimeConfig().public.apiURL}${props.review.profileImg}`
		: '',
);
</script>

<style lang="scss" scoped>
.review-item {
	display: flex;
	gap: 14px;
	align-items: center;
}
.review-profile {
	width: 55px;
	height: 55px;
	border-radius: 50%;
}
.review-item-contents {
	flex: 1;
}
.review-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.review-id {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #686868;
	}
	.review-date {
		font-size: 12px;
		color: #bababa;
	}
}
.review-comment {
	margin: 4px 0;
	font-size: 12px;
	font-weight: $ft-light;
	color: #252525;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	line-height: 17px;
	word-wrap: break-word;
	word-break: break-all;
}
.review-rate {
	& > img {
		width: 14px;
		height: 14px;
	}
}
</style>
