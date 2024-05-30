import {
	LOGIN_REDIRECT_AUTH_KEY,
	BANK_ID_KEY,
	BANK_AUTH_KEY,
} from '~/assets/js/storageKeys.js';

export default defineNuxtRouteMiddleware((to, from) => {
	window.localStorage.setItem(BANK_ID_KEY, to.params.id);

	const user = window.localStorage.getItem(BANK_AUTH_KEY);

	const isLoggedIn = user !== null && user !== undefined;

	if (!isLoggedIn) {
		window.localStorage.setItem(LOGIN_REDIRECT_AUTH_KEY, 'Y');
		return navigateTo('/certified');
	}
});