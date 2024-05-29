import { API_URL, POST } from '~/composables/useApi.js';

export const bankAuth = {
	async bankVerify(data) {
		return await POST(API_URL.BANK_AUTH.LOGIN, data);
	},
};
