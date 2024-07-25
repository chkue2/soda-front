<template>
	<HeaderClose title="로그인" />
	<div class="login-container">
		<img src="/img/icon/soda-home.png" class="login-logo" alt="로그인 로고" />
		<input
			v-model="credentials.userId"
			type="text"
			class="login-input"
			placeholder="아이디를 입력해주세요"
		/>
		<input
			v-model="credentials.password"
			type="password"
			class="login-input"
			placeholder="비밀번호를 입력해주세요"
			autocomplete="off"
			@keyup.enter="handlerClickLoginButton"
		/>
		<div class="login-text-container">
			<div class="login-toggle-container">
				<div
					class="login-toggle"
					:class="{ active: isSwitchToggle }"
					@click="handlerClickSwitchToggle"
				>
					<i></i>
				</div>
				<p>아이디 저장</p>
			</div>
			<NuxtLink to="/user/find/password" class="login-find-password"
				>비밀번호를 잊으셨나요?</NuxtLink
			>
		</div>
		<button class="login-button" @click="handlerClickLoginButton">
			로그인
		</button>
		<div class="login-links">
			<NuxtLink to="/signup" class="login-link">회원가입</NuxtLink>
			<div class="login-link-line"></div>
			<NuxtLink to="/user/find/id" class="login-link">아이디찾기</NuxtLink>
			<div class="login-link-line"></div>
			<NuxtLink to="/user/help-center" class="login-link">고객센터</NuxtLink>
		</div>
		<div class="login-quick-buttons">
			<button class="kakao-login" @click="handlerClickKakaoLogin">
				<img src="/img/icon/kakao-login.svg" alt="카카오 로그인" />
			</button>
			<button class="naver-login" @click="handlerClickNaverLogin">
				<img src="/img/icon/naver-login.svg" alt="네이버 로그인" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';

import { LOGIN_REDIRECT_KEY } from '~/assets/js/storageKeys.js';
import { useAuthStore } from '~/store/auth.js';
import { useAlertStore } from '~/store/alert.js';

const router = useRouter();
const useAuth = useAuthStore();
const alertStore = useAlertStore();

let isSwitchToggle = ref(false);

onMounted(() => {
	const userId = localStorage.getItem('userId');
	if (userId) {
		credentials.value.userId = userId;
	}

	isSwitchToggle.value =
		localStorage.getItem('saveId') === 'true' ? true : false;
});

const handlerClickSwitchToggle = () => {
	isSwitchToggle.value = !isSwitchToggle.value;
};

const credentials = ref({
	userId: '',
	password: '',
});

const isValidation = computed(() => {
	return credentials.value.userId !== '' && credentials.value.password !== '';
});

const handlerClickLoginButton = async () => {
	if (!isValidation.value) {
		if (credentials.value.userId === '') {
			alertStore.open('아이디를 입력해주세요.');
		} else if (credentials.value.password === '') {
			alertStore.open('비밀번호를 입력해주세요.');
		}
		return false;
	}

	const isSuccess = await useAuth.login(credentials.value);

	if (isSuccess) {
		localStorage.setItem('saveId', isSwitchToggle.value);
		if (isSwitchToggle.value) {
			localStorage.setItem('userId', credentials.value.userId);
		} else {
			localStorage.removeItem('userId');
		}

		await useAuth.userProfile();

		setTimeout(() => {
			redirect();
		}, 100);
	} else {
		alertStore.open('아이디 또는 비밀번호가 다릅니다.');
	}
};

const redirect = () => {
	const redirectUrl = localStorage.getItem(LOGIN_REDIRECT_KEY);

	router.replace(redirectUrl || '/');
};

const handlerClickKakaoLogin = () => {
	const domain =
		location.href.includes('.local') || location.href.includes('dev.')
			? 'https://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';

	location.href = domain + '/oauth2/authorization/kakao';
};

const handlerClickNaverLogin = () => {
	const domain =
		location.href.includes('.local') || location.href.includes('dev.')
			? 'http://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';

	location.href = domain + '/oauth2/authorization/naver';
};
</script>

<style lang="scss" scoped>
.login-container {
	padding: 75px 30px 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.login-logo {
	width: 167px;
	height: auto;
	margin-bottom: 20px;
}
.login-input {
	width: 100%;
	height: 48px;
	padding: 0 16px;
	margin-top: 11px;
	border-radius: 6px;
	border: 1px solid #e1e1e1;
	background-color: #f5f5f5;
	font-size: 15px;
}
.login-text-container {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 17px 0 45px;
}
.login-toggle-container {
	display: flex;
	align-items: center;
	gap: 8px;
	& > p {
		font-size: 12px;
		color: #7a7a7a;
	}
	.login-toggle {
		width: 40px;
		height: 20px;
		border-radius: 25px;
		background-color: #d9d9d9;
		transition: all 0.3s ease-in-out;
		cursor: pointer;
		& > i {
			display: block;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			background-color: #ffffff;
			transform: translate(2px, 2px);
			transition: all 0.3s ease-in-out;
		}
		&.active {
			background-color: #29cdff;
			& > i {
				transform: translate(22px, 2px);
			}
		}
	}
}
.login-find-password {
	font-size: 12px;
	color: #656565;
	text-decoration: none;
}
.login-button {
	width: 100%;
	height: 48px;
	border-radius: 6px;
	background-color: #29cdff;
	font-size: 18px;
	font-weight: $ft-bold;
	color: #ffffff;
}
.login-links {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	margin: 10px 0 60px;
	.login-link {
		font-size: 14px;
		color: #5b5b5b;
		font-weight: $ft-medium;
		text-decoration: none;
	}
	.login-link-line {
		width: 1px;
		height: 10px;
		background-color: #d0d0d0;
	}
}
.login-quick-buttons {
	display: flex;
	justify-content: center;
	gap: 20px;
}
</style>
