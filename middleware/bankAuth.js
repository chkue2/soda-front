import { useAuthStore } from '~/store/auth.js';
import { LOGIN_REDIRECT_AUTH_KEY } from '~/assets/js/storageKeys.js';

export default defineNuxtRouteMiddleware((to, from) => {
	const useAuth = useAuthStore();
	useAuth.initialize();

	const isLoggedIn = useAuth.user !== null;

	if (!isLoggedIn) {
		window.localStorage.setItem(LOGIN_REDIRECT_AUTH_KEY, 'Y');
		return navigateTo('/certified');
	}
});
