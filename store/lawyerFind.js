import { defineStore } from 'pinia';
import { lawyerFind } from '~/services/lawyerFind.js';

export const useLawyerFindStore = defineStore('lawyerFind', {
	state: () => ({
		expertList: [],
	}),
	actions: {
		fetchLawyerFind(param) {
			return lawyerFind
				.getLawyerList({
					sido: param.address.sido,
					gugun: param.address.gugun,
					locationCode: param.address.locationCode,
					badgeFilters: [...param.careers, ...param.badges],
					distanceLimit: param.distance,
					sortType:
						param.sort === 'default' ? 1 : param.sort === 'distance' ? 2 : 3,
					searchKeyword: param.keyword,
				})
				.then(({ data }) => {
					this.expertList = data;
				});
		},
		sortDefault() {
			function shuffleArray(array) {
				for (let i = array.length - 1; i > 0; i--) {
					// 0과 i 사이의 랜덤 인덱스를 선택한다
					const j = Math.floor(Math.random() * (i + 1));
					// array[i]와 array[j]를 교환한다 (ES6 구조 분해 할당을 사용)
					[array[i], array[j]] = [array[j], array[i]];
				}
				return array;
			}
			this.expertList = shuffleArray(this.expertList);
		},
		sortDistance() {
			this.expertList = this.expertList.sort(
				(a, b) => a.distance_km - b.distance_km,
			);
		},
		sortRate() {
			this.expertList = this.expertList.sort(
				(a, b) => b.firmAvgStar - a.firmAvgStar,
			);
		},
	},
});
