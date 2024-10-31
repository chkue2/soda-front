<template>
	<HeaderClose title="아이디 찾기" />
	<div v-if="!isSuccess" class="find-container mb74">
		<p class="input-form-title mb5">휴대전화번호</p>
		<div class="form-readonly-box mb10">
			<input
				class="w60"
				v-model="form.mobile"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
			<button @click="handlerClickSelfIdentification">본인인증</button>
		</div>
		<p class="input-form-title mb5">이름</p>
		<div class="form-readonly-box mb40">
			<input
				class="w100"
				v-model="form.userName"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
		</div>
	</div>
	<div v-if="isSuccess" class="find-container mb74">
		<p v-if="!isFind" class="find-not-found-text">{{ message }}</p>
		<div v-if="isFind" class="find-found-container mt56 mb56">
			<p class="found-title">등록된 정보와 일치하는 아이디입니다.</p>
			<div class="found-box mt18 mb32">
				<p v-if="findInfo.loginType === 'DEFAULT'" class="found-id">
					{{ findInfo.userId }}
				</p>
				<div
					v-if="findInfo.loginType === 'KAKAO'"
					class="found-sns found-kakao"
				>
					<img
						src="/img/icon/kakao-logo-02.svg"
						alt="카카오 계정"
						aria-hidden
					/>
					<p>카카오 계정</p>
				</div>
				<div
					v-if="findInfo.loginType === 'NAVER'"
					class="found-sns found-naver"
				>
					<img
						src="/img/icon/naver-logo-02.svg"
						alt="네이버 계정"
						aria-hidden
					/>
					<p>네이버 계정</p>
				</div>
				<p class="found-created">가입날짜 {{ created }}</p>
			</div>
			<div v-if="findInfo.loginType === 'DEFAULT'" class="found-find-password">
				<button @click="moveToFindPassword">비밀번호 찾기</button>
			</div>
		</div>
	</div>
	<div v-if="!isSuccess" class="form-bottom-buttons">
		<ProgressBackgroundButton title="아이디 찾기" @click="handlerClickFindId" />
	</div>
	<div v-if="isSuccess" class="form-bottom-buttons">
		<ProgressBackgroundButton title="로그인하기" @click="moveToLogin" />
	</div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import HeaderClose from '~/components/layout/HeaderClose.vue';

import { signup } from '~/services/signup.js';
import { user } from '~/services/user.js';
import { useAlertStore } from '~/store/alert.js';

const alertStore = useAlertStore();

const form = ref({
	userName: '',
	mobile: '',
	userIdentityKey: '',
});

const isSuccess = ref(false);
const isFind = ref(false);
const message = ref('');
const findInfo = ref({
	userId: '',
	created: '',
	loginType: '',
});

const created = computed(() =>
	dayjs(findInfo.value.created).format('YYYY.MM.DD'),
);

onMounted(() => {
	const receiveData = async e => {
		if (e.data.name) {
			form.value.userName = e.data.name;
			form.value.mobile = e.data.phone;
			form.value.userIdentityKey = e.data.userIdentityKey;
		}
	};

	window.addEventListener('message', receiveData, false);
});

const handlerClickSelfIdentification = () => {
	signup
		.getNice({
			checkId: false,
			// redirect_url: `${window.location.origin}/signup/nice-result`,
		})
		.then(({ data }) => {
			const wnd = window.open(undefined, 'new window', 'width=500, height=600');
			wnd.document.write(data);
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const handlerClickFindId = () => {
	if (
		form.value.userName === '' ||
		form.value.mobile === '' ||
		form.value.userIdentityKey === ''
	) {
		isSuccess.value = false;
		alertStore.open('본인인증을 해주세요.');
		return false;
	}

	const formData = new FormData();
	formData.append('userName', form.value.userName);
	formData.append('mobile', form.value.mobile);
	formData.append('userIdentityKey', form.value.userIdentityKey);

	user
		.findId(formData)
		.then(({ data }) => {
			isFind.value = true;
			findInfo.value = data;
		})
		.catch(e => {
			isFind.value = false;
			message.value = e.response.data.message;
		})
		.finally(() => {
			isSuccess.value = true;
		});
};

const router = useRouter();
const moveToFindPassword = () => {
	router.push('/user/find/password');
};
const moveToLogin = () => {
	router.push('/login');
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/form/find.scss';
.find-not-found-text {
	margin: 57px 0;
	text-align: center;
	color: #252525;
	word-break: keep-all;
}
.found-title {
	color: #252525;
	text-align: center;
}
.found-box {
	padding: 18px 0 21px;
	background-color: #f6f6f6;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
}
.found-created {
	font-size: 14px;
	color: #545454;
}
.found-find-password {
	display: flex;
	justify-content: center;
	& > button {
		height: 45px;
		border-radius: 6px;
		border: 1px solid #5f5f5f;
		background-color: #ffffff;
		color: #5f5f5f;
		padding: 0 28px;
	}
}
.found-sns {
	padding: 9px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	& > p {
		font-size: 10px;
		font-weight: $ft-semibold;
	}
	&.found-naver {
		background-color: #03c75a;
		& > p {
			color: #ffffff;
		}
	}
	&.found-kakao {
		background-color: #fee500;
	}
}
</style>
