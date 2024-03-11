<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<div class="location-container">
				<button class="location-button" @click="toggleLocationSettingModal">
					<img src="/img/icon/pointer-blue.svg" />
					<span>내 위치설정</span>
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
				<button class="sort-button">
					<img src="/img/icon/sort-black.svg" />
					<span>기본순</span>
				</button>
				<button class="filter-button" @click="toggleFindFilterModal">
					<img src="/img/icon/filter-black.svg" />
				</button>
			</div>
			<ExpertList :margin="[0, 9, 24, 9]" />
			<LocationSettingModal
				v-if="isLocationSettingModalShow"
				@close-modal="toggleLocationSettingModal"
			/>
			<FindFilterModal
				v-if="isFindFilterModalShow"
				@close-modal="toggleFindFilterModal"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { ref } from 'vue';
import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import LocationSettingModal from '~/components/modal/LocationSettingModal.vue';
import FindFilterModal from '~/components/modal/FindFilterModal.vue';

definePageMeta({
	middleware: 'auth',
	layout: false,
});

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
	top: 58px;
	background-color: #ffffff;
}
.sort-button {
	width: 110px;
	height: 37px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 20px;
	border: 1px solid #e9eff2;
	cursor: pointer;
	& > span {
		font-size: 14px;
	}
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
