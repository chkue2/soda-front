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
		LOGIN_SNS: '/soda/:login_type/key/:user_key',
		LOGOUT: '/auth/logout',
		REFRESH: '/auth/refresh',
	},
	USER: {
		VERIFY: '/user/verify-password',
		INFO: '/user/info',
		FIND_ID: '/user/findId',
		FIND_PW: '/join-soda/changePassword',
		CHECK_ID: '/soda/check-id',
		JOIN: '/join-soda',
		JOIN_SNS: '/join-soda/sns',
		PROFILE: '/soda/user/profile-update',
	},
	NICE: {
		CHECK_PHONE: '/nice/check-phone',
		DECRYPT: '/nice/decrypt/soda',
	},
	GEO: {
		SIDO: '/geo/search/sido',
		GUGUN: '/geo/search/gugun',
		DETAIL: '/geo/search/detail',
	},
	LAWYER: {
		FIND: '/geo/firm/near/filter',
		DETAIL: '/soda/lawyer/detail/:firm_code',
		CREATE: '/soda/find-lawyer/contract',
		GET: '/soda/find-lawyer/contract/:tmp_key/',
		UPDATE: '/soda/find-lawyer/contract/:tmp_key',
	},
	CALCULATE: {
		GET: '/soda/calculate',
		TYPE: '/soda/calculate/servicetype/sodaContract/:tmp_key',
	},
	NOTICE: {
		LIST: '/notice/list',
	},
	NOTIFICATION: {
		LIST: '/notification/list',
		READ: '/notification/updateRead/:seq',
		READ_ALL: '/notification/updateReadAll',
	},
	LIKE: {
		COUNT: '/soda/firm-like/count',
		GET: '/soda/firm-like/get/:firm_code',
		SET: '/soda/firm-like/update/:firm_code',
		LIST: '/soda/firm-like/firm-list',
	},
};

export default API_URL;
