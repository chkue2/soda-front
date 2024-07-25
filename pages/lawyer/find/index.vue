<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<div class="location-container">
				<button class="location-button" @click="toggleLocationSettingModal">
					<img src="/img/icon/pointer-blue.svg" alt="주소" />
					<span>{{ addressText }}</span>
				</button>
			</div>
			<div class="find-title">
				<p>등기프로 찾기</p>
			</div>
			<div class="find-filters">
				<div class="sort-button" @click="toggleSortModal">
					<img src="/img/icon/sort-black.svg" alt="정렬" />
					<span>{{ sortText }}</span>
				</div>
				<select
					v-if="false"
					v-model="sort"
					class="sort-button"
					@change="handlerChangeSort"
				>
					<option value="default">기본순</option>
					<option value="distance">거리순</option>
					<option value="review">리뷰많은</option>
					<option value="rate">평점순</option>
				</select>
				<button class="filter-button" @click="toggleFindFilterModal">
					<img :src="filterPath" alt="필터" />
				</button>
				<div class="filter-keyword">
					<input
						v-model="keyword"
						type="text"
						placeholder="2자이상 상호명 검색"
						@keyup.enter="handlerEnterKeyword"
					/>
					<img
						src="/img/icon/search-gray.svg"
						alt="키워드 검색"
						@click="handlerEnterKeyword"
					/>
				</div>
			</div>
			<ListEmptyItem
				v-if="lawyerFindStore.expertList.length === 0"
				:margin="[62, 0, 0, 0]"
				title="앗! 검색결과가 없어요"
				sub-title="검색한 결과가 0건입니다.<br>위치를 재설정하여 다시 검색해보세요!"
			/>
			<ExpertList
				v-if="lawyerFindStore.expertList.length > 0"
				:margin="[0, 9, 24, 9]"
				:list="lawyerFindStore.expertList"
			/>
			<LocationSettingModal
				v-if="isLocationSettingModalShow"
				:address="address"
				@set-address="setAddress"
				@close-modal="toggleLocationSettingModal"
				@call-api="callApi"
			/>
			<FindFilterModal
				v-if="isFindFilterModalShow"
				:careers="careers"
				:badges="badges"
				:distance="distance"
				:address="address"
				@set-careers="setCareers"
				@set-badges="setBadges"
				@set-address="setAddress"
				@set-distance="setDistance"
				@call-api="callApi"
				@close-modal="toggleFindFilterModal"
			/>
			<FindSortModal
				v-if="isSortModalShow"
				:sort="sort"
				@set-sort="setSort"
				@close-modal="toggleSortModal"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import FindFilterModal from '~/components/modal/FindFilterModal.vue';
import FindSortModal from '~/components/modal/FindSortModal.vue';
import LocationSettingModal from '~/components/modal/LocationSettingModal.vue';

import { useLawyerFindStore } from '~/store/lawyerFind.js';
import { useLoadingStore } from '~/store/loading.js';
import { useLocationStore } from '~/store/location.js';
import { useAlertStore } from '~/store/alert.js';

const locationStore = useLocationStore();
const lawyerFindStore = useLawyerFindStore();

import {
	FILTER_BADGES_KEY,
	FILTER_CAREERS_KEY,
	FILTER_DISTANCE_KEY,
	FILTER_KEYWORD_KEY,
	FILTER_SORT_KEY,
	LOCATION_KEY,
} from '~/assets/js/storageKeys.js';

definePageMeta({
	layout: false,
});

const alertStore = useAlertStore();

const careers = ref([]);
const badges = ref([]);
const distance = ref(15);
const sort = ref('default');
const keyword = ref('');

const setCareers = val => {
	careers.value = val;
	window.localStorage.setItem(
		FILTER_CAREERS_KEY,
		JSON.stringify(careers.value),
	);
};
const setBadges = val => {
	badges.value = val;
	window.localStorage.setItem(FILTER_BADGES_KEY, JSON.stringify(badges.value));
};
const setDistance = val => {
	distance.value = val;
	window.localStorage.setItem(FILTER_DISTANCE_KEY, distance.value);
};

const setSort = val => {
	sort.value = val;
	if (sort.value === 'distance') {
		if (address.value.sido === '') {
			toggleLocationSettingModal();
		}
	}
	window.localStorage.setItem(FILTER_SORT_KEY, JSON.stringify(sort.value));
	callApi();
};

const handlerEnterKeyword = () => {
	if (keyword.value.length === 1) {
		alertStore.open('두 글자 이상 검색해 주세요');
		return false;
	}
	window.localStorage.setItem(FILTER_KEYWORD_KEY, keyword.value);
	callApi();
};

const address = ref({
	sido: '',
	gugun: '',
	dong: '',
	locationCode: '',
});

