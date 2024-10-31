<template>
	<HeaderClose title="비밀번호 찾기" />
	<div class="find-container mb56">
		<p class="input-form-title mb11">아이디</p>
		<div class="form-input mb36">
			<input v-model="form.id" type="text" placeholder="아이디를 입력하세요" />
		</div>
		<p class="input-form-title mb11">휴대전화번호</p>
		<div class="form-readonly-input mb36">
			<input
				class="w60"
				v-model="form.mobile"
				type="tel"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
			<button class="button-cert" @click="handlerClickSelfIdentification">
				본인인증
			</button>
		</div>
		<p class="input-form-title mb11">이름</p>
		<div class="form-readonly-input mb24">
			<input
				class="w100"
				v-model="form.userName"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
		</div>
		<p class="input-form-title mb11">
			새로운 비밀번호 <span>영문,숫자,특수문자를 조합한 8자 이상</span>
		</p>
		<div class="form-input mb36">
			<input
				v-model="form.password"
				type="password"
				placeholder="비밀번호를 입력하세요"
			/>
		</div>
		<p class="input-form-title mb11">비밀번호 확인</p>
		<div class="form-input mb36">
			<input
				v-model="form.passwordConfirm"
				type="password"
				placeholder="비밀번호를 한번 더 입력하세요"
			/>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="비밀번호 변경"
			:progress-width="(formValidationCount / 6) * 100"
			@click-button="handlerClickApplyButton"
		/>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { isValidPassword } from '~/assets/js/utils.js';
import { signup } from '~/services/signup.js';
import { user } from '~/services/user.js';
import { useAlertStore } from '~/store/alert.js';

const alertStore = useAlertStore();

const form = ref({
	mobile: '',
	userName: '',
	id: '',
	password: '',
	passwordConfirm: '',
	userIdentityKey: '',
});

const actionUrl = ref('');

onMounted(() => {
	const receiveData = async e => {
		if (e.data.name) {
			form.value.userName = e.data.name;
			form.value.mobile = e.data.phone;
			form.value.userIdentityKey = e.data.userIdentityKey;
		}
	};

	window.addEventListener('message', receiveData, false);
});

const handlerClickSelfIdentification = () => {
	signup
		.getNice({
			checkId: false,
			// redirect_url: `${window.location.origin}/signup/nice-result`,
		})
		.then(({ data }) => {
			const wnd = window.open(undefined, 'new window', 'width=500, height=600');
			wnd.document.write(data);
		})
		.catch(e => {
			console.log(e);
			alertStore.open(e.response.data.message);
		});
};

const formValidationCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);
const isFormValidation = computed(
	() =>
		formValidationCount.value === Object.values(form.value).length &&
		isValidPassword(form.value.password) &&
		form.value.password === form.value.passwordConfirm,
);

const router = useRouter();
const handlerClickApplyButton = () => {
	if (!isFormValidation.value) {
		if (form.value.id === '') {
			alertStore.open('아이디를 입력해주세요');
		} else if (form.value.mobile === '' || form.value.userName === '') {
			alertStore.open('본인인증이 필요합니다');
		} else if (form.value.password === '') {
			alertStore.open('비밀번호를 입력해주세요');
		} else if (!isValidPassword(form.value.password)) {
			alertStore.open(
				'비밀번호는 영문, 숫자, 특수문자를 조합한 8자리 이상 입력해야 합니다',
			);
		} else if (form.value.password !== form.value.passwordConfirm) {
			alertStore.open('비밀번호와 비밀번호 확인이 다릅니다');
		}
		return false;
	}

	const formData = new FormData();
	formData.append('userId', form.value.id);
	formData.append('password', form.value.password);
	formData.append('userName', form.value.userName);
	formData.append('mobile', form.value.mobile);
	formData.append('userIdentityKey', form.value.userIdentityKey);

	user
		.findPw(formData)
		.then(() => {
			router.replace('/user/find/password/result');
		})
		.catch(e => {
			console.log(e);
			alertStore.open(e.response.data.message);
		});
};
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
		font-size: 16px;
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
