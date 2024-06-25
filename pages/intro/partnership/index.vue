<template>
	<HeaderClose title="등기소다 X 프리로스" />
	<p class="partnership-top-title">PARTNERSHIP</p>
	<picture>
		<source
			srcset="/img/intro/partnership-intro-mo-01.png"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/partnership-intro-pc-01.png" alt="파트너십 이미지" />
	</picture>
	<div class="partnership-container">
		<p class="partnership-title">
			<b>등기소다</b>와 프리로스는<br />서로 협력하는 파트너입니다.
		</p>
		<p class="partnership-content">
			등기소다는 부동산 거래를 위한 사용자 중심의 플랫폼으로, 고객들이 부동산
			거래 과정을 더욱 투명하고 편리하게 진행할 수 있도록 지원합니다. 이를 위해
			등기 절차를 담당하는 법무사와의 매칭 서비스를 제공하고 있습니다.<br /><br />
			프리로스는 법무사들이 자신의 업무를 효율적으로 관리하고 클라이언트와의
			커뮤니케이션을 강화하는 데 도움을 주는 앱입니다. 이 앱을 통해 법무사들은
			일정 관리, 문서 작성 및 관리, 클라이언트와의 소통 등을 간편하게 처리할 수
			있습니다.<br /><br />
			두 앱 간의 파트너쉽은 고객과 법무사 간의 원활한 소통과 협력을 위한
			것입니다. 등기소다를 통해 고객이 부동산 거래를 시작하면, 프리로스를
			사용하는 법무사들은 고객과의 소통과 업무 관리를 보다 효율적으로 할 수
			있으며, 이를 통해 부동산 거래 과정 전반에 대한 서비스 품질을 향상시킬 수
			있습니다. 따라서 두 앱은 서로 보완적인 역할을 수행하며, 고객과 법무사 간의
			원활한 협력을 도모하는 파트너쉽 관계에 있습니다.
		</p>
		<button class="partnership-button" @click="handlerClickHomeButton">
			홈으로
		</button>
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
const handlerClickHomeButton = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped>
.partnership-top-title {
	margin: 30px 0 22px;
	text-align: center;
	font-weight: $ft-bold;
}
picture {
	width: 100%;
	height: auto;
	img {
		width: 100%;
		height: auto;
	}
}
.partnership-container {
	padding: 25px 25px 36px;
}
.partnership-title {
	font-size: 22px;
	font-weight: $ft-bold;
	line-height: 1.5;
	margin-bottom: 46px;
	& > b {
		color: #29cdff;
	}
}
.partnership-content {
	color: #4f4f4f;
	line-height: 1.35;
}
.partnership-button {
	width: 100%;
	height: 60px;
	font-size: 16px;
	border-radius: 10px;
	background-color: #29cdff;
	box-shadow: 1px -1px 6.1px 1px rgba(0, 0, 0, 0.05);
	font-weight: $ft-bold;
	color: #ffffff;
	margin-top: 95px;
}
</style>
