<template>
	<HeaderCloseAndLike title="최고당 법무사 사무소" />
	<div class="lawyer-detail-container">
		<div class="detail-top-container">
			<img src="/img/icon/profile-iu.png" class="detail-profile" />
			<p class="firm-name">최고당 법무사 사무소</p>
			<div class="tel-container">
				<span>사무소 전화</span>
				<a href="tel:031-452-5555">031-452-5555</a>
				<span class="ml12">사무소 전화</span>
				<a href="tel:031-452-5555">031-452-5555</a>
			</div>
			<div class="expert-tags">
				<span>예약시간준수</span>
				<span>선호도 높음</span>
				<span>프로중의 프로</span>
			</div>
			<div class="expert-options">
				<span class="text--red">주말응대가능</span>
				<span><img src="/img/icon/quick-icon.svg" />빠른응답</span>
				<span v-if="false"><img src="/img/icon/good-icon.svg" />친절해요</span>
				<span v-if="false"><img src="/img/icon/smile-icon.svg" />공감하는</span>
				<span v-if="false"><img src="/img/icon/message-icon.svg" />꼼꼼한</span>
			</div>
			<div class="detail-info">
				<p class="info-distance">100 Km</p>
				<div class="info-rate">
					<img src="/img/icon/star-yellow.svg" />
					<span>4.8</span>
				</div>
				<div class="info-location">
					<img src="/img/icon/location-gray.svg" />
					<span>서울시 서초구 서초동</span>
				</div>
			</div>
		</div>
		<div class="detail-tabs">
			<div
				class="detail-tab"
				:class="{ active: tab === 'intro' }"
				@click="handlerClickTab('intro')"
			>
				<p>소개</p>
			</div>
			<div
				class="detail-tab"
				:class="{ active: tab === 'review' }"
				@click="handlerClickTab('review')"
			>
				<p>리뷰</p>
				<span>100</span>
			</div>
		</div>
		<div v-if="tab === 'intro'" class="detail-intro">
			<div class="intro-bedges">
				<div class="intro-bedge">
					<i>인증</i>
					<p>사업자확인</p>
				</div>
			</div>
			<div class="intro-content">
				여기는 법무사 소개란입니다.여기는 법무사 소개란입니다여기는 법무사
				소개란입니다여기는 법무사 소개란입니다여기는 법무사 소개란입니다여기는
				법무사 소개란입니다여기는 법무사 소개란입니다여기는 법무사 소개란입니다.
			</div>
		</div>

		<div v-if="tab === 'review'" class="law-rate">
			<p>고객평점 <b>4.5</b></p>
			<i></i>
			<p>프리로스 평점 <b>4.8</b></p>
		</div>
		<ReviewList v-if="tab === 'review'" :margin="[6, 10, 6, 10]" />
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="여기로 선택하기"
			@click-button="toggleLawyerSelectCompleteModal"
		/>
	</div>
	<LawyerSelectCompleteModal
		v-if="isLawyerSelectCompleteModalShow"
		@close-modal="toggleLawyerSelectCompleteModal"
	/>
</template>

<script setup>
import { ref } from 'vue';

import HeaderCloseAndLike from '~/components/layout/HeaderCloseAndLike.vue';
import ReviewList from '~/components/list/ReviewList.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import LawyerSelectCompleteModal from '~/components/modal/LawyerSelectCompleteModal.vue';

const tab = ref('intro');
const handlerClickTab = val => {
	tab.value = val;
};

const isLawyerSelectCompleteModalShow = ref(false);
const toggleLawyerSelectCompleteModal = () => {
	isLawyerSelectCompleteModalShow.value =
		!isLawyerSelectCompleteModalShow.value;
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/item/profile.scss';
.lawyer-detail-container {
	padding: 10px 10px 23px;
	margin-bottom: 56px;
}
.detail-top-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 8px;
	& > p {
		width: 100%;
	}
}
.detail-profile {
	width: 151px;
	height: 151px;
	border-radius: 50%;
	border: 1px solid #dde0e3;
}
.firm-name {
	margin: 13px 0 2.5px;
	line-height: 1.25;
	font-weight: $ft-thin;
	text-align: center;
}
.tel-container {
	font-size: 12px;
	margin-bottom: 20px;
	& > span {
		color: rgba(68, 68, 68, 0.88);
	}
	& > a {
		font-weight: $ft-bold;
		color: #4096ff;
		text-decoration: underline;
		cursor: pointer;
		margin-left: 4px;
	}
}
.law-rate {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 4px;
	margin: 18px 0 10px;
	padding-right: 10px;
	& > p {
		font-size: 12px;
		color: rgba(68, 68, 68, 0.91);
		& > b {
			color: rgba(0, 0, 0, 0.91);
			font-weight: $ft-bold;
		}
	}
	& > i {
		display: block;
		width: 1px;
		height: 9px;
		background-color: #ebebeb;
	}
}
.detail-info {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 2px 0;
	.info-distance {
		font-size: 11px;
		font-weight: $ft-bold;
	}
	.info-rate,
	.info-location {
		display: flex;
		align-items: center;
		gap: 2px;
		& > span {
			font-size: 11px;
			font-weight: $ft-medium;
			color: #62656c;
		}
	}
}
.expert-tags,
.expert-options {
	width: 100%;
}
.detail-tabs {
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 18px 0 12px;
	padding: 0 14px;
	border-bottom: 3px solid #f5f5f5;
	.detail-tab {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 3px;
		min-width: 65px;
		padding: 8px 4px;
		position: relative;
		cursor: pointer;
		& > p {
			font-size: 14px;
			font-weight: $ft-bold;
			color: #646464;
		}
		& > span {
			padding: 0 4px;
			height: 16px;
			line-height: 16px;
			border-radius: 96px;
			border: 1px solid #e8e8e8;
			background-color: #f7f7f7;
			font-size: 10px;
			font-weight: $ft-semibold;
			color: #1c1c1c;
		}
		&.active {
			&::after {
				content: '';
				width: 100%;
				height: 3px;
				background-color: #29cdff;
				position: absolute;
				bottom: -4px;
				left: 0;
			}
			& > p {
				color: #29cdff;
			}
		}
	}
}
.detail-intro {
	.intro-bedges {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 18px;
		gap: 24px;
	}
	.intro-bedge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		& > p {
			font-size: 14px;
			font-weight: $ft-bold;
		}
		& > i {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			font-style: normal;
			width: 28px;
			height: 28px;
			background-image: url('/img/icon/gra-circle-gray.svg');
			background-size: cover;
			font-size: 8px;
			font-weight: $ft-bold;
			color: #525252;
		}
	}
	.intro-content {
		padding: 23px 18px;
		min-height: 179px;
		border-radius: 17px;
		background-color: #f7f7f7;
		color: #252525;
		font-size: 12px;
		line-height: 23px;
		margin-top: 12px;
	}
}
</style>
