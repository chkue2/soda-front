import {
	API_URL,
	GET_AUTH,
	getEndpoint,
	POST_AUTH,
} from '~/composables/useApi.js';

export const notification = {
	async getNotification() {
		return await GET_AUTH(API_URL.NOTIFICATION.LIST);
	},
	async readNotification(seq) {
		const endpoint = getEndpoint(API_URL.NOTIFICATION.READ, { seq });
		return await POST_AUTH(endpoint);
	},
	async readAllNotification() {
		return await POST_AUTH(API_URL.NOTIFICATION.READ_ALL);
	},
};
