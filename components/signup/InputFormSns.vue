<template>
	<div class="input-form-container">
		<p class="input-form-title mb5">휴대전화번호</p>
		<div class="form-readonly-box mb10">
			<input
				v-model="form.phone"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
			<button @click="handlerClickSelfIdentification">본인인증</button>
		</div>
		<p class="input-form-title mb5">이름</p>
		<div class="form-readonly-box mb40">
			<input
				v-model="form.name"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="회원가입"
			:progress-width="(formValidationCount / 2) * 100"
			@click-button="handlerClickSignupButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const form = ref({
	phone: '',
	name: '',
});

const handlerClickSelfIdentification = () => {
	form.value.phone = '01012341234';
	form.value.name = '홍길동';
};

const formValidationCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);
const isFormValidation = computed(
	() => formValidationCount.value === Object.values(form.value).length,
);

const router = useRouter();
const handlerClickSignupButton = () => {
	if (!isFormValidation.value) {
		if (form.value.phone === '' || form.value.name === '') {
			alert('본인인증이 필요합니다');
		}
		return false;
	}

	router.replace('/signup/success');
};
</script>

<style lang="scss" scoped>
.input-form-container {
	padding: 40px 30px 70px;
}
.form-readonly-box {
	display: flex;
	gap: 6px;
	justify-content: space-between;
	align-items: center;
	& > input {
		flex: 1;
		height: 45px;
		padding: 0 20px;
		background-color: #f2f2f2;
		border-radius: 6px;
		border: none;
		font-size: 16px;
	}
	& > button {
		width: 109px;
		height: 45px;
		border-radius: 5px;
		background-color: #000000;
		color: #ffffff;
		font-size: 16px;
	}
}
.input-form-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > span {
		font-size: 12px;
		color: #a3a3a3;
	}
}
</style>
