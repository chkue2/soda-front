import {
	API_URL,
	GET_AUTH,
	getEndpoint,
	POST_AUTH,
} from '~/composables/useApi.js';

export const firmLike = {
	async getCount() {
		return await GET_AUTH(API_URL.LIKE.COUNT);
	},
	async setLike(firmCode) {
		const endpoint = getEndpoint(API_URL.LIKE.SET, {
			firm_code: firmCode,
		});
		return await POST_AUTH(endpoint);
	},
	async getList() {
		return await GET_AUTH(API_URL.LIKE.LIST);
	},
};
