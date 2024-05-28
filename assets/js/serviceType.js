export const getServiceType = type => {
	switch (type) {
		case 'PREMIUM':
			return '프리미엄 견적으로 제안하기';
		case 'NORMAL':
			return '일반 견적으로 제안하기';
		case 'ROCKET':
			return '로켓진행 쏘다';
		default:
			return '내가 직접 가격 제안하기';
	}
};
