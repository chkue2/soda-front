<template>
	<HeaderClose title="비밀번호 찾기" />
	<div class="find-container mb56">
		<p class="form-title mb11">아이디</p>
		<div class="form-input mb36">
			<input type="text" placeholder="아이디를 입력하세요" />
		</div>
		<p class="form-title mb11">휴대전화번호</p>
		<div class="form-readonly-input mb36">
			<input type="tel" readonly placeholder="본인인증 후 자동입력" />
			<button class="button-cert">본인인증</button>
		</div>
		<p class="form-title mb11">이름</p>
		<div class="form-readonly-input mb24">
			<input type="text" readonly placeholder="본인인증 후 자동입력" />
		</div>
		<p class="find-password-help-text mb4">
			• 등록하신 휴대전화로 임시비밀번호를 발송해드립니다.
		</p>
		<p class="find-password-help-text">
			• 임시비밀번호로 로그인 한 후, 새로운 비밀번호를 설정하세요.
		</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="임시비밀번호 발급하기"
			progress-color="#404040"
		/>
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
</script>

<style lang="scss" scoped>
@import '~/assets/scss/form/find.scss';
.form-readonly-input {
	display: flex;
	gap: 6px;
	& > input {
		flex: 1;
		height: 45px;
		background-color: #f2f2f2;
		border-radius: 6px;
		padding: 0 20px;
		border: none;
	}
}
.button-cert {
	width: 109px;
	height: 45px;
	background-color: #000000;
	border-radius: 5px;
	color: #ffffff;
}
.find-password-help-text {
	font-size: 12px;
	color: #959595;
	line-height: 1.25;
}
</style>
