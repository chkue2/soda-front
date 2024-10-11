import { defineStore } from 'pinia';
import { API_URL, GET } from '~/composables/useApi.js';
import { tokenApi, userSessionKey } from '~/utils/tokenApi';
import { useEncrypted, useDecrypted } from '~/composables/useAes256';

const $runtimeConfig = useRuntimeConfig();

export const useAuthStore = defineStore(
	'auth',
	{
		state: () => ({
			user: null,
			secretKey: $runtimeConfig.public.aesSecretKey,
		}),
		actions: {
			initialize() {
				this.user = useDecrypted(this.secretKey, userSessionKey) || null;
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
								window.localStorage.removeItem('auth-user');
								useEncrypted(this.secretKey, userSessionKey, this.user);
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
