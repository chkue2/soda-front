<template>
	<div class="process-banner-container mb65 pl17 pr17">
		<swiper :space-between="18" slides-per-view="auto">
			<swiper-slide v-for="i in [2, 3, 4, 5, 6]" :key="i">
				<img
					:src="`/img/main/process-0${i}.png`"
					class="process-image"
					alt="등기소다 진행 방법"
				/>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
</script>

<style lang="scss" scoped>
.process-image {
	width: 100%;
	height: auto;
}
.swiper-slide {
	width: 205px;
}
</style>
