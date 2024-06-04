import {
	getEndpoint,
	API_URL,
	GET_AUTH,
	POST_AUTH,
	POST,
	PUT_AUTH,
	DELETE_AUTH,
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
	async getReviewDetail(seq) {
		const endpoint = getEndpoint(API_URL.USER.REVIEW_DETAIL, { seq });
		return await GET_AUTH(endpoint);
	},
	async insertReview(data) {
		return await POST_AUTH(API_URL.USER.REVIEW_INSERT, data);
	},
	async updateReview(data) {
		const endpoint = getEndpoint(API_URL.USER.REVIEW_UPDATE, { seq: data.seq });
		return await PUT_AUTH(endpoint, data.formData);
	},
	async deleteReview(seq) {
		const endpoint = getEndpoint(API_URL.USER.REVIEW_DELETE, { seq });
		return await DELETE_AUTH(endpoint);
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
