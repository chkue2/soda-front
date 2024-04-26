import { API_URL, GET, POST } from '~/composables/useApi.js';

export const location = {
	async getSido() {
		return await GET(API_URL.GEO.SIDO);
	},
	async getGugun(sido) {
		return await POST(API_URL.GEO.GUGUN, { sido });
	},
	async getDetail(sido, gugun) {
		return await POST(API_URL.GEO.DETAIL, { sido, gugun });
	},
};
