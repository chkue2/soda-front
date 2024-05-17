import { API_URL, POST, GET } from '~/composables/useApi.js';

export const signup = {
	async checkId(data) {
		return await GET(API_URL.USER.CHECK_ID, data);
	},
	async getNice(url) {
		return await GET(API_URL.NICE.CHECK_PHONE, { return_url: url });
	},
	async getNiceInfo(data) {
		return await POST(API_URL.NICE.DECRYPT, data);
	},
	async join(data) {
		return await POST(API_URL.USER.JOIN, data);
	},
	async joinSns(data) {
		return await POST(API_URL.USER.JOIN_SNS, data);
	},
};
