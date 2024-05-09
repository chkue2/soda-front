<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<p class="page-title">마이페이지</p>
			<div class="profile-container">
				<div class="profile-box">
					<img class="profile-image" :src="profileImage" />
				</div>
				<div v-if="!isLoggedIn" class="profile-text">
					<NuxtLink to="/login" class="login-button">
						<span>로그인하기</span
						><img src="/img/icon/expand-right-black.svg" />
					</NuxtLink>
					<p class="login-text">더 많은 서비스를 이용할 수 있습니다.</p>
				</div>
				<div v-if="isLoggedIn" class="profile-text">
					<p class="profile-hello">
						<b>{{ useAuth.user.profile.userName }}</b
						>님<br />안녕하세요
					</p>
				</div>
			</div>
			<div class="mypage-banner-container">
				<swiper :modules="modules" :autoplay="true" :loop="true">
					<swiper-slide>
						<div class="mypage-banner">
							<p><b>NOTICE</b></p>
							<p>우리동네 사건정보 우선제공 시행</p>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="mypage-banner">
							<p><b>NOTICE</b></p>
							<p>우리동네 사건정보 우선제공 시행2</p>
						</div>
					</swiper-slide>
					<swiper-slide>
						<div class="mypage-banner">
							<p><b>NOTICE</b></p>
							<p>우리동네 사건정보 우선제공 시행3</p>
						</div>
					</swiper-slide>
				</swiper>
				<div class="banner-counter">2/4</div>
			</div>
			<div class="mypage-menu-container">
				<div v-if="false" class="mypage-menu">
					<p class="mypage-menu-title">내 정보</p>
					<NuxtLink to="/" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>내 정보 수정하기</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
						/>
					</NuxtLink>
				</div>
				<div class="mypage-menu">
					<p class="mypage-menu-title">내 활동</p>
					<NuxtLink to="/user/contract-manage/list" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>내 계약 관리</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
						/>
					</NuxtLink>
					<NuxtLink to="/user/my-like" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>좋아요 활동</p>
							<span class="like-count">6</span>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
						/>
					</NuxtLink>
					<NuxtLink to="/user/my-review" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>내 리뷰 관리</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
						/>
					</NuxtLink>
				</div>
				<div class="mypage-menu">
					<NuxtLink to="/user/help-center" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>고객센터</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
						/>
					</NuxtLink>
					<button
						v-if="isLoggedIn"
						class="mypage-menu-item"
						@click="handlerClickLogoutButton"
					>
						<div class="mypage-menu-item-title">
							<p>로그아웃</p>
						</div>
						<img src="/img/icon/logout.svg" class="mypage-menu-item-icon" />
					</button>
				</div>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import HeaderLogo from '~/components/layout/HeaderLogo.vue';

import { useAuthStore } from '~/store/auth.js';

const modules = [Autoplay];

const router = useRouter();
const useAuth = useAuthStore();

const isLoggedIn = computed(() => useAuth.user !== null);
const profileImage = computed(() =>
	useAuth.user === null
		? '/img/icon/profile-cow.png'
		: useAuth.user.profile.userProfileImage,
);

const handlerClickLogoutButton = () => {
	useAuth.logout();
	router.push('/');
};
</script>

<style lang="scss" scoped>
.page-title {
	padding: 17px 22px 12px;
	font-weight: $ft-bold;
	color: #252525;
}
.profile-container {
	display: flex;
	align-items: center;
	gap: 25px;
	padding: 15px 21px;
}
.profile-box {
	position: relative;
	.profile-image {
		width: 72px;
		height: 72px;
		border-radius: 50%;
	}
}
.login-button {
	display: flex;
	align-items: center;
	margin-bottom: 4px;
	padding: 0;
	color: #000000;
	text-decoration: none;
	& > span {
		font-size: 24px;
		font-weight: $ft-bold;
	}
	& > img {
		width: 23px;
		height: 23px;
	}
}
.login-text {
	font-size: 12px;
	color: #888888;
}
.profile-hello {
	font-size: 24px;
	font-weight: $ft-light;
	line-height: 28px;
	& > b {
		font-weight: $ft-bold;
	}
}
.mypage-banner-container {
	padding: 15px 13px;
	position: relative;
	.mypage-banner {
		height: 38px;
		padding: 0 10px;
		border-radius: 6px;
		background-color: #f6f6f6;
		display: flex;
		align-items: center;
		gap: 3px;
		& > p {
			font-size: 12px;
			font-weight: $ft-medium;
			& > b {
				font-weight: $ft-bold;
			}
		}
	}
}
.banner-counter {
	width: 31px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	border-radius: 12px;
	background-color: rgba(0, 0, 0, 0.2);
	font-size: 11px;
	color: #ffffff;
	top: 50%;
	right: 23px;
	z-index: 9999;
	transform: translateY(-50%);
}
.mypage-menu-container {
	padding: 6px 12px 12px;
	.mypage-menu {
		display: flex;
		flex-direction: column;
		gap: 20px;
		& + .mypage-menu {
			border-top: 1px solid #ebebeb;
			margin-top: 20px;
			padding-top: 20px;
		}
	}
	.mypage-menu-title {
		font-size: 14px;
		font-weight: $ft-bold;
		color: #ababab;
	}
	.mypage-menu-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #000000;
		text-decoration: none;
		padding: 0;
		cursor: pointer;
	}
	.mypage-menu-item-title {
		display: flex;
		align-items: center;
		gap: 8px;
		& > p {
			font-size: 14px;
			font-weight: $ft-bold;
		}
	}
}
.like-count {
	font-size: 12px;
	font-weight: $ft-bold;
	color: #29cdff;
}
</style>
