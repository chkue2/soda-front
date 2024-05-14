<template>
	<HeaderClose title="비밀번호 찾기" />
	<div class="find-container mb56">
		<p class="find-text mt70 mb14">비밀번호 변경이 완료되었습니다.</p>
		<p class="find-text">새로운 비밀번호로 로그인해주세요.</p>
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
