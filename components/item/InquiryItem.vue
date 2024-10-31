<template>
	<div class="inquiry-item" :class="{ open: isOpen }">
		<div class="inquiry-item-title" @click="handlerClickItem">
			<div class="inquiry-item-title-left">
				<span v-if="!props.inquiry.answerYn" class="inquiry-badge badge-wait"
					>답변대기</span
				>
				<span v-if="props.inquiry.answerYn" class="inquiry-badge badge-success"
					>답변완료</span
				>
				<p>{{ props.inquiry.title }}</p>
			</div>
			<img
				src="/img/icon/expand-down-black.svg"
				class="inquiry-item-title-expand"
				alt="문의 온오프"
			/>
		</div>
		<div class="inquiry-item-content">
			<p class="inquiry-created">{{ created }}</p>
			<p class="inquiry-memo" v-html="memo"></p>
			<div v-if="props.inquiry.answerYn" class="inquiry-answer">
				<p class="inquiry-answer-memo" v-html="answer"></p>
				<p class="inquiry-answer-created">{{ answerCreated }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';

import dayjs from 'dayjs';

const isOpen = ref(false);
const handlerClickItem = () => {
	isOpen.value = !isOpen.value;
};

const props = defineProps({
	inquiry: {
		type: Object,
		default: () => {},
	},
});

const created = computed(() =>
	dayjs(props.inquiry.created).format('YYYY-MM-DD HH:mm'),
);
const answerCreated = computed(() =>
	dayjs(props.inquiry.answered).format('YYYY-MM-DD HH:mm'),
);

const memo = computed(() =>
	(props.inquiry.memo || '').replaceAll('\n', '<br>'),
);
const answer = computed(() =>
	(props.inquiry.answer || '').replaceAll('\n', '<br>'),
);
</script>

<style lang="scss" scoped>
.inquiry-item {
	& + .inquiry-item {
		margin-top: 13px;
	}
	&.open {
		.inquiry-item-content {
			max-height: 9999px;
			margin-top: 13px;
			padding: 14px 9px;
		}
	}
}
.inquiry-item-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 9px;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;
}
.inquiry-item-title-left {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 8px;
	.inquiry-badge {
		width: 54px;
		height: 23px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		font-size: 10px;
		font-weight: $ft-semibold;
		color: #ffffff;
		&.badge-wait {
			background-color: #c5c6cc;
		}
		&.badge-success {
			background-color: #006af5;
		}
	}
	& > p {
		width: 75%;
		font-size: 14px;
	}
}
.inquiry-item-content {
	max-height: 0;
	overflow: hidden;
	margin-top: 0;
	padding: 0 9px;
	transition: all 0.3s ease-in-out;
}
.inquiry-created {
	font-size: 12px;
	color: #949599;
}
.inquiry-memo {
	font-size: 14px;
	margin: 12px 0 17px;
	line-height: 24px;
}
.inquiry-answer {
	padding: 6px;
	background-color: #f8f8f8;
}
.inquiry-answer-memo {
	font-size: 14px;
	line-height: 24px;
	margin-bottom: 14px;
}
.inquiry-answer-created {
	font-size: 12px;
	color: #949599;
}
</style>
