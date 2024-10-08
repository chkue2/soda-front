import {
	API_URL,
	POST,
	PUT,
	PUT_AUTH,
	getEndpoint,
} from '~/composables/useApi.js';

export const lawyerContract = {
	async setLawyerContract(data) {
		console.log(data);
		return await POST(API_URL.LAWYER.CREATE, data);
	},
	async getLawyerContractTmpKey(tid, cmd) {
		console.log('cmd', cmd);
		const endpoint = getEndpoint(API_URL.LAWYER.GET_TMP_KEY, {
			trade_case_id: tid,
		});
		return await POST(endpoint, {
			...(cmd && { cmd }),
		});
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
	async checkValid() {
		return await GET_AUTH(API_URL.LAWYER.CHECK_VALID);
	},
};
