<template>
	<swiper>
		<swiper-slide>
			<div class="process-container">
				<img src="/img/main/process-01.png" class="process-image" />
				<div class="process-text">
					<span class="process-number">1</span>
					<div>
						<p class="process-title">정보입력하기</p>
						<p class="process-content">
							고객님이 입력한 제안서를 보고 2시간 이내 총 5명의 법무사들이
							매칭돼요
						</p>
					</div>
				</div>
			</div>
		</swiper-slide>
		<swiper-slide>
			<div class="process-container">
				<img src="/img/main/process-01.png" class="process-image" />
				<div class="process-text">
					<span class="process-number">2</span>
					<div>
						<p class="process-title">정보입력하기</p>
						<p class="process-content">
							고객님이 입력한 제안서를 보고 2시간 이내 총 5명의 법무사들이
							매칭돼요
						</p>
					</div>
				</div>
			</div>
		</swiper-slide>
	</swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
</script>

<style lang="scss" scoped>
.process-container {
	padding: 20px 17px 63px;
}
.process-image {
	width: 100%;
	height: 333px;
	margin-bottom: 20px;
}
.process-text {
	display: flex;
	gap: 10px;
}
.process-number {
	width: 25px;
	height: 25px;
	line-height: 25px;
	background-color: #29cdff;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #ffffff;
	text-align: center;
}
.process-title {
	font-size: 18px;
	font-weight: $ft-bold;
	line-height: 23px;
}
.process-content {
	font-size: 14px;
	color: #949599;
	line-height: 20px;
}

@media all and (max-width: 640px) {
	.process-image {
		height: 313px;
	}
}
</style>
