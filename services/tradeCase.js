import {
	API_URL,
	GET_AUTH,
	GET,
	GET_DOWNLOAD,
	GET_DOWNLOAD_AUTH,
	PUT_AUTH,
	getEndpoint,
} from '~/composables/useApi.js';

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
	async getEstimate(tid, ins) {
		const endpoint = getEndpoint(
			ins === 'soda'
				? API_URL.TRADECASE.ESTIMATE
				: API_URL.TRADECASE.ESTIMATE_BANK,
			{
				trade_case_id: tid,
			},
		);
		if (ins === 'soda') {
			return await GET_AUTH(endpoint);
		} else {
			return await GET(endpoint);
		}
	},
	async getDocuments(tid, ins) {
		const endpoint = getEndpoint(API_URL.TRADECASE.DOCUMENT, {
			trade_case_id: tid,
		});

		if (ins === 'soda') {
			return await GET_AUTH(endpoint);
		} else {
			return await GET(endpoint);
		}
	},
	async downloadDocument(tid, did, ins) {
		const endpoint = getEndpoint(
			ins === 'soda'
				? API_URL.TRADECASE.DOCUMENT_DOWNLOAD
				: API_URL.TRADECASE.DOCUMENT_DOWNLOAD_BANK,
			{
				trade_case_id: tid,
				document_id: did,
			},
		);

		if (ins === 'soda') {
			return await GET_DOWNLOAD_AUTH(endpoint);
		} else {
			return await GET_DOWNLOAD(endpoint);
		}
	},
	async getInfo(tid) {
		const endpoint = getEndpoint(API_URL.TRADECASE.INFO, {
			trade_case_id: tid,
		});
		return await GET_AUTH(endpoint);
	},
	async updateInfo(tid, formData) {
		const endpoint = getEndpoint(API_URL.TRADECASE.INFO, {
			trade_case_id: tid,
		});
		return await PUT_AUTH(endpoint, formData);
	},
};
