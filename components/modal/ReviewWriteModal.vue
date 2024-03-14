<template>
	<CommonModal @close-modal="CloseModal">
		<template #modal-body>
			<div class="review-write-container">
				<p class="review-write-title">
					서비스 이용에 불편함은 없으셨나요?<br />해당 사무소에 대한 리뷰를
					남겨주세요.
				</p>
				<div class="review-write-profile">
					<img src="/img/icon/profile-iu.png" />
					<div>
						<p class="profile-firm-name">최고다 법무사사무소</p>
						<div class="expert-tags">
							<span>예약시간준수</span>
							<span>인기많아요</span>
							<span>프로중의 프로</span>
						</div>
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
						<p>시간준수 만족도</p>
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
						class="review-write-form-text"
						placeholder="심한 비방, 욕설은 무통보 비공개 처리될 수 있습니다."
					></textarea>
				</div>
				<button class="review-write-modal-button" @click="CloseModal">
					저장
				</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { ref } from 'vue';
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);
const CloseModal = () => {
	emit('close-modal');
};

const timeRate = ref(0);
const kindRate = ref(0);
const performanceRate = ref(0);

const setTimeRate = rate => {
	timeRate.value = rate;
};
const setKindRate = rate => {
	kindRate.value = rate;
};
const setPerformanceRate = rate => {
	performanceRate.value = rate;
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
			background-image: url(/img/icon/star-yellow.svg);
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
