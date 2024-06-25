<template>
	<div class="nav-container">
		<NuxtLink to="/" class="nav-item" :class="{ active: nowMenu === 'home' }">
			<img
				:src="`/img/icon/home${nowMenu === 'home' ? '-on' : ''}.svg`"
				alt="홈"
			/>
			<span>홈</span>
		</NuxtLink>
		<NuxtLink
			to="/calculate/form"
			class="nav-item"
			:class="{ active: nowMenu === 'calc' }"
		>
			<img
				:src="`/img/icon/pie${nowMenu === 'calc' ? '-on' : ''}.svg`"
				alt="견적넣기"
			/>
			<span>견적넣기</span>
		</NuxtLink>
		<NuxtLink
			to="/lawyer/find"
			class="nav-item"
			:class="{ active: nowMenu === 'lawyer' }"
		>
			<img
				:src="`/img/icon/search${nowMenu === 'lawyer' ? '-on' : ''}.svg`"
				alt="찾기"
			/>
			<span>찾기</span>
		</NuxtLink>
		<NuxtLink
			to="/user/mypage"
			class="nav-item"
			:class="{ active: nowMenu === 'mypage' }"
		>
			<img
				:src="`/img/icon/user${nowMenu === 'mypage' ? '-on' : ''}.svg`"
				alt="마이페이지"
			/>
			<span>마이페이지</span>
		</NuxtLink>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const path = location.pathname;
const nowMenu = computed(() => {
	if (path.includes('/calculate')) return 'calc';
	else if (path.includes('/lawyer')) return 'lawyer';
	else if (path.includes('/mypage')) return 'mypage';
	else return 'home';
});
</script>

<style lang="scss" scoped>
.nav-container {
	width: 100%;
	max-width: $wrapper-width;
	display: flex;
	height: $footer-nav-height;
	padding: 7px 0px;
	position: fixed;
	bottom: 0;
	background-color: #ffffff;
	z-index: $zi-fixed;
	.nav-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		cursor: pointer;
		& > span {
			display: none;
			text-decoration: none;
		}
		&.active {
			& > span {
				display: block;
				color: #29cdff;
				font-size: 12px;
				font-weight: $ft-medium;
				line-height: 17px;
				letter-spacing: 0.48px;
			}
		}
	}
}
</style>
