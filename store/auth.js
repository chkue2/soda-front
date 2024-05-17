import { defineStore } from 'pinia';
import { tokenApi, userSessionKey } from '~/utils/tokenApi';
import { API_URL, GET } from '~/composables/useApi.js';

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
			async login(credentials) {
				try {
					const response = await POST('/auth/login', credentials);
					if (response && response.data) {
						tokenApi.setToken(response.data.token, response.data.refreshToken);
						return true;
					}

					return false;
				} catch (e) {
					return false;
				}
			},
			async loginSns(form) {
				const endpoint = getEndpoint(API_URL.AUTH.LOGIN_SNS, {
					login_type: form.loginType,
					user_key: form.userSnsKeyId,
				});
				try {
					const response = await GET(endpoint);
					if (response && response.data) {
						tokenApi.setToken(response.data.token, response.data.refreshToken);
						return true;
					}

					return false;
				} catch (e) {
					return false;
				}
			},
			logout() {
				this.user = null;
				if (typeof window !== 'undefined') {
					tokenApi.clearAll();
				}
				return true;
			},
			userProfile() {
				try {
					GET_AUTH('/user/profile').then(response => {
						if (response && response.data) {
							this.user = {
								profile: {
									...response.data,
								},
							};
							if (typeof window !== 'undefined') {
								localStorage.setItem(userSessionKey, JSON.stringify(this.user));
							}
						}
					});
				} catch (e) {
					console.log(e);
					return false;
				}
			},
		},
	},
	{
		persist: true,
	},
);
