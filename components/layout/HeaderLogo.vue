<template>
	<div class="header-logo-container">
		<NuxtLink to="/">
			<img src="/img/icon/logo-blue.png" />
		</NuxtLink>
		<NuxtLink v-if="!isLoggedIn" to="/login" class="header-button">
			<button class="header-button">로그인하기</button>
		</NuxtLink>
		<NuxtLink v-if="isLoggedIn" to="/notification" class="header-bell">
			<img src="/img/icon/bell-white.svg" />
		</NuxtLink>
	</div>
</template>

<script setup>
import { computed } from 'vue';

import { useAuthStore } from '~/store/auth.js';

const useAuth = useAuthStore();

const isLoggedIn = computed(() => useAuth.user !== null);
</script>

<style lang="scss" scoped>
.header-logo-container {
	height: 62px;
	position: sticky;
	top: 0;
	background-color: #ffffff;
	display: flex;
	padding: 10px 20px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	z-index: $zi-sticky;
	& a > img {
		width: auto;
		height: 20px;
	}
	.header-bell {
		& > img {
			width: 24px;
			height: 24px;
		}
	}
}
.header-button {
	text-decoration: none;
	& > button {
		display: flex;
		padding: 10px 16px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		border-radius: 4px;
		border: 1px solid #d4d4d6;
		background: #fff;
		color: #484848;
		cursor: pointer;
	}
}
</style>
