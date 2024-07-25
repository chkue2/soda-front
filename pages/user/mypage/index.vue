<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<p class="page-title">마이페이지</p>
			<div class="profile-container">
				<div class="profile-box" @click="handlerClickProfileImage">
					<img class="profile-image" :src="profileImage" alt="프로필 이미지" />
					<img
						v-if="isLoggedIn"
						class="setting-icon"
						src="/img/icon/setting-circle-gray.svg"
						alt="프로필 이미지 변경"
					/>
					<input
						ref="profileImageFile"
						type="file"
						accept=".png, .jpg, .jpeg"
						@change="handlerChangeProfileImageFile"
					/>
				</div>
				<div v-if="!isLoggedIn" class="profile-text">
					<NuxtLink to="/login" class="login-button">
						<span>로그인하기</span
						><img
							src="/img/icon/expand-right-black.svg"
							alt="로그인하기"
							aria-hidden
						/>
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
				<swiper
					:modules="modules"
					:autoplay="true"
					:loop="true"
					@slide-change="handlerChangeSlide"
				>
					<swiper-slide v-for="(n, index) in noticePopupList" :key="index">
						<div class="mypage-banner" @click="handlerClickNotice">
							<p><b>NOTICE</b></p>
							<p>{{ n.title }}</p>
						</div>
					</swiper-slide>
				</swiper>
				<div class="banner-counter">
					{{ noticeCount }}/{{ noticePopupList.length }}
				</div>
			</div>
			<div class="mypage-menu-container">
				<div class="mypage-menu">
					<p class="mypage-menu-title">내 정보</p>
					<NuxtLink to="/user/update" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>내 정보 수정하기</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
							alt="메뉴로 이동"
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
							alt="메뉴로 이동"
						/>
					</NuxtLink>
					<NuxtLink to="/registration/change/intro" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>등기부등본 변동 알림서비스</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
							alt="메뉴로 이동"
						/>
					</NuxtLink>
					<div class="mypage-menu-toggle">
						<p>
							내가 계약한 부동산 등기부등본 변동 알림서비스를 알림톡으로 받아볼
							수 있습니다.
						</p>
						<ToggleButton />
					</div>
					<NuxtLink to="/user/my-like" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>좋아요 활동</p>
							<span class="like-count">{{ likeCount }}</span>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
							alt="메뉴로 이동"
						/>
					</NuxtLink>
					<NuxtLink to="/user/my-review" class="mypage-menu-item">
						<div class="mypage-menu-item-title">
							<p>내 리뷰 관리</p>
						</div>
						<img
							src="/img/icon/expand-right-gray.svg"
							class="mypage-menu-item-icon"
							alt="메뉴로 이동"
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
							alt="메뉴로 이동"
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
						<img
							src="/img/icon/logout.svg"
							class="mypage-menu-item-icon"
							alt="로그아웃"
							aria-hidden
						/>
					</button>
				</div>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import ToggleButton from '~/components/button/ToggleButton.vue';
import HeaderLogo from '~/components/layout/HeaderLogo.vue';

import { resizeImage } from '~/assets/js/utils.js';
import { firmLike } from '~/services/firmLike.js';
import { notice } from '~/services/notice.js';
import { user } from '~/services/user.js';
import { useAuthStore } from '~/store/auth.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

const modules = [Autoplay];

const router = useRouter();
const useAuth = useAuthStore();
const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const noticeCount = ref(1);

const isLoggedIn = computed(() => useAuth.user !== null);
const profileImage = computed(() =>
	useAuth.user === null || useAuth.user.profile.userProfileImage === null
		? '/img/icon/profile-cow.png'
		: `data:image/png;base64,${useAuth.user.profile.userProfileImage}`,
);

const handlerClickLogoutButton = () => {
	useAuth.logout();
	router.push('/');
};

const likeCount = ref(0);
const noticePopupList = ref([]);

onMounted(() => {
	callApi();
});

const callApi = () => {
	loadingStore.setLoadingShow(true);
	if (isLoggedIn.value) {
		Promise.all([getNoticePopup(), getFirmLikeCount()]).finally(() => {
			loadingStore.setLoadingShow(false);
		});
	} else {
		Promise.all([getNoticePopup()]).finally(() => {
			loadingStore.setLoadingShow(false);
		});
	}
};

const getFirmLikeCount = () => {
	firmLike
		.getCount()
		.then(({ data }) => {
			likeCount.value = data.likeCount;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const getNoticePopup = () => {
	notice
		.getNoticePopup(1)
		.then(({ data }) => {
			noticePopupList.value = data.noticeList;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const profileImageFile = ref(null);

const handlerClickProfileImage = () => {
	if (!isLoggedIn.value) return false;

	profileImageFile.value.click();
};

const handlerChangeProfileImageFile = e => {
	const file = e.target.files[0];
	if (file === undefined) return false;

	resizeImage(file, 500, 500, 0.7, function (resizedFile) {
		const formData = new FormData();
		formData.append('profile', resizedFile);

		user
			.setProfileImage(formData)
			.then(() => {
				useAuth.userProfile();
			})
			.catch(e => {
				alertStore.open(e.response.data.message);
			});
	});
};

const handlerClickNotice = () => {
	router.push('/notice');
};

const handlerChangeSlide = e => {
	noticeCount.value = e.realIndex + 1;
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
	cursor: pointer;
	.profile-image {
		width: 72px;
		height: 72px;
		border-radius: 50%;
	}
	.setting-icon {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	& > input {
		display: none;
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
	.mypage-menu-toggle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 30px;
		margin-top: -16px;
		& > p {
			flex: 1;
			font-size: 12px;
			color: #a3a3a3;
			word-break: keep-all;
		}
	}
}
.like-count {
	font-size: 12px;
	font-weight: $ft-bold;
	color: #29cdff;
}
</style>
