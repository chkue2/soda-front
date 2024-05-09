import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', {
	state: () => ({
		step: 1,
		agreeUse: false,
		agreePolicy: false,
		agreeAd: false,
	}),
	actions: {
		resetStep() {
			this.step = 1;
		},
		nextStep() {
			this.step++;
		},
		setAgree(data) {
			this.agreeUse = data.agreeUse;
			this.agreePolicy = data.agreePolicy;
			this.agreeAd = data.agreeAd;
		},
	},
});
