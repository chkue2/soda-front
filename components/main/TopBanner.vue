<template>
	<swiper :autoplay="true" :loop="true" :modules="modules">
		<swiper-slide>
			<div class="banner-container" @click="moveToIntroSoda">
				<picture>
					<source
						srcset="/img/main/banner-mo-01.png"
						media="all and (max-width: 640px)"
					/>
					<img src="/img/main/banner-pc-01.png" alt="메인 배너" />
				</picture>
				<p class="banner-title">법무사매칭은?<br />등기소다!</p>
				<p class="banner-subtitle">
					어려운 비용계산부터<br />법무사 매칭까지 원스톱서비스!
				</p>
				<button class="banner-button">알아보기</button>
			</div>
		</swiper-slide>
		<!-- <swiper-slide>
			<div class="banner-container">
				<picture>
					<source
						srcset="/img/main/banner-mo-02.png"
						media="all and (max-width: 640px)"
					/>
					<img src="/img/main/banner-pc-02.png" />
				</picture>
				<p class="banner-title">등기소다 X 프리로스<br />함께해요</p>
				<p class="banner-subtitle">
					등기소다와 프리로스는<br />서로 협력하는 파트너입니다.
				</p>
				<button class="banner-button" @click="moveToIntroPartnership">
					알아보기
				</button>
			</div>
		</swiper-slide> -->
	</swiper>
</template>

<script setup>
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';

const modules = [Autoplay];

const router = useRouter();

const moveToIntroSoda = () => {
	router.push('/intro/soda');
};
const moveToIntroPartnership = () => {
	router.push('/intro/partnership');
};
</script>

<style lang="scss" scoped>
.banner-container {
	height: 407px;
	padding: 40px;
	position: relative;
	cursor: pointer;
	& > picture,
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.banner-title {
		font-size: 20px;
		font-weight: $ft-bold;
		line-height: 29px;
	}
	.banner-subtitle {
		font-size: 14px;
		line-height: 20px;
		margin: 6px 0 16px;
		color: #767676;
	}
	.banner-button {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #484c52;
		padding: 0;
		text-decoration: underline;
	}
}
</style>
