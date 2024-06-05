<template>
	<HeaderClose title="내 계약 관리" />
	<div v-if="false" class="contract-manage-tabs">
		<div class="contract-manage-tab active">전체</div>
		<div class="contract-manage-tab">진행중</div>
		<div class="contract-manage-tab">완료</div>
	</div>
	<p class="contract-manage-title">내 계약 ({{ tradeCaseList.length }}건)</p>
	<button v-if="false" class="contract-add-button">
		<span>간단한 정보입력으로 쉽고 빠르게</span>
		<p>
			<img src="/img/icon/add-square-black.svg" />
			<strong>내 사건 불러오기</strong>
		</p>
	</button>
	<div v-if="tradeCaseList.length === 0" class="contract-empty">
		<p class="contract-empty-title">등록된 계약이 아직 없습니다.</p>
		<img src="/img/cow/contract-empty.png" />
	</div>
	<div v-if="tradeCaseList.length > 0" class="contract-manage-swiper">
		<swiper
			:space-between="20"
			slides-per-view="auto"
			:modules="modules"
			:pagination="{ clickable: true }"
		>
			<swiper-slide v-for="(t, index) in tradeCaseList" :key="index">
				<div
					class="contract-manage-item"
					@click="handlerClickMoveToDetailButton(t.showDetail, t.tradeCaseId)"
				>
					<div class="contract-manage-image">
						<img v-if="t.showDetail" src="/img/cow/card-01.gif" />
						<img v-if="!t.showDetail" src="/img/cow/card-02.gif" />
					</div>
					<div class="contract-manage-top">
						<div class="contract-manage-top-flex">
							<div class="contract-manage-top-left">
								<p class="contract-name">{{ t.buyer }}</p>
								<p class="contract-date">잔금일 {{ t.issueDate }}</p>
							</div>
							<div v-if="!t.showDetail" class="contract-manage-top-right">
								<span class="contract-wait-box">수임대기중</span>
							</div>
							<div v-if="t.showDetail" class="contract-manage-top-right">
								<div class="contract-calendar">
									<div class="contract-calendar-month">
										{{ month(t.issueDate) }}월
									</div>
									<div class="contract-calendar-day">
										{{ day(t.issueDate) }}일
									</div>
								</div>
							</div>
						</div>
						<p class="contract-address">
							{{ t.address }}
						</p>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
	<BottomToast
		v-if="tradeCaseList.length === 0"
		:bottom="64"
		title="원클릭으로 쉬운 내 계약관리"
		content="간단한 정보입력으로 계약등록"
		button-text="등록하기"
		background-color="#fcfcfc"
		title-color="#3B3C3D"
		content-color="#737373"
		button-color="#29CDFF"
		button-text-color="#ffffff"
		:is-disable="false"
		@click-button="moveToFindForm"
	/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import dayjs from 'dayjs';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import BottomToast from '~/components/toast/BottomToast.vue';

import { tradeCase } from '~/services/tradeCase.js';
import { useLoadingStore } from '~/store/loading.js';

definePageMeta({
	middleware: 'auth',
});

const modules = [Pagination];

const router = useRouter();

const loadingStore = useLoadingStore();
const tradeCaseList = ref([]);

onMounted(() => {
	loadingStore.setLoadingShow(true);
	tradeCase
		.getTradeCaseList()
		.then(({ data }) => {
			tradeCaseList.value = data;
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
});

const handlerClickMoveToDetailButton = (isShowDetail, tid) => {
	if (!isShowDetail) return false;

	router.push(`/user/contract-manage/detail/soda/${tid}`);
};

const month = date => dayjs(date).format('M');
const day = date => dayjs(date).format('D');

const moveToFindForm = () => {
	router.push('/lawyer/find/form');
};
</script>

<style lang="scss" scoped>
.contract-manage-tabs {
	display: flex;
	align-items: center;
	padding: 10px 16px 0;
}
.contract-manage-tab {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: 15px 0;
	border: 2px solid #f5f6f7;
	font-size: 12px;
	font-weight: $ft-bold;
	color: #c5c6cc;
	cursor: pointer;
	& + .contract-manage-tab {
		border-left: none;
	}
	&:nth-of-type(1) {
		border-radius: 30px 0 0 30px;
	}
	&:nth-of-type(3) {
		border-radius: 0 30px 30px 0;
	}
	&.active {
		color: #000000;
	}
}
.contract-manage-title {
	padding: 15px 20px;
	font-size: 14px;
	font-weight: $ft-medium;
	color: #252525;
}
.contract-add-button {
	width: calc(100% - 24px);
	margin: 0 12px;
	border: 1px dotted #adadad;
	padding: 16px 0;
	border-radius: 6px;
	& > span {
		font-size: 12px;
		color: #252525;
	}
	& > p {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		& > strong {
			font-weight: $ft-bold;
			color: #252525;
		}
	}
}
.contract-manage-swiper {
	padding: 0 20px 20px;
	position: relative;
}
.swiper-slide {
	padding: 4px;
}
.contract-manage-item {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 6px;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
	cursor: pointer;
}
.contract-manage-image {
	display: flex;
	justify-content: center;
	padding: 0 22px;
	& > img {
		width: 277px;
		height: 277px;
	}
}
.contract-manage-top {
	padding: 9px 16px 19px;
}
.contract-manage-top-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.contract-manage-top-left {
	display: flex;
	flex-direction: column;
}
.contract-wait-box {
	border-radius: 6px;
	border: 1px solid #3182f7;
	padding: 3px 6px;
	font-size: 12px;
	font-weight: $ft-bold;
	color: #3182f7;
}
.contract-calendar {
	display: flex;
	flex-direction: column;
	width: 65px;
	border-radius: 9px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
	margin-bottom: 12px;
}
.contract-calendar-month {
	border-radius: 9px 9px 0 0;
	background-color: #ed3241;
	color: #ffffff;
	text-align: center;
	padding: 3px 0;
	font-size: 14px;
	font-weight: $ft-bold;
}
.contract-calendar-day {
	border-radius: 0 0 9px 9px;
	padding: 5px 10px;
	background-color: #ffffff;
	font-size: 20px;
	font-weight: $ft-bold;
	text-align: center;
}
.contract-name {
	font-size: 20px;
	font-weight: $ft-bold;
}
.contract-date {
	margin: 6px 0 14px;
	background-color: #f8f8f8;
	border-radius: 6px;
	padding: 3px 6px;
	font-size: 14px;
	font-weight: $ft-medium;
	color: #8b8b8b;
	display: inline-block;
}
.contract-address {
	font-size: 14px;
	word-break: keep-all;
}
.contract-bank {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 24px;
	& > img {
		width: 21px;
		height: 21px;
	}
	& > span {
		color: #252525;
	}
}
.contract-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 28px 0 70px;
	& > img {
		width: 208px;
		height: auto;
	}
}
.contract-empty-title {
	color: #b9babe;
	margin-bottom: 62px;
}

/* swiper */
.swiper {
	position: unset;
	&::v-deep(.swiper-pagination) {
		bottom: -10px;
	}
	&::v-deep(.swiper-pagination-bullet) {
		background-color: #d9d9d9;
		opacity: 1;
	}
	&::v-deep(.swiper-pagination-bullet-active) {
		background-color: #252525;
	}
}
</style>
