<template>
	<HeaderClose title="회원가입" />
	<AgreeForm v-if="signupStore.step === 1" />
	<InputFormSns v-if="signupStore.step === 2" />
</template>

<script setup>
import { onBeforeUnmount } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import AgreeForm from '~/components/signup/AgreeForm.vue';
import InputFormSns from '~/components/signup/InputFormSns.vue';

import { useSignupStore } from '~/store/signup.js';

const signupStore = useSignupStore();

onBeforeUnmount(() => {
	signupStore.resetStep();
});
</script>
