<template>
	<HeaderClose title="회원가입" />
	<AgreeForm v-if="signupStore.step === 1" />
	<InputFormSns v-if="signupStore.step === 2" :sns-form="snsForm" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import AgreeForm from '~/components/signup/AgreeForm.vue';
import InputFormSns from '~/components/signup/InputFormSns.vue';

import { useSignupStore } from '~/store/signup.js';

const signupStore = useSignupStore();

const snsForm = ref({
	loginType: '',
	userSnsKeyId: '',
});

onMounted(() => {
	const url = new URL(location.href);
	const params = new URLSearchParams(url.search);

	snsForm.value.loginType = params.get('loginType');
	snsForm.value.userSnsKeyId = params.get('userSnsKeyId');
});

onBeforeUnmount(() => {
	signupStore.resetStep();
});
</script>
