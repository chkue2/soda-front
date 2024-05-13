import { API_URL, POST, GET_AUTH } from '~/composables/useApi.js';

export const calculate = {
	async get(data) {
		return await POST(API_URL.CALCULATE.GET, data);
	},
	async type(data) {
		const endpoint = getEndpoint(API_URL.CALCULATE.TYPE, {
			tmp_key: data.tmpKey,
		});
		return await GET_AUTH(endpoint);
	},
};
