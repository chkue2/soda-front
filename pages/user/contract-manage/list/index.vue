<template>
	<HeaderClose title="내 계약 관리" />
	<div class="contract-manage-tabs">
		<div class="contract-manage-tab active">전체</div>
		<div class="contract-manage-tab">진행중</div>
		<div class="contract-manage-tab">완료</div>
	</div>
	<p class="contract-manage-title">내 사건</p>
	<button class="contract-add-button">
		<span>간단한 정보입력으로 쉽고 빠르게</span>
		<p>
			<img src="/img/icon/add-square-black.svg" />
			<strong>내 사건 불러오기</strong>
		</p>
	</button>
	<div class="contract-manage-swiper">
		<swiper :space-between="20" slides-per-view="auto">
			<swiper-slide v-for="i in 3" :key="i">
				<div class="contract-manage-item">
					<div class="contract-manage-top">
						<p class="contract-name">홍길동</p>
						<p class="contract-date">잔금일 2024-05-24</p>
						<p class="contract-address">
							경기도 과천시 별양상가1로 18 과천오피스텔 106호
						</p>
						<p class="contract-bank">
							<img src="/img/icon/kakaobank.png" />
							<span>카카오뱅크</span>
						</p>
					</div>
					<div class="contract-button-container">
						<button @click="handlerClickMoveToDetailButton">
							<span>눌러서 상세보기</span>
							<img src="/img/icon/arrow-upside-circle-black.svg" />
						</button>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import HeaderClose from '~/components/layout/HeaderClose.vue';

const router = useRouter();
const handlerClickMoveToDetailButton = () => {
	router.push('/user/contract-manage/detail/1');
};
</script>

<style lang="scss" scoped>
.contract-manage-tabs {
	display: flex;
	align-items: center;
	padding: 10px 16px 0;
}
.contract-manage-tab {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 15px 0;
	border: 2px solid #f5f6f7;
	font-size: 12px;
	font-weight: $ft-bold;
	color: #c5c6cc;
	cursor: pointer;
	& + .contract-manage-tab {
		border-left: none;
	}
	&:nth-of-type(1) {
		border-radius: 30px 0 0 30px;
	}
	&:nth-of-type(3) {
		border-radius: 0 30px 30px 0;
	}
	&.active {
		color: #000000;
	}
}
.contract-manage-title {
	padding: 15px 20px;
	font-size: 14px;
	font-weight: $ft-medium;
	color: #252525;
}
.contract-add-button {
	width: calc(100% - 24px);
	margin: 0 12px;
	border: 1px dotted #adadad;
	padding: 16px 0;
	border-radius: 6px;
	& > span {
		font-size: 12px;
		color: #252525;
	}
	& > p {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		& > strong {
			font-weight: $ft-bold;
			color: #252525;
		}
	}
}
.contract-manage-swiper {
	margin-top: 15px;
	padding: 0 20px 20px;
	&:v-deep(.swiper-slide) {
		width: calc(100% - 40px);
	}
}
.contract-manage-item {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 456px;
	padding: 45px 28px 39px;
	border-radius: 6px;
	background: conic-gradient(
		from -57deg at 48.5% 50%,
		#fbfbfd 26.24999910593033deg,
		#c8d4da 88.12500178813934deg,
		#fff 156.58468008041382deg,
		#aec0ce 191.74442768096924deg,
		#e3e9ee 237.1290135383606deg,
		#fafbfc 255.19062280654907deg,
		#d6dfe6 310.1085305213928deg,
		#b8c9d3 331.875deg
	);
}
.contract-name {
	font-size: 24px;
	font-weight: $ft-bold;
}
.contract-date {
	margin: 8px 0 23px;
}
.contract-address {
	line-height: 24px;
	word-break: keep-all;
}
.contract-bank {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 24px;
	& > img {
		width: 21px;
		height: 21px;
	}
	& > span {
		color: #252525;
	}
}
.contract-button-container {
	display: flex;
	justify-content: flex-end;
	& > button {
		padding: 10px 19px;
		border-radius: 19px;
		display: flex;
		align-items: center;
		gap: 5px;
	}
}
</style>
