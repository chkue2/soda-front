import { defineStore } from 'pinia';
import { location } from '~/services/location.js';

export const useLocationStore = defineStore('location', {
	state: () => ({
		sidoEnums: [],
		gugunEnums: [],
		detailEnums: [],
		locationCode: '',
	}),
	actions: {
		getSido() {
			location.getSido().then(({ data }) => {
				this.sidoEnums = data;
			});
		},
		getGugun(sido) {
			location.getGugun(sido).then(({ data }) => {
				this.gugunEnums = data;
			});
		},
		getDetail(sido, gugun) {
			location.getDetail(sido, gugun).then(({ data }) => {
				this.detailEnums = data;
			});
		},
		setLocationCode(code) {
			this.locationCode = code;
		},
	},
});
