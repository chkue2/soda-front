import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
	state: () => ({
		isLoading: false,
	}),
	actions: {
		setLoadingShow(val) {
			this.isLoading = val;
		},
	},
});
