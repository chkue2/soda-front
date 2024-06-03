<template>
	<HeaderClose title="등기프로 찾기" />
	<div class="find-match-container">
		<div class="find-match-top-container">
			<div class="match-title">
				<img src="/img/icon/love-letter.png" />
				<p>프로필카드 받기 완료</p>
			</div>
			<p class="match-subtitle">
				입찰에 참가한 등기프로를 확인하고 선택해주세요.
			</p>
		</div>
		<ListEmptyItem
			v-if="lawyerList.length === 0"
			title="앗! 모집된 등기프로가 없어요"
			sub-title="일정이 맞는 등기프로가 없을 수 있어요.<br>책정 보수금액을 조금 더 상향해서 재입찰 할 수 있어요!"
		/>
		<ExpertList
			v-if="lawyerList.length > 0"
			:list="lawyerList"
			:tid="tid"
			type="match"
			:ins="props.type"
		/>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="새로운 사무소로 다시 찾아볼래요!"
			progress-color="#404040"
			@click-button="toggleLawyerRematchModal"
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import LawyerRematchModal from '~/components/modal/LawyerRematchModal.vue';
import LawyerRematchImpossibleModal from '~/components/modal/LawyerRematchImpossibleModal.vue';

import { lawyerMatch } from '~/services/lawyerMatch.js';

const props = defineProps({
	tid: {
		type: String,
		default: '',
	},
	type: {
		type: String,
		default: 'soda',
	},
});

const lawyerList = ref([]);

const router = useRouter();
onMounted(() => {
	lawyerMatch
		.getLawyerList(props.tid, props.type)
		.then(({ data }) => {
			lawyerList.value = data;
			console.log(data);
		})
		.catch(e => {
			alert(e.response.data.message);
			router.push('/');
		});
});

const handlerClickRematchButton = () => {
	router.push('/lawyer/find/form');
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
