import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';

export default defineNuxtPlugin(nuxtApp => {
	const router = nuxtApp.$router;

	router.beforeEach((to, from, next) => {
		const exceptionEnums = [
			'/login',
			'/signup',
			'/signup/success',
			'/nice/result',
		];
		if (!exceptionEnums.includes(from.path)) {
			localStorage.setItem(LOGIN_REDIRECT_KEY, from.path);
		}
		next();
	});
});
