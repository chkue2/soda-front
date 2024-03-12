<template>
	<HeaderCloseAndLike title="최고당 법무사 사무소" />
	<div class="lawyer-detail-container">
		<div class="detail-top-container">
			<img src="/img/icon/profile-iu.png" class="detail-profile" />
			<p class="law-name">최고당 법무사 사무소</p>
			<p class="lawyer-name">김고은 법무사</p>
			<div class="detail-tags">
				<span>배상책임보험가입</span>
				<span>10년 경력</span>
			</div>
			<p class="detail-option">보수협의가능</p>
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
				<div class="intro-bedge"><p>10년 경력</p></div>
				<div class="intro-bedge">
					<i>인증</i>
					<p>사엄자확인</p>
				</div>
			</div>
			<div class="intro-content">
				여기는 법무사 소개란입니다.여기는 법무사 소개란입니다여기는 법무사
				소개란입니다여기는 법무사 소개란입니다여기는 법무사 소개란입니다여기는
				법무사 소개란입니다여기는 법무사 소개란입니다여기는 법무사 소개란입니다.
			</div>
		</div>
		<ReviewList v-if="tab === 'review'" :margin="[6, 10, 6, 10]" />
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton title="여기로 선택하기" />
	</div>
</template>

<script setup>
import { ref } from 'vue';

import HeaderCloseAndLike from '~/components/layout/HeaderCloseAndLike.vue';
import ReviewList from '~/components/list/ReviewList.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const tab = ref('intro');
const handlerClickTab = val => {
	tab.value = val;
};
</script>

<style lang="scss" scoped>
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
	margin-bottom: 30px;
	border: 1px solid #dde0e3;
}
.law-name {
	font-weight: $ft-thin;
	line-height: 23px;
}
.lawyer-name {
	margin: 3px 0;
	font-size: 14px;
	line-height: 20px;
}
.detail-tags {
	width: 100%;
	margin: 3px 0;
	display: flex;
	align-items: center;
	gap: 4px;
	& > span {
		border-radius: 3px;
		background-color: #eef1f8;
		padding: 0 3px;
		height: 17px;
		line-height: 17px;
		font-size: 12px;
		color: #61666c;
	}
}
.detail-option {
	font-size: 12px;
	color: #686868;
	font-weight: $ft-medium;
	margin: 3px 0;
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
