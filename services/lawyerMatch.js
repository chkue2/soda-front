import { getEndpoint, API_URL, GET } from '~/composables/useApi.js';

export const lawyerMatch = {
	async getLawyerList(tid) {
		const endpoint = getEndpoint(API_URL.LAWYER.LIST, { trade_case_id: tid });
		return await GET(endpoint);
	},
};
