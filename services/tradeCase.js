import { API_URL, GET_AUTH, getEndpoint } from '~/composables/useApi.js';

export const tradeCase = {
	async getTradeCaseList() {
		return await GET_AUTH(API_URL.TRADECASE.LIST);
	},
	async getTradeCaseDetail(tid) {
		const endpoint = getEndpoint(API_URL.TRADECASE.GET, { trade_case_id: tid });
		return await GET_AUTH(endpoint);
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
