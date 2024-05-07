<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<TopBanner />
			<QuickMenus />
			<BankBanner />
			<div class="index-title-container">
				<p class="index-title">내 주변 법무사 찾기!</p>
				<div class="index-subtitle">
					<p>위치설정하고 주변 법무사 찾아보기</p>
					<NuxtLink to="/lawyer/find" class="more-text">
						<span>더보기</span><img src="/img/icon/expand-right-black.svg" />
					</NuxtLink>
				</div>
			</div>
			<ExpertList :margin="[23, 17, 37, 17]" :list="expertList" />
			<div class="index-title-container">
				<p class="index-title">등기소다는 이렇게 진행해요</p>
				<div class="index-subtitle">
					<p>안전하고 전문적인 법무사를 찾는다면 등기소다!</p>
				</div>
			</div>
			<ProcessBanner />
			<LawandtechIntro />
			<BottomToast
				v-if="false"
				:bottom="64"
				title="프로필카드 받는 중"
				content="빠른 매칭을 위해 준비중이예요!"
				button-text="보기"
			/>
			<BottomToast
				v-if="true"
				:bottom="64"
				background-color="#29cdff"
				emoji="smiling-face-with-hearts.gif"
				title="프로필카드 받기 완료"
				content="매칭된 등기프로를 확인해보세요!"
				button-text="보기"
				:is-disable="false"
				@click-button="handlerClickToastButton"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import TopBanner from '~/components/main/TopBanner.vue';
import QuickMenus from '~/components/main/QuickMenus.vue';
import BankBanner from '~/components/main/BankBanner.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import ProcessBanner from '~/components/main/ProcessBanner.vue';
import LawandtechIntro from '~/components/main/LawandtechIntro.vue';
import BottomToast from '~/components/toast/BottomToast.vue';

import { useLoadingStore } from '~/store/loading.js';
import { lawyerFind } from '~/services/lawyerFind.js';

definePageMeta({
	layout: false,
});

onMounted(() => {
	callApi();
});

const expertList = ref([]);
const loadingStore = useLoadingStore();

const callApi = () => {
	loadingStore.setLoadingShow(true);
	lawyerFind
		.getLawyerList({
			sido: '',
			gugun: '',
			locationCode: '',
			badgeFilters: [],
		})
		.then(({ data }) => {
			expertList.value = data.slice(0, 6);
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const router = useRouter();
const handlerClickToastButton = () => {
	router.push('/lawyer/find/match');
};
</script>

<style lang="scss" scoped>
.index-title-container {
	padding: 0 17px;
}
.index-title {
	font-size: 20px;
	font-weight: $ft-bold;
	line-height: 29px;
	margin: 37px 0 8px;
}
.index-subtitle {
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > p {
		font-size: 14px;
		color: #949599;
		line-height: 20px;
	}
	.more-text {
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: #000000;
		& > span {
			font-size: 14px;
			font-weight: $ft-medium;
			line-height: 20px;
		}
		& > img {
			margin-bottom: 1px;
		}
	}
}
</style>
