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
	BANK_AUTH: {
		LOGIN: '/soda/verify',
		ENCODING: '/util/soda/key/enc/:trade_case_id',
	},
	USER: {
		VERIFY: '/user/verify-password',
		INFO: '/user/info',
		FIND_ID: '/soda/findId',
		FIND_PW: '/join-soda/changePassword',
		CHECK_ID: '/soda/check-id',
		JOIN: '/join-soda',
		JOIN_SNS: '/join-soda/sns',
		PROFILE: '/soda/user/profile-update',
		REVIEW_INSERT: '/soda/user/review/insert',
		REVIEW_LIST: '/soda/user/review',
		REVIEW_COUNT: '/soda/user/review-count',
		REVIEW_DETAIL: '/soda/user/review/:seq',
		REVIEW_UPDATE: '/soda/user/review/update/:seq',
		REVIEW_DELETE: '/soda/user/review/delete/:seq',
		INQUIRY_LIST: '/soda/user/inquiry',
		INQUIRY_INSERT: '/soda/user/inquiry/insert',
		GET_USER_INFO: '/soda/user/info',
		UPDATE_USER_INFO: '/soda/user/info/update',
		TOAST: '/soda/find-lawyer/join/toast',
	},
	NICE: {
		CHECK_PHONE: '/nice/check-phone/v2',
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
		CREATE_BANK: '/bank/find-lawyer/contract/:trade_case_id',
		GET: '/soda/find-lawyer/contract/:tmp_key',
		GET_BANK: '/bank/find-lawyer/contract/:tmp_key',
		UPDATE: '/soda/find-lawyer/contract/:tmp_key',
		DONE: '/soda/find-lawyer/contract/done/:tmp_key',
		DONE_BANK: '/soda/find-lawyer/contract/done/:tmp_key',
		LIST: '/soda/find-lawyer/join/:trade_case_id/list',
		LIST_BANK: '/bank/find-lawyer/join/:trade_case_id/list',
		SELECT: '/soda/find-lawyer/pro-select/:trade_case_id/:firm_code',
		SELECT_BANK: '/bank/find-lawyer/pro-select/:trade_case_id/:firm_code',
		RE_FIND: '/:ins/find-lawyer/contract/retry/:trade_case_id',
	},
	CALCULATE: {
		GET: '/soda/calculate',
		TYPE: '/soda/calculate/servicetype/sodaContract/:tmp_key',
		TYPE_BANK: '/soda/calculate/servicetype/sodaContract/:tmp_key',
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
	TRADECASE: {
		LIST: '/soda/tradeCase/list',
		GET: '/soda/tradeCase/detail/:trade_case_id',
		ESTIMATE: '/tradecases/:trade_case_id/estimate',
		ESTIMATE_BANK: '/bank/tradecases/:trade_case_id/estimate',
		DOCUMENT: '/tradecases/:trade_case_id/document',
		DOCUMENT_DOWNLOAD:
			'/tradecases/:trade_case_id/document/:document_id/download',
		DOCUMENT_DOWNLOAD_BANK:
			'/bank/tradecases/:trade_case_id/document/:document_id/download',
		GET_BANK: '/bank/tradeCase/detail/:trade_case_id',
		INFO: '/soda/tradeCase/update/:trade_case_id',
		DELETE: '/soda/tradeCase/clase/:trade_case_id',
	},
};

export default API_URL;
