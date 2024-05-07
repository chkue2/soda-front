import { getEndpoint, API_URL, POST } from '~/composables/useApi.js';

export const lawyerContract = {
	async setLawyerContract(data) {
		return await POST(API_URL.LAWYER.CREATE, data);
	},
};
