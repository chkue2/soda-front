import { useAuthStore } from '~/store/auth.js';
export default defineNuxtRouteMiddleware((to, from) => {
	const useAuth = useAuthStore();

	const isLoggedIn = useAuth.user !== null;

	if (!isLoggedIn) {
		return navigateTo('/login');
	}
});
