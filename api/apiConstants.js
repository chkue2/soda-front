/*
 * 기본 RULE
 * LIST      목록
 * GET       단일
 * UPDATE    수정
 * CREATE    등록
 * REMOVE    삭제
 *
 * */

const API_URL = {
	AUTH: {
		LOGIN: '/auth/login',
		LOGOUT: '/auth/logout',
		REFRESH: '/auth/refresh',
	},
	USER: {
		VERIFY: '/user/verify-password',
		INFO: '/user/info',
		FIND_ID: '/user/findId',
		FIND_PW: '/user/findPw',
	},
	GEO: {
		SIDO: '/geo/search/sido',
		GUGUN: '/geo/search/gugun',
		DETAIL: '/geo/search/detail',
	},
	LAWYER: {
		FIND: '/geo/firm/near/filter',
		DETAIL: '/soda/lawyer/detail/:firm_code',
	},
};

export default API_URL;
