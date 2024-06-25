<template>
	<div class="bank-banner">
		<p>
			등기업무는 등기소다에서!<br />
			<b>은행</b><strong>들도 믿고 씁니다!</strong>
		</p>
		<img src="/img/icon/kakao-bank-building.svg" alt="은행도 믿고써요" />
	</div>
</template>
<style lang="scss">
.bank-banner {
	display: flex;
	height: 119px;
	padding: 24px 40px;
	justify-content: center;
	align-items: center;
	align-content: center;
	gap: 40px;
	flex-shrink: 0;
	align-self: stretch;
	background: #5c607f;
	& > p {
		font-size: 14px;
		line-height: 21px;
		color: #ffffff;
		& > b {
			font-size: 18px;
			font-weight: $ft-bold;
			color: #fae100;
		}
		& > strong {
			font-size: 18px;
			font-weight: $ft-regular;
		}
	}
}
</style>
