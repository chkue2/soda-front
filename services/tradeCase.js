import { API_URL, GET_AUTH, GET, getEndpoint } from '~/composables/useApi.js';

export const tradeCase = {
	async getTradeCaseList() {
		return await GET_AUTH(API_URL.TRADECASE.LIST);
	},
	async getTradeCaseDetail(tid, type) {
		const endpoint = getEndpoint(
			type === 'soda' ? API_URL.TRADECASE.GET : API_URL.TRADECASE.GET_BANK,
			{ trade_case_id: tid },
		);
		if (type === 'soda') {
			return await GET_AUTH(endpoint);
		} else {
			return await GET(endpoint);
		}
	},
	async getEstimate(tid) {
		const endpoint = getEndpoint(API_URL.TRADECASE.ESTIMATE, {
			trade_case_id: tid,
		});
		return await GET_AUTH(endpoint);
	},
	async getDocuments(tid) {
		const endpoint = getEndpoint(API_URL.TRADECASE.DOCUMENT, {
			trade_case_id: tid,
		});
		return await GET_AUTH(endpoint);
	},
};
