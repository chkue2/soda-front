<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="review-update-container">
				<p class="review-update-modal-subtitle">리뷰는 큰 힘이 됩니다!</p>
				<p class="review-update-modal-title">내가 쓴 리뷰</p>
				<div class="review-update-rate-item">
					<div class="review-update-rate">
						<p class="review-update-rate-title">시간준수</p>
						<div class="review-update-rate-wrapper">
							<i
								v-for="i in 5"
								:key="i"
								:class="{ active: i <= reviewDetail.timeCriteria }"
							></i>
						</div>
					</div>
				</div>
				<div class="review-update-rate-item">
					<div class="review-update-rate">
						<p class="review-update-rate-title">친절만족도</p>
						<div class="review-update-rate-wrapper">
							<i
								v-for="i in 5"
								:key="i"
								:class="{ active: i <= reviewDetail.kindCriteria }"
							></i>
						</div>
					</div>
				</div>
				<div class="review-update-rate-item">
					<div class="review-update-rate">
						<p class="review-update-rate-title">업무수행능력</p>
						<div class="review-update-rate-wrapper">
							<i
								v-for="i in 5"
								:key="i"
								:class="{ active: i <= reviewDetail.rapidCriteria }"
							></i>
						</div>
					</div>
					<p class="review-update-reg-date">작성일 {{ created }}</p>
				</div>
				<div v-if="!isUpdate" class="review-update-content" v-html="memo"></div>
				<textarea
					v-if="isUpdate"
					v-model="content"
					class="review-update-content area"
				></textarea>
				<div class="review-update-modal-buttons">
					<button class="button--gray" @click="clickDeleteButton">삭제</button>
					<button v-if="!isUpdate" class="button--blue" @click="toggleUpdate">
						수정하기
					</button>
					<button
						v-if="isUpdate"
						class="button--blue"
						@click="handlerClickUpdateButton"
					>
						저장하기
					</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

import CommonModal from '~/components/modal/CommonModal.vue';

import { user } from '~/services/user.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

const props = defineProps({
	seq: {
		type: Number,
		default: 0,
	},
	ins: {
		type: String,
		default: 'soda',
	},
	tid: {
		type: Number,
		default: 0,
	},
});

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const reviewDetail = ref({});
const content = ref('');

onMounted(() => {
	callApi();
});

const callApi = () => {
	loadingStore.setLoadingShow(true);
	user
		.getReviewDetail(props.ins === 'soda' ? props.seq : props.tid, props.ins)
		.then(({ data }) => {
			reviewDetail.value = data;
			content.value = data.memo;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const created = computed(() =>
	dayjs(reviewDetail.value.created).format('YYYY-MM-DD'),
);

const emit = defineEmits(['close-modal', 're-call-api', 'click-delete-button']);
const CloseModal = () => {
	emit('close-modal');
};

const memo = computed(() =>
	(reviewDetail.value.memo || '').replaceAll('\n', '<br>'),
);

const isUpdate = ref(false);
const toggleUpdate = () => {
	isUpdate.value = !isUpdate.value;
};

const handlerClickUpdateButton = () => {
	user
		.updateReview(
			{
				seq: reviewDetail.value.seq,
				formData: {
					timeCriteria: reviewDetail.value.timeCriteria,
					kindCriteria: reviewDetail.value.kindCriteria,
					rapidCriteria: reviewDetail.value.rapidCriteria,
					memo: content.value,
					useYn: true,
					showYn: true,
				},
			},
			props.ins,
		)
		.then(() => {
			callApi();
			emit('re-call-api');
			toggleUpdate();
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const clickDeleteButton = () => {
	emit('click-delete-button', reviewDetail.value.seq);
};
</script>

<style lang="scss" scoped>
.review-update-container {
	padding: 0 20px 28px;
}
.review-update-modal-subtitle {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
}
.review-update-modal-title {
	margin: 23px 0 28px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.review-update-rate-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	& + .review-update-rate-item {
		margin-top: 9px;
	}
	.review-update-rate {
		display: flex;
		align-items: center;
		gap: 3px;
	}
	.review-update-rate-title {
		flex: 1;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #787878;
		width: 80px;
	}
	.review-update-rate-wrapper {
		display: flex;
		align-items: center;
		& > i {
			width: 17px;
			height: 17px;
			background-image: url(/img/icon/star-gray.svg);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: center;
			&.active {
				background-image: url(/img/icon/star-yellow-02.svg);
			}
		}
	}
	.review-update-reg-date {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #929292;
	}
}
.review-update-modal-content {
	text-align: center;
	line-height: 1.5;
}
.review-update-modal-buttons {
	display: flex;
	gap: 11px;
	margin-top: 36px;
	& > button {
		flex: 1;
		padding: 14px 0;
		border-radius: 8px;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #f5f5f5;
		&.button--gray {
			background-color: #d9d9d9;
		}
		&.button--blue {
			background-color: #29cdff;
		}
	}
}
.review-update-content {
	min-height: 194px;
	padding: 8px 16px;
	border-radius: 12px;
	background-color: #f7f7f7;
	font-size: 14px;
	color: #252525;
	line-height: 1.25;
	margin-top: 12px;
	border: none;
	&.area {
		width: 100%;
		background-color: #ffffff;
		border: 1px solid #e4e4e4;
		resize: none;
	}
}
</style>
