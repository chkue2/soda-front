<template>
	<HeaderClose title="회원가입" />
	<p class="signup-success-title">
		축하합니다.<br />회원가입이 완료되었습니다!
	</p>
	<div class="signup-success-image">
		<img src="/img/cow/cow-06.png" alt="회원가입 완료" aria-hidden />
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="로그인하기"
			@click-button="handlerClickMoveToLogin"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import HeaderClose from '~/components/layout/HeaderClose.vue';

const router = useRouter();
const handlerClickMoveToLogin = () => {
	router.replace('/login');
};
</script>

<style lang="scss" scoped>
.signup-success-title {
	margin: 88px 0 22px;
	text-align: center;
	color: #252525;
}
.signup-success-image {
	display: flex;
	justify-content: center;
	& > img {
		width: 210px;
		height: auto;
	}
}
</style>
