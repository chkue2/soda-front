<template>
	<HeaderClose title="매칭된 법무사 리스트" />
	<div class="find-match-container">
		<div class="find-match-top-container">
			<div class="match-title">
				<img src="/img/icon/love-letter.svg" />
				<p>명함 받기 완료</p>
			</div>
			<p class="match-subtitle">
				다섯명의 법무사에게 명함을 받았습니다.<br />
				원하는 법무사를 클릭하여 대화를 시작해보세요!
			</p>
			<div class="match-help-text">
				공과금을 제외한 법정보수는 100만원 입니다.
			</div>
		</div>
		<ExpertList />
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="다시 찾기"
			progress-color="#404040"
			@click-button="handlerClickRefindButton"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertList from '~/components/list/ExpertList.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const router = useRouter();
const handlerClickRefindButton = () => {
	router.push('/lawyer/find/form');
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
}
.match-help-text {
	background-color: #eefbff;
	border-radius: 5px;
	text-align: center;
	margin: 10px 0;
	padding: 16px 0;
	font-size: 13px;
	font-weight: $ft-bold;
	color: #006ffd;
}
</style>
