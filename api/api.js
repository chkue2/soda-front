import axios from 'axios';
import API_URL from './apiConstants';
import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';

const ERROR_CODES = {
	A011: 'A011',
	A009: 'A009',
	A010: 'A010',
	A008: 'A008',
};

const getEndpoint = (url, params) => {
	let endpoint = url;

	for (const key in params) {
		endpoint = endpoint.replace(`:${key}`, params[key]);
	}

	return endpoint;
};

const defineApi = config => {
	const { host, tokenApi } = config;
	axios.defaults.baseURL = host;

	const api = axios.create();
	const apiAuth = axios.create();

	async function requestRefreshTokenUpdate() {
		const refreshToken = tokenApi.getRefreshToken();
		if (refreshToken) {
			try {
				const response = await api.post(API_URL.AUTH.REFRESH, {
					refreshToken: refreshToken,
				});
				if (response && response.data) {
					tokenApi.setToken(response.data.token, response.data.refreshToken);
					return true;
				}
			} catch (e) {
				if (
					e.response &&
					(e.response.data.errorCode === ERROR_CODES.A011 ||
						e.response.data.errorCode === ERROR_CODES.A009 ||
						e.response.data.errorCode === ERROR_CODES.A008)
				) {
					tokenApi.clearAll();
					alert('로그아웃되었습니다. 다시 로그인해주세요.');
					const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);
					location.href = redirectUrl || '/';
				}
			}
		} else {
			alert('인증 토큰이 없습니다. 다시 로그인해주세요.');
			const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);
			location.href = redirectUrl || '/';
		}
		return false;
	}

	apiAuth.interceptors.request.use(
		async config => {
			const token = tokenApi.getAccessToken();
			config.headers.Authorization = `Bearer ${token}`;
			return config;
		},
		error => {
			return Promise.reject(error);
		},
	);

	apiAuth.interceptors.response.use(
		response => {
			return response;
		},
		async error => {
			const response = error.response;
			if (response) {
				const request = error.config;
				if (response.status === 401 && !request._retry) {
					if (response.data.errorCode === ERROR_CODES.A010) {
						const isOk = await requestRefreshTokenUpdate();
						if (isOk) {
							request._retry = true; // boolean으로 변경
							return apiAuth(request); // await 추가
						}
					}
				}
			}
			return Promise.reject(error);
		},
	);

	return { api, apiAuth };
};

export { API_URL, defineApi, getEndpoint };
