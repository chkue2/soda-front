<template>
	<HeaderClose title="아이디 찾기" />
	<div class="find-container mb56">
		<p class="form-title mb11">이름</p>
		<div class="form-input mb36">
			<input type="text" placeholder="이름을 입력하세요" />
		</div>
		<p class="form-title mb11">휴대전화번호</p>
		<div class="form-input">
			<input type="tel" placeholder="-없이 숫자만 입력하세요" />
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton title="아이디 찾기" progress-color="#404040" />
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
</script>

<style lang="scss" scoped>
@import '~/assets/scss/form/find.scss';
</style>
