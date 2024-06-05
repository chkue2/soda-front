export const getServiceType = type => {
	switch (type) {
		case 'PREMIUM':
			return '프리미엄 견적으로 제안하기';
		case 'NORMAL':
			return '일반 견적으로 제안하기';
		case 'ROCKET':
			return 'SODA 패스';
		case 'CARD':
			return '등기프로 찾기';
		default:
			return '내가 직접 가격 제안하기';
	}
};
