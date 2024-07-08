import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';

export default defineNuxtPlugin(nuxtApp => {
	const router = nuxtApp.$router;

	nuxtApp.hook('app:navigation', info => {
		if (info.to.redirectedFrom) {
			nuxtApp.$router.push({
				...info.to,
				redirectedFrom: info.to.redirectedFrom,
			});
		}
	});

	router.beforeEach((to, from, next) => {
		const exceptionEnums = [
			'/login',
			'/signup',
			'/signup/success',
			'/nice/result',
			'/signup/nice-result',
			'/signup/sns',
			'/login/sns',
			'/user/find/id',
			'/user/find/password',
			'certified',
		];
		if (!exceptionEnums.includes(from.path)) {
			localStorage.setItem(LOGIN_REDIRECT_KEY, from.path);
		}
		next();
	});
});
