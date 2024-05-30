<template>
	<HeaderClose title="등기프로 찾기" />
	<div class="find-complete-container">
		<div class="complete-title">
			<img src="/img/icon/love-letter.png" />
			<p>프로필카드 받는 중</p>
		</div>
		<p class="complete-subtitle">
			총 24시간 동안 최대 5명에게 받아 볼 수 있습니다.<br />모집이 완료되면
			알림톡을 보내드려요.
		</p>
		<img src="/img/cow/cow-03.gif" class="complete-image" />
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="홈으로"
			@click-button="handlerClickHomeButton"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const router = useRouter();
const handlerClickHomeButton = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped>
.find-complete-container {
	padding: 12px 15px 28px;
	margin-bottom: 52px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.complete-title {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 4px;
	margin-bottom: 5px;
	& > p {
		font-weight: $ft-bold;
		color: #252525;
	}
	& > img {
		width: 20px;
		margin-bottom: 1px;
	}
}
.complete-subtitle {
	width: 100%;
	text-align: left;
	font-size: 13px;
	color: #252525;
	line-height: 1.4;
}
.complete-image {
	width: 176px;
	height: auto;
	margin: 94px 0 50px;
}
.complete-content {
	font-size: 14px;
	color: #1e1e1e;
	line-height: 21px;
	text-align: center;
}
</style>
