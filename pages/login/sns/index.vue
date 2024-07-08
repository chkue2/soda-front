<template>
	<div></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
	LOGIN_REDIRECT_AUTH_KEY,
	LOGIN_REDIRECT_KEY,
} from '~/assets/js/storageKeys.js';
import { useAuthStore } from '~/store/auth.js';

const useAuth = useAuthStore();

const form = ref({
	loginType: '',
	userSnsKeyId: '',
});

const router = useRouter();
const route = useRoute();
onMounted(async () => {
	const url = new URL(location.href);
	const params = new URLSearchParams(url.search);

	form.value.loginType = params.get('loginType');
	form.value.userSnsKeyId = params.get('userSnsKeyId');

	const isSuccess = await useAuth.loginSns(form.value);
	if (isSuccess) {
		await useAuth.userProfile();
		redirect();
	}
});

const redirect = () => {
	const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);
	const redirectAuth = localStorage.getItem(LOGIN_REDIRECT_AUTH_KEY);

	if (redirectAuth === 'Y') {
		console.log(route.redirectedFrom);
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
