<template>
	<HeaderClose title="비밀번호 찾기" />
	<div class="find-container mb56">
		<p class="find-text mt35 mb24">
			등록된 휴대전화로<br />임시비밀번호를 발송하였습니다.
		</p>
		<p class="find-text">로그인 후, 새로운 비밀번호를 설정하세요!</p>
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
</style>
