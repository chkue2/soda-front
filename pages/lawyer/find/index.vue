<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<div class="location-container">
				<button class="location-button" @click="toggleLocationSettingModal">
					<img src="/img/icon/pointer-blue.svg" />
					<span>{{ addressText }}</span>
				</button>
			</div>
			<div class="find-title">
				<p>법무사 찾기</p>
				<button @click="toggleLocationSettingModal">
					<span>위치를 설정해야하는 이유</span>
					<img src="/img/icon/help-circle-gray.svg" />
				</button>
			</div>
			<div class="find-filters">
				<select v-model="sort" class="sort-button" @change="handlerChangeSort">
					<option value="default">기본순</option>
					<option value="distance">거리순</option>
					<option value="review">리뷰순</option>
				</select>
				<button class="filter-button" @click="toggleFindFilterModal">
					<img src="/img/icon/filter-black.svg" />
				</button>
			</div>
			<ListEmptyItem
				v-if="expertList.length === 0"
				title="등기프로를 찾을 수 없습니다."
				sub-title="조건에 만족하는 등기프로를 찾을 수 없습니다.<br>조건을 변경해보세요!"
			/>
			<ExpertList
				v-if="expertList.length > 0"
				:margin="[0, 9, 24, 9]"
				:list="expertList"
			/>
			<LocationSettingModal
				v-if="isLocationSettingModalShow"
				:address="address"
				@set-address="setAddress"
				@close-modal="toggleLocationSettingModal"
			/>
			<FindFilterModal
				v-if="isFindFilterModalShow"
				:careers="careers"
				:badges="badges"
				:address="address"
				@set-careers="setCareers"
				@set-badges="setBadges"
				@set-address="setAddress"
				@close-modal="toggleFindFilterModal"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import LocationSettingModal from '~/components/modal/LocationSettingModal.vue';
import FindFilterModal from '~/components/modal/FindFilterModal.vue';

import { useLoadingStore } from '~/store/loading.js';
import { useLocationStore } from '~/store/location.js';
import { lawyerFind } from '~/services/lawyerFind.js';

const locationStore = useLocationStore();

import {
	LOCATION_KEY,
	FILTER_CAREERS_KEY,
	FILTER_BADGES_KEY,
	FILTER_SORT_KEY,
} from '~/assets/js/storageKeys.js';

definePageMeta({
	layout: false,
});

const careers = ref([]);
const badges = ref([]);
const sort = ref('distance');

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
const handlerChangeSort = e => {
	if (e.target.value === 'distance') {
		if (address.value.sido === '') {
			toggleLocationSettingModal();
		}
	}
	window.localStorage.setItem(FILTER_SORT_KEY, JSON.stringify(sort.value));
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
	const storageSort = window.localStorage.getItem(FILTER_SORT_KEY);
	if (storageAddress) {
		address.value = JSON.parse(storageAddress);
	}
	if (storageCareers) {
		careers.value = JSON.parse(storageCareers);
	}
	if (storageBadges) {
		badges.value = JSON.parse(storageBadges);
	}
	if (storageSort) {
		sort.value = JSON.parse(storageSort);
	}
});

watch([careers, badges, address], () => {
	callApi();
});

const expertList = ref([]);
const loadingStore = useLoadingStore();

const callApi = () => {
	loadingStore.setLoadingShow(true);
	lawyerFind
		.getLawyerList({
			sido: address.value.sido,
			gugun: address.value.gugun,
			locationCode: address.value.locationCode,
			badgeFilters: [...careers.value, ...badges.value],
		})
		.then(({ data }) => {
			expertList.value = data;
		})
		.catch(e => {
			alert(e.response.data.message);
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
		? '내 위치설정'
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
	top: 45px;
	background-color: #ffffff;
}
.sort-button {
	width: 110px;
	height: 37px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 20px;
	border: 1px solid #e9eff2;
	font-size: 14px;
	text-align: center;
	background-image: url('/img/icon/sort-black.svg');
	background-position-x: 18px;
	padding-left: 12px;
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
</style>