onMounted(() => {
	const storageAddress = window.localStorage.getItem(LOCATION_KEY);
	const storageCareers = window.localStorage.getItem(FILTER_CAREERS_KEY);
	const storageBadges = window.localStorage.getItem(FILTER_BADGES_KEY);
	const storageDistance = window.localStorage.getItem(FILTER_DISTANCE_KEY);
	const storageSort = window.localStorage.getItem(FILTER_SORT_KEY);
	const storageKeyword = window.localStorage.getItem(FILTER_KEYWORD_KEY);

	if (storageAddress) {
		address.value = JSON.parse(storageAddress);
	}
	if (storageCareers) {
		careers.value = JSON.parse(storageCareers);
	}
	if (storageBadges) {
		badges.value = JSON.parse(storageBadges);
	}
	if (storageDistance) {
		distance.value = Number(storageDistance);
	}
	if (storageSort) {
		sort.value = JSON.parse(storageSort);
	}
	if (storageKeyword) {
		keyword.value = storageKeyword;
	}

	if (lawyerFindStore.expertList.length === 0) {
		callApi();
	}
});

const loadingStore = useLoadingStore();

const callApi = () => {
	loadingStore.setLoadingShow(true);
	lawyerFindStore
		.fetchLawyerFind({
			address: address.value,
			careers: careers.value,
			badges: badges.value,
			sort: sort.value,
			distance: distance.value,
			keyword: keyword.value,
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const setAddress = val => {
	address.value = val;
	window.localStorage.setItem(LOCATION_KEY, JSON.stringify(address.value));
	if (val.sido === '') locationStore.sidoEnums = [];
	if (val.gugun === '') locationStore.gugunEnums = [];
	if (val.dong === '') locationStore.detailEnums = [];
};

const addressText = computed(() =>
	address.value.sido === ''
		? '위치를 설정해주세요'
		: `${address.value.sido} ${address.value.gugun}`,
);

const isLocationSettingModalShow = ref(false);
const toggleLocationSettingModal = () => {
	isLocationSettingModalShow.value = !isLocationSettingModalShow.value;
};
const isFindFilterModalShow = ref(false);
const toggleFindFilterModal = () => {
	isFindFilterModalShow.value = !isFindFilterModalShow.value;
};

const isSortModalShow = ref(false);
const toggleSortModal = () => {
	isSortModalShow.value = !isSortModalShow.value;
};

const isFilterEmpty = computed(() => {
	return (
		careers.value.length === 0 &&
		badges.value.length === 0 &&
		distance.value === 15 &&
		address.value.sido === '' &&
		address.value.gugun === '' &&
		address.value.dong === ''
	);
});

const filterPath = computed(() =>
	isFilterEmpty.value
		? '/img/icon/filter-black.svg'
		: '/img/icon/filter-blue.svg',
);

const sortText = computed(() => {
	switch (sort.value) {
		case 'distance':
			return '거리순';
		case 'review':
			return '리뷰많은';
		case 'rate':
			return '평점순';
		default:
			return '기본순';
	}
});
</script>

<style lang="scss" scoped>
.location-container {
	padding: 11px 0;
	display: flex;
	justify-content: center;
}
.location-button {
	padding: 6px 8px;
	border-radius: 16px;
	background-color: #f5f5f5;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3px;
	font-size: 14px;
	color: #616161;
	cursor: pointer;
}
.find-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 17px 22px 12px;
	& > p {
		font-weight: $ft-bold;
		color: #252525;
	}
	& > button {
		display: flex;
		align-items: center;
		gap: 2px;
		font-size: 14px;
		color: #8f8f8f;
		text-decoration: underline;
		cursor: pointer;
	}
}
.find-filters {
	padding: 10px 9px;
	display: flex;
	align-items: center;
	gap: 7px;
	position: sticky;
	z-index: $zi-sticky;
	top: 62px;
	background-color: #ffffff;
}
.sort-button {
	width: 100px;
	height: 37px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	border-radius: 20px;
	border: 1px solid #e9eff2;
	font-size: 14px;
	text-align: center;
	color: #000000;
	background-color: #ffffff;
	cursor: pointer;
}
.filter-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 37px;
	height: 37px;
	border-radius: 50%;
	border: 1px solid #e9eff2;
	cursor: pointer;
}
.filter-keyword {
	flex: 1;
	height: 37px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 15px;
	border: 1px solid #e9eff2;
	border-radius: 60px;
	padding: 0 15px;
	& > input {
		width: 130px;
		border: none;
		font-size: 14px;
	}
}

@media not all and (min-resolution: 0.001dpcm) {
	@supports (-webkit-appearance: none) {
		.sort-button {
			padding-left: 42px;
		}
	}
}
</style>
