<template>
	<HeaderClose title="등기소다 A TO Z" />
	<div class="intro-soda-title">
		비용계산부터<br />법무사 매칭까지<br /><b>한번에</b>
	</div>
	<picture>
		<source
			srcset="/img/intro/soda-intro-mo-01.gif"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/soda-intro-pc-01.png" />
	</picture>
	<section class="intro-soda-section pt24 pb76">
		<p class="intro-soda-section-title">
			복잡한 절차?<br /><b>소다가 한번에!</b>
		</p>
		<p class="intro-soda-section-content">
			등기소다는 부동산 거래 과정에서 등기 절차를 보다 효율적으로 관리하고
			법무사와 고객 간의 매칭을 원활하게 지원하는 어플리케이션입니다. 등기소다는
			주로 고객이 부동산을 구매하거나 판매할 때 발생하는 소유권 이전 등기 절차를
			관리하는 데 사용됩니다.
		</p>
	</section>
	<picture>
		<source
			srcset="/img/intro/soda-intro-mo-02.png"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/soda-intro-pc-02.png" />
	</picture>
	<div class="intro-soda-section pt80 pb71">
		<p class="intro-soda-caption">HOW TO USE</p>
		<p class="intro-soda-section-center-title">
			<b>등기소다</b>는<br />어떻게 사용하나요?
		</p>
		<p class="intro-soda-section-content center">
			등기소다는 기존 복잡한 구조에서 벗어나 편리한 사용성을 추구함에 있어
			누구나 쉽고 빠르게 이용할 수 있습니다.
		</p>
		<div class="intro-soda-cow">
			<img src="/img/cow/cow-02.png" />
		</div>
		<p class="intro-soda-subtitle">1. 등기소다에 접속</p>
		<p class="intro-soda-section-content">
			원활한 서비스이용을 위해 회원가입 후, 등기소다에서 제공하는 간단한
			입력폼에 정보를 입력해주세요.
		</p>
	</div>
	<picture>
		<source
			srcset="/img/intro/soda-intro-mo-03.png"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/soda-intro-pc-03.png" />
	</picture>
	<div class="intro-soda-section pt24 pb60">
		<p class="intro-soda-subtitle">2. 간단한 정보로 계산하기</p>
		<p class="intro-soda-section-content">
			등기소다에서 제공하는 간단한 입력폼에 정보를 기입해주세요.
			소유권이전등기에 필요한 비용을 미리 계산해볼 수 있어요.
		</p>
	</div>
	<picture>
		<source
			srcset="/img/intro/soda-intro-mo-08.png"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/soda-intro-pc-06.png" />
	</picture>
	<div class="intro-soda-section pt24 pb36">
		<p class="intro-soda-subtitle">3. 견적넣기</p>
		<p class="intro-soda-section-content">
			계산해본 비용을 비교해본 후, 마음에 드는 상품의 유형을 선택하여
			소유권이전등기에 필요한 전문가를 찾아보세요.
		</p>
		<div class="intro-soda-cow">
			<img src="/img/cow/cow-03.png" />
		</div>
	</div>
	<div class="intro-soda-section pt24 pb21">
		<p class="intro-soda-subtitle">4. 등기프로 매칭</p>
		<p class="intro-soda-section-content">
			견적을 넣으면 2시간동안 총 5명의 등기프로와 매칭이 시작됩니다. 등기프로의
			평점이나 리뷰를 확인해보고 마음에 드는 등기프로가 없다면 다시찾기로 5명의
			등기프로를 새로 추천받을 수 있어요.
		</p>
	</div>
	<picture>
		<source
			srcset="/img/intro/soda-intro-mo-07.png"
			media="all and (max-width: 450px)"
		/>
		<img src="/img/intro/soda-intro-pc-07.png" />
	</picture>
	<div class="intro-soda-section pt25 pb54">
		<p class="intro-soda-section-content">
			등기소다는 엄선된 전문 프로들로 구성된 네트워크를 자랑합니다. 우리
			플랫폼에 등록된 모든 법무사들은 엄격한 심사 과정을 거쳐 선별되었으며,
			전문성과 경험이 뛰어난 실력있는 전문가들입니다. 등기소다를 통해 고객들은
			최고 수준의 법률 서비스를 제공받을 수 있습니다. 또한 등기소다는 법무사들의
			실적과 평가를 투명하게 제공하여 고객이 신뢰할 수 있는 전문가를 선택할 수
			있도록 지원합니다. 함께 등기소다를 통해 부동산 거래를 안전하게 진행해
			보세요!
		</p>
	</div>
	<div class="intro-soda-section pt41 pb36">
		<NuxtLink to="/calculate/form" class="intro-soda-button"
			>지금 바로 계산해보기</NuxtLink
		>
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
</script>

<style lang="scss" scoped>
.intro-soda-title {
	margin: 55px 0 10px;
	font-size: 34px;
	font-weight: $ft-bold;
	text-align: center;
	& > b {
		color: #29cdff;
	}
}
picture {
	width: 100%;
	height: auto;
	img {
		width: 100%;
		height: auto;
	}
}
.intro-soda-section {
	padding: 0 25px;
}
.intro-soda-section-title {
	font-size: 28px;
	font-weight: $ft-medium;
	& > b {
		font-weight: $ft-bold;
		color: #29cdff;
	}
}
.intro-soda-section-content {
	color: #4f4f4f;
	margin-top: 20px;
	word-break: keep-all;
	line-height: 1.45;
	&.center {
		text-align: center;
	}
}
.intro-soda-caption {
	font-weight: $ft-bold;
	text-align: center;
}
.intro-soda-section-center-title {
	margin-top: 11px;
	font-size: 30px;
	font-weight: $ft-bold;
	text-align: center;
	& > b {
		color: #29cdff;
	}
}
.intro-soda-cow {
	display: flex;
	justify-content: center;
	margin: 114px 0 60px;
	img {
		width: 180px;
		height: auto;
	}
}
.intro-soda-subtitle {
	font-size: 20px;
	color: #29cdff;
	font-weight: $ft-bold;
	margin: 12px 0 10px;
}
.intro-soda-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 60px;
	border-radius: 10px;
	background-color: #29cdff;
	box-shadow: 1px -1px 6.1px 1px rgba(0, 0, 0, 0.05);
	font-size: 16px;
	font-weight: $ft-bold;
	color: #ffffff;
	text-decoration: none;
}
</style>
