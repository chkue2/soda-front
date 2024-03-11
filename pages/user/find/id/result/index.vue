<template>
	<HeaderClose title="아이디 찾기" />
	<div class="find-container mb56">
		<p class="find-text mt35 mb35">
			등록된 정보로<br />가입된 아이디가 없습니다.
		</p>
	</div>
	<div class="find-container mb56">
		<p class="find-text mt24 mb18">등록된 정보와 일치하는 아이디입니다.</p>
		<div class="find-info-container">
			<div class="login-type login--kakao">
				<img src="/img/icon/kakao-logo.svg" />
				<span>로그인</span>
			</div>
			<div class="find-info-text">
				<p class="find-info-id mb11">askdnasdbn@gmail.com</p>
				<p class="find-info-reg-date">가입날짜 2024.02.05</p>
			</div>
		</div>
		<NuxtLink to="/" class="move-to-find-password mt32">비밀번호 찾기</NuxtLink>
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
@import '~/assets/scss/form/find.scss';
.find-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.find-info-container {
	display: inline-flex;
	align-items: center;
	gap: 18px;
	padding: 18px 15px;
	background-color: #f6f6f6;
}
.login-type {
	height: 30px;
	padding: 0 9px;
	display: flex;
	align-items: center;
	gap: 4px;
	border-radius: 4px;
	&.login--kakao {
		background-color: #fee500;
	}
	& > span {
		font-size: 10px;
		font-weight: $ft-semibold;
		color: rgba(0, 0, 0, 0.85);
	}
}
.find-info-reg-date {
	font-size: 14px;
	color: #545454;
}
.move-to-find-password {
	width: 225px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #5f5f5f;
	border-radius: 6px;
	color: #5f5f5f;
	text-decoration: none;
}
</style>
