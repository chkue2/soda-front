import { API_URL, GET } from '~/composables/useApi.js';

export const notice = {
	async getNotice(pageNo) {
		return await GET(API_URL.NOTICE.LIST, { pageNo });
	},
};
