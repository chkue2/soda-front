import { API_URL, POST } from '~/composables/useApi.js';

export const calculate = {
	async get(data) {
		return await POST(API_URL.CALCULATE.GET, data);
	},
};
