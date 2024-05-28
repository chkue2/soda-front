<template>
	<!-- <form id="niceForm" action="niceForm">
		<input id="m" type="hidden" name="m" value="checkplusService" />
		<input id="token_version_id" type="hidden" name="token_version_id" />
		<input id="enc_data" type="hidden" name="enc_data" />
		<input id="integrity_value" type="hidden" name="integrity_value" />
	</form> -->
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
		<p class="input-form-title mb5">
			아이디<span>영문이나 숫자의 조합, 5자 이상</span>
		</p>
		<div class="form-input mb40">
			<input
				v-model="form.id"
				type="text"
				placeholder="아이디를 입력하세요"
				maxlength="20"
				@keyup="handlerKeyupId"
			/>
			<button class="id-check-button" @click="handlerClickIdCheckButton">
				중복체크
			</button>
		</div>
		<p class="input-form-title mb5">
			비밀번호<span>영문,숫자,특수문자를 조합한 8자 이상</span>
		</p>
		<div class="form-input mb16">
			<input
				v-model="form.password"
				type="password"
				placeholder="비밀번호를 입력하세요"
			/>
		</div>
		<p class="input-form-title mb5">비밀번호 확인</p>
		<div class="form-input mb16">
			<input
				v-model="form.passwordConfirm"
				type="password"
				placeholder="비밀번호를 한번 더 입력하세요"
			/>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="회원가입"
			:progress-width="(formValidationCount / 6) * 100"
			@click-button="handlerClickSignupButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { isValidPassword, isValidId } from '~/assets/js/utils.js';
import { signup } from '~/services/signup.js';
import { useSignupStore } from '~/store/signup.js';

const form = ref({
	phone: '',
	name: '',
	id: '',
	password: '',
	passwordConfirm: '',
	userIdentityKey: '',
});
const idCheck = ref(false);

onMounted(() => {
	const receiveData = async e => {
		if (e.data.name) {
			form.value.name = e.data.name;
			form.value.phone = e.data.phone;
			form.value.userIdentityKey = e.data.userIdentityKey;
		}
	};

	window.addEventListener('message', receiveData, false);
});

const handlerClickSelfIdentification = () => {
	signup
		.getNice({
			checkId: true,
			// redirect_url: `${window.location.origin}/signup/nice-result`,
		})
		.then(({ data }) => {
			const wnd = window.open(undefined, 'new window', 'width=500, height=600');
			wnd.document.write(data);
		})
		.catch(e => {
			console.log(e);
			alert(e.response.data.message);
		});
};

const formValidationCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);
const isFormValidation = computed(
	() =>
		formValidationCount.value === Object.values(form.value).length &&
		idCheck.value &&
		isValidId(form.value.id) &&
		isValidPassword(form.value.password) &&
		form.value.password === form.value.passwordConfirm,
);

const handlerKeyupId = () => {
	idCheck.value = false;
};

const handlerClickIdCheckButton = () => {
	if (form.value.id === '') {
		alert('아이디를 입력해주세요');
		return false;
	}
	if (!isValidId(form.value.id)) {
		alert('아이디는 영문이나 숫자를 조합한 5자리 이상 입력해야 합니다');
		return false;
	}
	signup
		.checkId({ userId: form.value.id })
		.then(() => {
			idCheck.value = true;
			alert('사용 가능한 아이디입니다');
		})
		.catch(e => {
			alert(e.response.data.message);
		});
};

const router = useRouter();
const signupStore = useSignupStore();
const handlerClickSignupButton = () => {
	if (!isFormValidation.value) {
		if (form.value.phone === '' || form.value.name === '') {
			alert('본인인증이 필요합니다');
		} else if (form.value.id === '') {
			alert('아이디를 입력해주세요');
		} else if (!idCheck.value) {
			alert('아이디 중복체크를 해주세요');
		} else if (form.value.password === '') {
			alert('비밀번호를 입력해주세요');
		} else if (!isValidPassword(form.value.password)) {
			alert(
				'비밀번호는 영문, 숫자, 특수문자를 조합한 8자리 이상 입력해야 합니다',
			);
		} else if (form.value.password !== form.value.passwordConfirm) {
			alert('비밀번호와 비밀번호 확인이 다릅니다');
		}
		return false;
	}

	const formData = new FormData();
	formData.append('userId', form.value.id);
	formData.append('password', form.value.password);
	formData.append('userName', form.value.name);
	formData.append('mobile', form.value.phone);
	formData.append('privacyPolicyAgree', signupStore.agreePolicy ? 'Y' : 'N');
	formData.append('termsOfServiceAgree', signupStore.agreeUse ? 'Y' : 'N');
	formData.append('advInfoReceiveAgree', signupStore.agreeAd ? 'Y' : 'N');
	formData.append('alimTalkYn', 'Y');
	formData.append('userIdentityKey', form.value.userIdentityKey);

	signup
		.join(formData)
		.then(() => {
			router.replace('/signup/success');
		})
		.catch(e => {
			alert(e.response.data.message);
		});
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
.id-check-button {
	width: 109px;
	height: 100%;
	border-radius: 0 30px 30px 0;
	background-color: #29cdff;
	font-size: 16px;
	color: #ffffff;
	margin-right: -20px;
}
</style>
