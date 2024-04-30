import { defineStore } from 'pinia';
import { tokenApi, userSessionKey } from '~/utils/tokenApi';
export const useAuthStore = defineStore(
	'auth',
	{
		state: () => ({
			user: null,
		}),
		actions: {
			initialize() {
				this.user =
					(typeof window !== 'undefined' &&
						JSON.parse(localStorage.getItem(userSessionKey))) ||
					null;
			},
			login() {
				this.user = {
					id: 'test',
					profileImage: '/img/icon/profile-iu.png',
				};
				localStorage.setItem(userSessionKey, JSON.stringify(this.user));
			},
			logout() {
				this.user = null;
				localStorage.removeItem(userSessionKey);
			},
		},
	},
	{
		persist: true,
	},
);
