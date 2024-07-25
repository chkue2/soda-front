<template>
	<form id="niceForm" action="niceForm">
		<input id="m" type="hidden" name="m" value="checkplusService" />
		<input id="token_version_id" type="hidden" name="token_version_id" />
		<input id="enc_data" type="hidden" name="enc_data" />
		<input id="integrity_value" type="hidden" name="integrity_value" />
	</form>
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
			:progress-width="(formValidationCount / 3) * 100"
			@click-button="handlerClickSignupButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { signup } from '~/services/signup.js';
import { useSignupStore } from '~/store/signup.js';
import { useAlertStore } from '~/store/alert.js';

const form = ref({
	phone: '',
	name: '',
	userIdentityKey: '',
});

const actionUrl = ref('');

const props = defineProps({
	snsForm: {
		type: Object,
		default: () => {},
	},
});
const alertStore = useAlertStore();

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
			alertStore.open(e.response.data.message);
		});
};

const formValidationCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);
const isFormValidation = computed(
	() => formValidationCount.value === Object.values(form.value).length,
);

const router = useRouter();
const signupStore = useSignupStore();
const handlerClickSignupButton = () => {
	if (!isFormValidation.value) {
		if (form.value.phone === '' || form.value.name === '') {
			alertStore.open('본인인증이 필요합니다');
		}
		return false;
	}

	const formData = new FormData();
	formData.append('userName', form.value.name);
	formData.append('mobile', form.value.phone);
	formData.append('privacyPolicyAgree', signupStore.agreePolicy ? 'Y' : 'N');
	formData.append('termsOfServiceAgree', signupStore.agreeUse ? 'Y' : 'N');
	formData.append('advInfoReceiveAgree', signupStore.agreeAd ? 'Y' : 'N');
	formData.append('alimTalkYn', 'Y');
	formData.append('userIdentityKey', form.value.userIdentityKey);
	formData.append('loginType', props.snsForm.loginType);
	formData.append('userSnsKeyId', props.snsForm.userSnsKeyId);

	signup
		.joinSns(formData)
		.then(() => {
			router.replace('/signup/success');
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
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
</style>
