<template>
	<div></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';
import { useAuthStore } from '~/store/auth.js';

const useAuth = useAuthStore();

const form = ref({
	loginType: '',
	userSnsKeyId: '',
});

const router = useRouter();

onMounted(async () => {
	const url = new URL(location.href);
	const params = new URLSearchParams(url.search);

	form.value.loginType = params.get('loginType');
	form.value.userSnsKeyId = params.get('userSnsKeyId');

	const isSuccess = await useAuth.loginSns(form.value);
	if (isSuccess) {
		await useAuth.userProfile();
		setTimeout(() => {
			redirect();
		}, 100);
	}
});

const redirect = () => {
	const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);

	router.replace(redirectUrl || '/');
};
</script>
