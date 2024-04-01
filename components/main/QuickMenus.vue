<template>
	<div class="quick-my-contract-container">
		<NuxtLink to="/user/contract-manage/list" class="quick-my-contract">
			<div class="quick-my-contract-left">
				<img src="/img/icon/paper-emoji.svg" />
				<p>원클릭으로 쉬운 내 계약관리</p>
			</div>
			<img src="/img/icon/expand-right-black.svg" />
		</NuxtLink>
	</div>
	<div class="quick-menus-container">
		<NuxtLink to="/intro/soda" class="quick-menu">
			<img src="/img/icon/home-emoji-color.svg" class="quick-menu-icon" />
			<p>소유권이전등기</p>
		</NuxtLink>
		<i class="quick-menus-bar"></i>
		<NuxtLink to="/lawyer/find" class="quick-menu">
			<img src="/img/icon/cap-emoji-color.svg" class="quick-menu-icon" />
			<p>등기프로 찾기</p>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.quick-my-contract-container {
	margin: 10px 0 20px;
	padding: 0 14px;
}
.quick-my-contract {
	height: 68px;
	padding: 0 20px;
	border-radius: 24px;
	background-color: #f7f8fa;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-decoration: none;
}
.quick-my-contract-left {
	display: flex;
	align-items: center;
	gap: 11px;
	& > p {
		font-weight: $ft-medium;
		text-decoration: none;
		color: #000000;
	}
}
.quick-menus-container {
	display: flex;
	margin: 20px 0 30px;
	justify-content: center;
	align-items: center;
	align-content: center;
	gap: 24px;
}
.quick-menu {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
	text-decoration: none;
	color: #252525;
	& > p {
		font-size: 14px;
		font-weight: $ft-medium;
	}
}
.quick-menu-icon {
	width: 30px;
	height: 30px;
}
.quick-menus-bar {
	width: 1px;
	height: 16px;
	background-color: #dde0e3;
	display: block;
}
</style>
