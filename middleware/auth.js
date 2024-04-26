import { useAuthStore } from '~/store/auth.js';
export default defineNuxtRouteMiddleware((to, from) => {
	const useAuth = useAuthStore();
	useAuth.initialize();

	const isLoggedIn = useAuth.user !== null;

	if (!isLoggedIn) {
		return navigateTo('/login');
	}
});
