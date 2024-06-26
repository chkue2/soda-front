<template>
	<HeaderClose title="등기프로 찾기" />
	<div class="find-match-container">
		<div v-if="status === 'OPEN'" class="find-match-top-container">
			<div class="match-title">
				<img src="/img/icon/love-letter.png" alt="프로필카드 받는중" />
				<p>프로필카드 받는 중</p>
			</div>
			<p class="match-subtitle">
				최대 5명에게 받아 볼 수 있습니다.<br />모집이 완료되면 알림톡을
				보내드려요.
			</p>
		</div>
		<div v-if="status === 'CLOSE'" class="find-match-top-container">
			<div class="match-title">
				<img src="/img/icon/love-letter.png" alt="프로필카드 받기 완료" />
				<p>프로필카드 받기 완료</p>
			</div>
			<p class="match-subtitle">
				모집에 참가한 등기프로를 확인하고 선택해주세요.
			</p>
		</div>
		<ListEmptyForMatchItem
			v-if="lawyerList.length === 0 && status === 'OPEN'"
			title="아직 등기프로를 모집중이예요!"
			sub-title="등기프로가 모집 될 때까지 기다려주세요!<br>(영업일 기준 다음날 오후 4시까지 모집)"
		/>
		<ListEmptyItem
			v-if="lawyerList.length === 0 && status === 'CLOSE'"
			title="앗! 모집된 등기프로가 없어요"
			sub-title="일정이 맞는 등기프로가 없을 수 있어요.<br>책정 보수금액을 조금 더 상향해서 재입찰 할 수 있어요!"
		/>
		<ExpertList
			v-if="lawyerList.length > 0"
			:list="lawyerList"
			:tid="tid"
			type="match"
			:ins="props.ins"
		/>
	</div>
	<div
		v-if="status === 'OPEN' && props.ins === 'soda'"
		class="form-bottom-buttons"
	>
		<ProgressBackgroundButton
			title="홈으로"
			@click-button="handlerClickHomeButton"
		/>
	</div>
	<div v-if="status === 'CLOSE'" class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="새로운 사무소로 다시 찾아볼래요!"
			progress-color="#404040"
			@click-button="handlerClickRetryButton"
		/>
	</div>
	<LawyerRematchModal
		v-if="isLawyerRematchModalShow"
		@click-rematch-button="handlerClickRematchButton"
		@close-modal="toggleLawyerRematchModal"
	/>
	<LawyerRematchImpossibleModal
		v-if="isLawyerRematchImpossibleModalShow"
		@close-modal="toggleLawyerRematchImpossibleModal"
	/>
	<LawyerRematchCountImpossibleModal
		v-if="isLawyerRematchCountImpossibleModalShow"
		@close-modal="toggleLawyerRematchCountImpossibleModal"
	/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import ListEmptyForMatchItem from '~/components/item/ListEmptyForMatchItem.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import LawyerRematchCountImpossibleModal from '~/components/modal/LawyerRematchCountImpossibleModal.vue';
import LawyerRematchImpossibleModal from '~/components/modal/LawyerRematchImpossibleModal.vue';
import LawyerRematchModal from '~/components/modal/LawyerRematchModal.vue';

import { LAWYER_FIND_TMP_KEY } from '~/assets/js/storageKeys.js';
import { lawyerMatch } from '~/services/lawyerMatch.js';

const props = defineProps({
	tid: {
		type: String,
		default: '',
	},
	ins: {
		type: String,
		default: 'soda',
	},
});

const lawyerList = ref([]);
const status = ref('');

const router = useRouter();
onMounted(() => {
	lawyerMatch
		.getLawyerList(props.tid, props.ins)
		.then(({ data }) => {
			lawyerList.value = data.list;
			status.value = data.status;
		})
		.catch(e => {
			alert(e.response.data.message);
			router.push('/');
		});
});

const handlerClickHomeButton = () => {
	router.push('/');
};
const handlerClickRematchButton = () => {
	lawyerMatch
		.retryLawyerFind(props.tid, props.ins)
		.then(({ data }) => {
			window.localStorage.setItem(LAWYER_FIND_TMP_KEY, data.tmpKey);
			router.push(`/lawyer/find/${props.ins}/type`);
		})
		.catch(e => {
			alert(e.response.data.message);
		});
};

const isLawyerRematchModalShow = ref(false);
const toggleLawyerRematchModal = () => {
	isLawyerRematchModalShow.value = !isLawyerRematchModalShow.value;
};
const isLawyerRematchImpossibleModalShow = ref(false);
const toggleLawyerRematchImpossibleModal = () => {
	isLawyerRematchImpossibleModalShow.value =
		!isLawyerRematchImpossibleModalShow.value;
};
const isLawyerRematchCountImpossibleModalShow = ref(false);
const toggleLawyerRematchCountImpossibleModal = () => {
	isLawyerRematchCountImpossibleModalShow.value =
		!isLawyerRematchCountImpossibleModalShow.value;
};

const handlerClickRetryButton = () => {
	lawyerMatch
		.retryLawyerFindCheck(props.tid, props.ins)
		.then(({ data }) => {
			if (data.result === 'SUCCESS') {
				toggleLawyerRematchModal();
			} else if (data.result === 'NO_MORE_ISSUE_DATE') {
				toggleLawyerRematchImpossibleModal();
			} else {
				toggleLawyerRematchCountImpossibleModal();
			}
		})
		.catch(e => {
			alert(e.response.data.message);
		});
};
</script>

<style lang="scss" scoped>
.find-match-container {
	padding: 17px 10px 30px;
	margin-bottom: 56px;
}
.find-match-top-container {
	padding: 0 5px;
}
.match-title {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 4px;
	margin-bottom: 5px;
	& > img {
		width: 20px;
		margin-bottom: 1px;
	}
	& > p {
		font-weight: $ft-bold;
		color: #252525;
	}
}
.match-subtitle {
	width: 100%;
	text-align: left;
	font-size: 13px;
	color: #252525;
	line-height: 16px;
	margin-bottom: 26px;
}
</style>
