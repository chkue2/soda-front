const devUrl = 'https://pro-api.dev-2.priros.com';
const operationUrl = 'https://pro-api.priros.com';

export const domain =
	location.href.includes('.local') || location.href.includes('dev.')
		? devUrl
		: operationUrl;
