import {
	getEndpoint,
	API_URL,
	POST,
	PUT_AUTH,
	PUT,
} from '~/composables/useApi.js';

export const lawyerContract = {
	async setLawyerContract(data) {
		console.log(data);
		return await POST(API_URL.LAWYER.CREATE, data);
	},
	async setBankLawyerContract(tid) {
		const endpoint = getEndpoint(API_URL.LAWYER.CREATE_BANK, {
			trade_case_id: tid,
		});
		return await POST(endpoint);
	},
	async getLawyerContract(data, ins) {
		const endpoint = getEndpoint(
			ins === 'soda' ? API_URL.LAWYER.GET : API_URL.LAWYER.GET_BANK,
			{ tmp_key: data.tmpKey },
		);
		return await GET(endpoint, { mode: data.mode });
	},
	async updateLawyerContract(data) {
		const endpoint = getEndpoint(API_URL.LAWYER.UPDATE, {
			tmp_key: data.tmpKey,
		});
		return await PUT_AUTH(endpoint, data.formData);
	},
	async doneLawyerContract(data, ins) {
		const endpoint = getEndpoint(
			ins === 'soda' ? API_URL.LAWYER.DONE : API_URL.LAWYER.DONE_BANK,
			{
				tmp_key: data.tmpKey,
			},
		);
		if (ins === 'soda') {
			return await PUT_AUTH(endpoint, data.formData);
		} else {
			return await PUT(endpoint, data.formData);
		}
	},
};
