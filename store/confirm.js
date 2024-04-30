import { defineStore } from 'pinia';

export const useConfirmStore = defineStore('confirm', {
	state: () => ({
		isConfirmShow: false,
	}),
	actions: {
		setConfirmShow(val) {
			this.isConfirmShow = val;
		},
	},
});
