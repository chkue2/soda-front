<template>
	<div class="quick-menu-container">
		<div class="quick-menu-top-wrapper">
			<NuxtLink
				to="/user/contract-manage/list"
				class="quick-menu quick-menu-contract"
			>
				<p class="quick-menu-title">내 계약 관리하기</p>
				<p class="quick-menu-subtitle">
					복잡한건 이제 그만!<br />등기소다로 간편하게
				</p>
				<img src="/img/icon/soda-folder.png" alt="내 계약관리로 이동" />
			</NuxtLink>
			<NuxtLink to="/calculate/form" class="quick-menu quick-menu-small">
				<p class="quick-menu-title">계산하기</p>
				<p class="quick-menu-subtitle">
					소유권이전등기<br />견적을 계산해보세요
				</p>
			</NuxtLink>
			<NuxtLink to="/lawyer/find" class="quick-menu quick-menu-small">
				<p class="quick-menu-title">등기프로 찾기</p>
				<p class="quick-menu-subtitle">내가 원하는<br />법무사를 찾아보세요</p>
			</NuxtLink>
		</div>
		<div class="quick-menu-bottom-wrapper">
			<div class="quick-menu-bottom-contents">
				<p class="quick-menu-bottom-title">거래의 끝은 등기다!</p>
				<p class="quick-menu-bottom-subtitle">
					소유권확보가 중요하다는거<br />알고계시죠?
				</p>
				<img src="/img/icon/bank-house.png" alt="등기소다 알아보기" />
				<p class="quick-menu-bottom-content">은행들도 믿고쓰는 등기소다</p>
				<p class="quick-menu-bottom-tags">
					카카오뱅크, 케이뱅크 등 5개의 은행과 협약
				</p>
			</div>
			<NuxtLink to="/intro/soda" class="quick-menu-bottom-button">
				알아보기
			</NuxtLink>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.quick-menu-container {
	padding: 20px 30px 48px;
	background-color: #e7f5ff;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.quick-menu-top-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 10px;
}
.quick-menu {
	background-color: #ffffff;
	border-radius: 16px;
	text-decoration: none;
	.quick-menu-title {
		font-size: 15px;
		font-weight: $ft-bold;
		color: #000000;
		text-decoration: none;
	}
	.quick-menu-subtitle {
		font-size: 12px;
		font-weight: $ft-medium;
		text-decoration: none;
	}
}
.quick-menu-contract {
	grid-row: 2 span;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px 0 18px;
	.quick-menu-title {
		text-align: center;
	}
	.quick-menu-subtitle {
		margin: 12px 0 48px;
		text-align: center;
		color: #000000;
	}
	& > img {
		width: 90px;
		height: auto;
	}
}
.quick-menu-small {
	padding: 12px 14px;
	.quick-menu-subtitle {
		margin-top: 4px;
		color: #b9babe;
	}
}
.quick-menu-bottom-wrapper {
	display: flex;
	flex-direction: column;
}
.quick-menu-bottom-contents {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #445feb;
	border-radius: 16px 16px 0 0;
	padding: 28px 0 35px;
	.quick-menu-bottom-title {
		font-size: 24px;
		font-weight: $ft-bold;
		color: #ffffff;
		text-align: center;
	}
	.quick-menu-bottom-subtitle {
		margin: 10px 0 50px;
		font-size: 20px;
		font-weight: $ft-bold;
		line-height: 30px;
		color: #ffffff;
		text-align: center;
	}
	& > img {
		width: 215px;
		height: auto;
	}
	.quick-menu-bottom-content {
		font-size: 18px;
		font-weight: $ft-bold;
		color: #ffffff;
		margin: 30px 0 4px;
	}
	.quick-menu-bottom-tags {
		font-size: 14px;
		font-weight: $ft-medium;
		color: #ffffff;
	}
}
.quick-menu-bottom-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 63px;
	border-radius: 0 0 16px 16px;
	background-color: #ffffff;
	font-size: 16px;
	font-weight: $ft-medium;
	color: #62656c;
	text-decoration: none;
}

@media all and (max-width: 640px) {
	.quick-menu-container {
		padding: 20px 16px 48px;
	}
}
</style>
