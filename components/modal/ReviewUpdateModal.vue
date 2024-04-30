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
							<i v-for="i in 5" :key="i" :class="{ active: i <= timeRate }"></i>
						</div>
					</div>
				</div>
				<div class="review-update-rate-item">
					<div class="review-update-rate">
						<p class="review-update-rate-title">친절만족도</p>
						<div class="review-update-rate-wrapper">
							<i v-for="i in 5" :key="i" :class="{ active: i <= kindRate }"></i>
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
								:class="{ active: i <= performanceRate }"
							></i>
						</div>
					</div>
					<p class="review-update-reg-date">작성일 2024-02-02</p>
				</div>
				<div
					v-if="!isUpdate"
					class="review-update-content"
					v-html="content"
				></div>
				<textarea
					v-if="isUpdate"
					v-model="cleanHTML"
					class="review-update-content area"
				></textarea>
				<div class="review-update-modal-buttons">
					<button class="button--gray" @click="CloseModal">삭제</button>
					<button v-if="!isUpdate" class="button--blue" @click="toggleUpdate">
						수정하기
					</button>
					<button v-if="isUpdate" class="button--blue" @click="toggleUpdate">
						저장하기
					</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { ref, computed } from 'vue';
import DOMPurify from 'dompurify';

import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);
const CloseModal = () => {
	emit('close-modal');
};

const timeRate = ref(4);
const kindRate = ref(3);
const performanceRate = ref(5);

const content = ref(
	'정말 친절하시고 시간약속도 잘 지켜주셨습니다. 덕분에 첫 주택구매를 잘 마쳤어요. 처음이라 긴장을 많이했는데 아이유 담당자님이 긴장하지말라고 노래도 불러주시고 얼굴도 예쁜데 마음도 이쁘시더라구요~호호호호 주변에 많이 자랑해놨어요',
);

const cleanHTML = computed(() => DOMPurify.sanitize(content));

const isUpdate = ref(false);
const toggleUpdate = () => {
	isUpdate.value = !isUpdate.value;
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
				background-image: url(/img/icon/star-yellow.svg);
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
