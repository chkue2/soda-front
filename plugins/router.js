import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';

export default defineNuxtPlugin(nuxtApp => {
	const router = nuxtApp.$router;

	router.beforeEach((to, from, next) => {
		const exceptionEnums = ['/login'];
		if (!exceptionEnums.includes(from.path)) {
			localStorage.setItem(LOGIN_REDIRECT_KEY, from.path);
		}
		next();
	});
});
