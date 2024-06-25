<template>
	<HeaderClose title="등기부등본 변동 알림서비스" />
	<div class="intro-container">
		<div class="intro-title">
			<img
				src="/img/icon/bell-yellow.svg"
				alt="등기부등본 변동 알림"
				aria-hidden
			/>
			<p>등기부등본 변동 알림</p>
		</div>
		<ul class="intro-contents">
			<li>
				계약정보를 입력하여 수임확정 후, 다음 영업일부터 잔금일까지 알림을 받을
				수 있어요.
			</li>
			<li>
				등기부등본 변동이 발생되면 다음 영업일 오전에 알림을 받을 수 있어요.
			</li>
			<li>등기부등본 변동 알림은 카카오 알림톡으로 전달돼요.</li>
			<li>미등기인 경우 등기변동 알림 서비스 이용이 불가해요.</li>
			<li>자세한 등기 변뎡 내역은 부동산 등기를 직접 열람하여 확인해주세요.</li>
		</ul>
		<a class="intro-link" href="https://www.iros.go.kr" target="_blank"
			>대한민국 법원 인터넷 등기소 (www.iros.go.kr)에서 확인</a
		>
	</div>
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
</script>

<style lang="scss" scoped>
.intro-container {
	padding: 38px 15px;
}
.intro-title {
	display: flex;
	align-items: center;
	gap: 8px;
	padding-bottom: 10px;
	border-bottom: 1px solid #ebebeb;
	& > p {
		font-size: 14px;
		font-weight: $ft-bold;
	}
}
.intro-contents {
	padding: 35px 0;
	& > li {
		display: flex;
		font-size: 14px;
		word-break: keep-all;
		&::before {
			content: '•';
			margin: 0 4px;
		}
		& + li {
			margin-top: 13px;
		}
	}
}
.intro-link {
	font-size: 13px;
	color: #3172f7;
	text-decoration: none;
	margin-left: 8px;
	cursor: pointer;
}
</style>
