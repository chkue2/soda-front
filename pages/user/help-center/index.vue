<template>
	<HeaderClose title="고객센터" />
	<div class="help-center-container">
		<div class="help-center-item bb">
			<div class="help-center-item-left">
				<img src="/img/icon/pin-white.svg" />
				<p>공지사항</p>
			</div>
			<NuxtLink to="/notice" class="help-center-link">확인하기</NuxtLink>
		</div>
		<div class="help-center-item bb">
			<div class="help-center-item-left">
				<img src="/img/icon/message-white.svg" />
				<p>고객 문의</p>
			</div>
			<NuxtLink to="/user/inquiry" class="help-center-link"
				>1:1문의 남기기</NuxtLink
			>
		</div>
		<p class="help-center-text">
			일대일 문의에 문의사항을 남겨주시면 최대한 빠른 시일내에 상담사가
			답변드리겠습니다.
		</p>
		<div class="help-center-item bb bt mt60">
			<div class="help-center-item-left">
				<img src="/img/icon/live-chat-white.svg" />
				<p>고객 문의</p>
			</div>
			<button class="help-center-link" @click="toggleHelpCenterCallModal">
				1670-2361
			</button>
		</div>
		<p class="help-center-text">
			평일 오전 09:00 ~ 오후 06:00 (주말 및 공휴일 제외)
		</p>
		<p class="help-center-text">점심시간 (오후 12:00 ~ 오후 01:00)</p>
	</div>
	<HelpCenterCallModal
		v-if="isHelpCenterCallModalShow"
		@close-modal="toggleHelpCenterCallModal"
	/>
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import HelpCenterCallModal from '~/components/modal/HelpCenterCallModal.vue';

const isHelpCenterCallModalShow = ref(false);
const toggleHelpCenterCallModal = () => {
	isHelpCenterCallModalShow.value = !isHelpCenterCallModalShow.value;
};
</script>

<style lang="scss" scoped>
.help-center-container {
	padding: 14px 15px 38px;
}
.help-center-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px 0;
	&.bt {
		border-top: 1px solid #ebebeb;
	}
	&.bb {
		border-bottom: 1px solid #ebebeb;
	}
}
.help-center-item-left {
	display: flex;
	align-items: center;
	gap: 8px;
	& > img {
		width: 18px;
		height: 18px;
	}
	& > p {
		font-size: 14px;
	}
}
.help-center-link {
	font-size: 14px;
	font-weight: $ft-bold;
	color: #29cdff;
	text-decoration: none;
}
.help-center-text {
	font-size: 13px;
	color: #949494;
	line-height: 1.25;
	margin-top: 13px;
}
</style>
