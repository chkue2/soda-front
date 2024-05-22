import { API_URL, GET_AUTH, POST_AUTH } from '~/composables/useApi.js';

export const inquiry = {
	async getInquiry() {
		return await GET_AUTH(API_URL.USER.INQUIRY_LIST);
	},
	async setInquiry(formdata) {
		return await POST_AUTH(API_URL.USER.INQUIRY_INSERT, formdata);
	},
};
