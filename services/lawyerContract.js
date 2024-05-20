import { getEndpoint, API_URL, POST, PUT_AUTH } from '~/composables/useApi.js';

export const lawyerContract = {
	async setLawyerContract(data) {
		return await POST(API_URL.LAWYER.CREATE, data);
	},
	async getLawyerContract(data) {
		const endpoint = getEndpoint(API_URL.LAWYER.GET, { tmp_key: data.tmpKey });
		return await GET(endpoint, { mode: data.mode });
	},
	async updateLawyerContract(data) {
		const endpoint = getEndpoint(API_URL.LAWYER.UPDATE, {
			tmp_key: data.tmpKey,
		});
		return await PUT_AUTH(endpoint, data.formData);
	},
	async doneLawyerContract(data) {
		const endpoint = getEndpoint(API_URL.LAWYER.DONE, {
			tmp_key: data.tmpKey,
		});
		return await PUT_AUTH(endpoint, data.formData);
	},
};
