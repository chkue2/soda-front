<template>
	<div class="quick-menus-container">
		<NuxtLink to="/intro/soda" class="quick-menu">
			<img src="/img/icon/house.svg" class="quick-menu-icon" />
			<div>
				<p class="quick-menu-subtitle">비용계산부터 법무사 매칭까지 한번에!</p>
				<p class="quick-menu-title">
					<span>소유권이전등기</span>
					<img src="/img/icon/expand-right-black.svg" />
				</p>
			</div>
		</NuxtLink>
		<NuxtLink to="/lawyer/find" class="quick-menu">
			<img src="/img/icon/briefcase.svg" class="quick-menu-icon" />
			<div>
				<p class="quick-menu-subtitle">내 주변 가까이에서 찾아볼까?</p>
				<p class="quick-menu-title">
					<span>법무사 찾기</span>
					<img src="/img/icon/expand-right-gray.svg" />
				</p>
			</div>
		</NuxtLink>
	</div>
</template>

<style lang="scss" scoped>
.quick-menus-container {
	display: flex;
	padding: 11px 5px;
	justify-content: center;
	align-items: center;
	align-content: center;
	gap: 4px;
}
.quick-menu {
	flex: 1;
	height: 92px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	text-decoration: none;
	color: #252525;
	background-color: #f2f4f6;
	border-radius: 6px;
}
.quick-menu-icon {
	width: 40px;
	height: 40px;
}
.quick-menu-subtitle {
	font-size: 12px;
	line-height: 16px;
	margin-bottom: 5px;
}
.quick-menu-title {
	display: flex;
	align-items: center;
	& > span {
		font-weight: $ft-bold;
	}
}
@media all and (max-width: 640px) {
	.quick-menus-container {
		padding: 11px;
		flex-direction: column;
	}
	.quick-menu {
		flex: unset;
		width: 100%;
		padding-left: 40px;
		justify-content: flex-start;
	}
}
</style>
