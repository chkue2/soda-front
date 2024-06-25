import { API_URL, GET, GET_AUTH, getEndpoint } from '~/composables/useApi.js';

export const lawyerMatch = {
	async getLawyerList(tid, ins) {
		const endpoint = getEndpoint(
			ins === 'soda' ? API_URL.LAWYER.LIST : API_URL.LAWYER.LIST_BANK,
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
	async retryLawyerFind(tid, ins) {
		const endpoint = getEndpoint(API_URL.LAWYER.RE_FIND, {
			ins,
			trade_case_id: tid,
		});
		return await GET(endpoint);
	},
	async retryLawyerFindCheck(tid, ins) {
		const endpoint = getEndpoint(API_URL.LAWYER.RE_FIND_CHECK, {
			ins,
			trade_case_id: tid,
		});
		if (ins === 'soda') {
			return await GET_AUTH(endpoint);
		} else {
			return await GET(endpoint);
		}
	},
};
