import { BANK_AUTH_KEY } from '~/assets/js/storageKeys.js';

const pageLeave = () => {
	if (document.visibilityState === 'hidden') {
		window.localStorage.removeItem(BANK_AUTH_KEY);
	}
};

export { pageLeave };
