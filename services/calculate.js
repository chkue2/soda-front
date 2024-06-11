import { API_URL, POST, GET, GET_AUTH } from '~/composables/useApi.js';

export const calculate = {
	async get(data) {
		return await POST(API_URL.CALCULATE.GET, data);
	},
	async type(data, ins) {
		const endpoint = getEndpoint(
			ins === 'soda' ? API_URL.CALCULATE.TYPE : API_URL.CALCULATE.TYPE_BANK,
			{
				tmp_key: data.tmpKey,
			},
		);
		return await GET(endpoint);
	},
};
