<template>
	<HeaderClose title="본인확인" />
	<div class="certified-form">
		<p class="form-title text-center mb11">휴대전화 뒤의 4자리를 입력하세요</p>
		<input
			v-model="form.phone"
			type="password"
			class="form-input mb35"
			placeholder="휴대전화 뒤의 4자리"
			maxlength="4"
		/>
		<p class="form-title text-center mb11">대출받은 은행을 선택하세요</p>
		<select v-model="form.bank" class="form-select mb42">
			<option value="">은행 선택</option>
			<option v-for="(bank, index) in banks" :key="index" :value="bank.key">
				{{ bank.text }}
			</option>
		</select>
		<p class="form-warning">입력하신 정보를 다시 한번 확인해주세요!</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="본인확인"
			:progress-width="(validateCount / 2) * 100"
			@click-button="handlerClickNextButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import {
	LOGIN_REDIRECT_KEY,
	LOGIN_REDIRECT_AUTH_KEY,
	BANK_ID_KEY,
	BANK_AUTH_KEY,
} from '~/assets/js/storageKeys.js';
import { banks } from '~/assets/js/banks.js';
import { bankAuth } from '~/services/bankAuth.js';

const form = ref({
	phone: '',
	bank: '',
});

const validateCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);
const isValidation = computed(() => {
	return (
		form.value.phone !== '' &&
		form.value.phone.length === 4 &&
		form.value.bank !== ''
	);
});

const router = useRouter();
const route = useRoute();
const handlerClickNextButton = () => {
	if (!isValidation.value) {
		if (form.value.phone === '') {
			alert('휴대전화 뒤의 4자리를 입력해주세요');
		} else if (form.value.phone.length !== 4) {
			alert('휴대전화 뒤의 4자리를 입력해주세요');
		} else if (form.value.bank !== '') {
			alert('대출받은 은행을 선택해주세요');
		}
		return false;
	}

	const tid = window.localStorage.getItem(BANK_ID_KEY);

	bankAuth
		.bankVerify({
			key: tid,
			lastPhoneNum: form.value.phone,
			venderId: form.value.bank,
		})
		.then(() => {
			window.localStorage.setItem(BANK_AUTH_KEY, JSON.stringify(form.value));

			setTimeout(() => {
				redirect();
			}, 100);
		})
		.catch(e => {
			alert(e.response.data.message);
		});
};

const redirect = () => {
	const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);
	const redirectAuth = localStorage.getItem(LOGIN_REDIRECT_AUTH_KEY);

	if (redirectAuth === 'Y') {
		if (route.redirectedFrom.fullPath === undefined) {
			router.replace('/');
		} else {
			router.replace(route.redirectedFrom.fullPath);
		}
	} else {
		router.replace(redirectUrl || '/');
	}
};
</script>

<style lang="scss" scoped>
.certified-form {
	padding: 62px 30px;
}
.form-warning {
	text-align: center;
	color: #ff0c0c;
}
</style>
