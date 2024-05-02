<template>
	<HeaderClose title="회원가입" />
	<AgreeForm v-if="step === 1" @next-step="nextStep" />
	<InputForm v-if="step === 2" />
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import AgreeForm from '~/components/signup/AgreeForm.vue';
import InputForm from '~/components/signup/InputForm.vue';

const step = ref(1);

const nextStep = () => {
	step.value++;
};
</script>
