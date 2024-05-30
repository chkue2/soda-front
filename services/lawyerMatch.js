import { getEndpoint, API_URL, GET } from '~/composables/useApi.js';

export const lawyerMatch = {
	async getLawyerList(tid, type) {
		const endpoint = getEndpoint(
			type === 'soda' ? API_URL.LAWYER.LIST : API_URL.LAWYER.LIST_BANK,
			{ trade_case_id: tid },
		);
		return await GET(endpoint);
	},
	async selectLawyer(tid, firmCode, ins) {
		const endpoint = getEndpoint(
			ins === 'soda' ? API_URL.LAWYER.SELECT : API_URL.LAWYER.SELECT_BANK,
			{
				trade_case_id: tid,
				firm_code: firmCode,
			},
		);
		return await POST(endpoint);
	},
};
