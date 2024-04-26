<template>
	<div class="review-detail-block-container">
		<div class="review-detail-block-left">
			<p class="review-detail-score">{{ props.scoreAvg.toFixed(1) }}</p>
			<div class="review-detail-rate">
				<img
					v-for="i in parseInt(props.scoreAvg)"
					:key="i"
					src="/img/icon/star-yellow.svg"
				/>
				<img
					v-for="i in 5 - parseInt(props.scoreAvg)"
					:key="i"
					src="/img/icon/star-gray.svg"
				/>
			</div>
		</div>
		<div class="review-detail-block-right">
			<div class="review-detail-block-column">
				<p class="review-detail-block-column-title">시간준수</p>
				<div class="review-detail-block-bar">
					<i :style="{ width: timeBarWidth }"></i>
				</div>
				<p class="review-detail-block-score">{{ props.time }}</p>
			</div>
			<div class="review-detail-block-column">
				<p class="review-detail-block-column-title">업무수행</p>
				<div class="review-detail-block-bar">
					<i :style="{ width: performanceBarWidth }"></i>
				</div>
				<p class="review-detail-block-score">{{ props.performance }}</p>
			</div>
			<div class="review-detail-block-column">
				<p class="review-detail-block-column-title">친절만족</p>
				<div class="review-detail-block-bar">
					<i :style="{ width: kindBarWidth }"></i>
				</div>
				<p class="review-detail-block-score">{{ props.kind }}</p>
			</div>
			<div class="review-detail-block-column">
				<p class="review-detail-block-column-title">내부평점</p>
				<div class="review-detail-block-bar">
					<i :style="{ width: insideBarWidth }"></i>
				</div>
				<p class="review-detail-block-score">{{ props.inside }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	time: {
		type: Number,
		default: 0,
	},
	performance: {
		type: Number,
		default: 0,
	},
	kind: {
		type: Number,
		default: 0,
	},
	inside: {
		type: Number,
		default: 0,
	},
	scoreAvg: {
		type: Number,
		default: 0,
	},
});

const timeBarWidth = computed(() => `${calcRate(props.time)}%`);
const performanceBarWidth = computed(() => `${calcRate(props.performance)}%`);
const kindBarWidth = computed(() => `${calcRate(props.kind)}%`);
const insideBarWidth = computed(() => `${calcRate(props.inside)}%`);

const calcRate = rate => {
	return parseFloat(rate) * 20;
};
</script>

<style lang="scss">
.review-detail-block-container {
	padding: 0 23px;
	margin: 28px 0 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 35px;
}
.review-detail-block-left {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.review-detail-score {
	font-size: 35px;
	font-weight: $ft-medium;
	line-height: 48px;
}
.review-detail-rate {
	display: flex;
	justify-content: center;
	align-items: center;
	& > img {
		width: 16px;
		height: 16px;
	}
}
.review-detail-block-right {
	display: flex;
	flex-direction: column;
	gap: 3px;
}
.review-detail-block-column {
	display: flex;
	align-items: center;
	gap: 6px;
}
.review-detail-block-column-title {
	font-size: 12px;
	font-weight: $ft-medium;
}
.review-detail-block-bar {
	width: 116px;
	height: 4px;
	background-color: #ebebeb;
	& > i {
		display: block;
		height: 4px;
		background-color: #ffc600;
	}
}
.review-detail-block-score {
	font-size: 12px;
	font-weight: $ft-bold;
}
</style>
