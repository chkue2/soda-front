import {
	API_URL,
	DELETE,
	DELETE_AUTH,
	GET,
	GET_AUTH,
	POST,
	POST_AUTH,
	PUT,
	PUT_AUTH,
	getEndpoint,
} from '~/composables/useApi.js';

export const user = {
	async vertifyPassword(data) {
		return await POST_AUTH(API_URL.USER.VERIFY, data);
	},
	async getUserInfo() {
		return await GET_AUTH(API_URL.USER.INFO);
	},
	async setUserInfo(data) {
		return await POST_AUTH(API_URL.USER.INFO, data);
	},
	async findId(data) {
		return await POST(API_URL.USER.FIND_ID, data);
	},
	async findPw(data) {
		return await POST(API_URL.USER.FIND_PW, data);
	},
	async setProfileImage(data) {
		return await PUT_AUTH(API_URL.USER.PROFILE, data);
	},
	async getReviewList() {
		return await GET_AUTH(API_URL.USER.REVIEW_LIST);
	},
	async getReviewCount() {
		return await GET_AUTH(API_URL.USER.REVIEW_COUNT);
	},
	async getReviewDetail(seq, ins) {
		const endpoint = getEndpoint(
			ins === 'soda'
				? API_URL.USER.REVIEW_DETAIL
				: API_URL.USER.REVIEW_DETAIL_BANK,
			{ seq },
		);
		if (ins === 'soda') {
			return await GET_AUTH(endpoint);
		} else {
			return await GET(endpoint);
		}
	},
	async insertReview(data, ins) {
		if (ins === 'soda') {
			return await POST_AUTH(API_URL.USER.REVIEW_INSERT, data);
		} else {
			return await POST(API_URL.USER.REVIEW_INSERT_BANK, data);
		}
	},
	async updateReview(data, ins) {
		const endpoint = getEndpoint(
			ins === 'soda'
				? API_URL.USER.REVIEW_UPDATE
				: API_URL.USER.REVIEW_UPDATE_BANK,
			{ seq: data.seq },
		);
		if (ins === 'soda') return await PUT_AUTH(endpoint, data.formData);
		else return await PUT(endpoint, data.formData);
	},
	async deleteReview(seq, ins) {
		const endpoint = getEndpoint(
			ins === 'soda'
				? API_URL.USER.REVIEW_DELETE
				: API_URL.USER.REVIEW_DELETE_BANK,
			{ seq },
		);
		if (ins === 'soda') return await DELETE_AUTH(endpoint);
		else return await DELETE(endpoint);
	},
	async getUserInfoUpdate() {
		return await GET_AUTH(API_URL.USER.GET_USER_INFO);
	},
	async setUserInfoUpdate(data) {
		return await PUT_AUTH(API_URL.USER.UPDATE_USER_INFO, data);
	},
	async getToast() {
		return await GET_AUTH(API_URL.USER.TOAST);
	},
};
