import { BANK_AUTH_KEY } from '~/assets/js/storageKeys.js';

const pageLeave = e => {
	e.preventDefault();
	window.localStorage.removeItem(BANK_AUTH_KEY);
};

export { pageLeave };
