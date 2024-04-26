import { getEndpoint, API_URL, POST } from '~/composables/useApi.js';

export const lawyerFind = {
	async getLawyerList(data) {
		return await POST(API_URL.LAWYER.FIND, data);
	},
};
