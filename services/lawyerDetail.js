import { getEndpoint, API_URL, GET } from '~/composables/useApi.js';

export const lawyerDetail = {
	async getLawyerDetail(firmCode) {
		const endpoint = getEndpoint(API_URL.LAWYER.DETAIL, {
			firm_code: firmCode,
		});
		return await GET(endpoint);
	},
};
