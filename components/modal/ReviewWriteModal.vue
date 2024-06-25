<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="review-write-container">
				<p class="review-write-title">
					서비스 이용에 불편함은 없으셨나요?<br />해당 사무소에 대한 리뷰를
					남겨주세요.
				</p>
				<div class="review-write-profile">
					<img :src="profileImageUrl" alt="프로필 이미지" />
					<div>
						<p class="profile-firm-name">{{ props.card.firmName }}</p>
						<ExpertTagsItem :badge="props.card.badge || []" />
					</div>
				</div>
				<div class="review-write-form">
					<div class="review-write-form-title mb10">
						<p>시간준수 만족도</p>
						<span>별점을 눌러 평가해주세요 </span>
					</div>
					<div class="review-write-form-rate-container mb20">
						<i
							v-for="i in 5"
							:key="i"
							:class="{ active: i <= timeRate }"
							@click="setTimeRate(i)"
						></i>
					</div>
					<div class="review-write-form-title mb10">
						<p>친절 만족도</p>
						<span>별점을 눌러 평가해주세요 </span>
					</div>
					<div class="review-write-form-rate-container mb20">
						<i
							v-for="i in 5"
							:key="i"
							:class="{ active: i <= kindRate }"
							@click="setKindRate(i)"
						></i>
					</div>
					<div class="review-write-form-title mb10">
						<p>업무수행 만족도</p>
						<span>별점을 눌러 평가해주세요 </span>
					</div>
					<div class="review-write-form-rate-container mb20">
						<i
							v-for="i in 5"
							:key="i"
							:class="{ active: i <= performanceRate }"
							@click="setPerformanceRate(i)"
						></i>
					</div>
					<div class="review-write-form-title mb10">
						<p>후기</p>
					</div>
					<textarea
						v-model="memo"
						class="review-write-form-text"
						:placeholder="memoPlaceholder"
					></textarea>
				</div>
				<button
					class="review-write-modal-button"
					@click="handlerClickApplyButton"
				>
					저장
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import CommonModal from '~/components/modal/CommonModal.vue';

import ExpertTagsItem from '~/components/item/ExpertTagsItem.vue';

import { user } from '~/services/user.js';
import { useLoadingStore } from '~/store/loading.js';

const randomMemoEnums = [
	'안심하고 진행했어요.',
	'프로다운 모습에 감탄했어요.',
	'약속시간을 잘 지켜줘서 수월하게 진행했어요.',
	'모르는것도 친절하게 설명해줬어요.',
	'기분좋게 계약할 수 있었어요.',
];

const props = defineProps({
	card: {
		type: Object,
		default: () => {},
	},
	detail: {
		type: Object,
		default: () => {},
	},
});
const emit = defineEmits(['call-api', 'close-modal']);

const loadingStore = useLoadingStore();

const timeRate = ref(0);
const kindRate = ref(0);
const performanceRate = ref(0);
const memo = ref('');

const memoPlaceholder = ref('');

onMounted(() => {
	memoPlaceholder.value = randomMemoEnums[Math.floor(Math.random() * 5)];
});

const setTimeRate = rate => {
	timeRate.value = rate;
};
const setKindRate = rate => {
	kindRate.value = rate;
};
const setPerformanceRate = rate => {
	performanceRate.value = rate;
};

const profileImageUrl = computed(() => {
	const domain =
		location.href.includes('.local') || location.href.includes('dev.')
			? 'https://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';

	return `${domain}${props.card.profileFileUrl}`;
});

const handlerClickApplyButton = () => {
	if (timeRate.value === 0) {
		alert('시간준수 만족도 별점을 눌러 평가해주세요.');
		return false;
	} else if (kindRate.value === 0) {
		alert('친절 만족도 별점을 눌러 평가해주세요.');
		return false;
	} else if (performanceRate.value === 0) {
		alert('업무수행 만족도 별점을 눌러 평가해주세요.');
		return false;
	}

	loadingStore.setLoadingShow(true);
	user
		.insertReview({
			tradeCaseId: props.detail.tradeCaseId,
			firmCode: props.card.firmCode,
			timeCriteria: timeRate.value,
			kindCriteria: kindRate.value,
			rapidCriteria: performanceRate.value,
			memo: memo.value === '' ? memoPlaceholder.value : memo.value,
			useYn: 'Y',
			showYn: 'Y',
		})
		.then(() => {
			alert('리뷰가 작성되었습니다.');
			emit('call-api');
			CloseModal();
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const CloseModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/item/profile.scss';
.review-write-container {
	padding: 0 15px 20px;
}
.review-write-title {
	font-size: 12px;
	font-weight: $ft-bold;
	line-height: 1.5;
	text-align: center;
}
.review-write-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
	margin-top: 17px;
}
.review-write-profile {
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 38px 0;
	padding: 0 15px;
	& > img {
		width: 40px;
		height: 40px;
		border: 1px solid #ddf03f;
		border-radius: 16px;
	}
	.profile-firm-name {
		font-weight: $ft-thin;
		line-height: 23px;
		margin-bottom: 3px;
	}
}
.review-write-form-title {
	display: flex;
	align-items: center;
	gap: 6px;
	& > p {
		font-size: 14px;
		font-weight: $ft-bold;
	}
	& > span {
		font-size: 12px;
		color: #c5c6cc;
	}
}
.review-write-form-rate-container {
	display: flex;
	justify-content: center;
	gap: 9px;
	padding: 20px 30px;
	border: 1px solid #f1f1f1;
	background-color: #f8f8f8;
	& > i {
		display: block;
		width: 40px;
		height: 39px;
		cursor: pointer;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-image: url(/img/icon/star-gray.svg);
		&.active {
			background-image: url(/img/icon/star-yellow-02.svg);
		}
	}
}
.review-write-form-text {
	width: 100%;
	height: 105px;
	padding: 8px 16px;
	border-radius: 12px;
	border: 1px solid #e4e4e4;
	font-size: 12px;
	line-height: 1.45;
	resize: none;
}
</style>
