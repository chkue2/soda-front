<template>
	<HeaderClose title="내 정보 수정하기" />
	<div class="update-form">
		<div class="update-toggle mb37">
			<p>광고성정보 수신동의</p>
			<ToggleButton :is-toggle="isToggle" @click-toggle="handlerClickToggle" />
		</div>
		<p class="input-form-title mb11">이름</p>
		<div class="form-readonly-box mb10">
			<input v-model="form.userName" type="text" readonly />
		</div>
		<p class="input-form-title mb11">
			휴대전화번호<span>휴대전화번호 변경은 고객센터로 문의</span>
		</p>
		<div class="form-readonly-box mb10">
			<input v-model="form.mobile" type="tel" readonly />
		</div>
		<div v-if="loginType === 'DEFAULT'">
			<p class="input-form-title mb11">아이디</p>
			<div class="form-readonly-box mb37">
				<input v-model="form.userId" type="text" readonly />
			</div>
			<p class="input-form-title mb11">현재 비밀번호</p>
			<div class="form-input mb37">
				<input
					v-model="form.currentPassword"
					type="password"
					placeholder="비밀번호를 입력하세요"
				/>
			</div>
			<p class="input-form-title mb11">
				새비밀번호<span>영문,숫자,특수문자를 조합한 8자 이상</span>
			</p>
			<div class="form-input mb10">
				<input
					v-model="form.newPassword"
					type="password"
					placeholder="새 비밀번호를 입력하세요"
				/>
			</div>
			<div class="form-input mb10">
				<input
					v-model="form.confirmPassword"
					type="password"
					placeholder="새 비밀번호를 한번 더 입력하세요"
				/>
			</div>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="수정하기"
			@click-button="handlerClickUpdateButton"
		/>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ToggleButton from '~/components/button/ToggleButton.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { user } from '~/services/user.js';
import { useLoadingStore } from '~/store/loading.js';
import { isValidPassword } from '~/assets/js/utils.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	middleware: 'auth',
});

const alertStore = useAlertStore();

const form = ref({
	userName: '',
	mobile: '',
	userId: '',
	currentPassword: '',
	newPassword: '',
	confirmPassword: '',
	advInfoReceiveAgree: '',
});
const loginType = ref('DEFAULT');

const isToggle = ref(false);
const handlerClickToggle = () => {
	isToggle.value = !isToggle.value;
};

const isValidation = computed(() => {
	return loginType.value === 'DEFAULT'
		? form.value.currentPassword !== '' &&
				isValidPassword(form.value.currentPassword) &&
				(form.value.newPassword !== ''
					? isValidPassword(form.value.newPassword) &&
						form.value.newPassword === form.value.confirmPassword
					: true)
		: true;
});

const loadingStore = useLoadingStore();
onMounted(() => {
	loadingStore.setLoadingShow(true);
	user
		.getUserInfoUpdate()
		.then(({ data }) => {
			form.value.userName = data.userName;
			form.value.mobile = data.mobile;
			form.value.userId = data.userId;
			form.value.advInfoReceiveAgree = data.advInfoReceiveAgree;
			loginType.value = data.loginType;

			isToggle.value = form.value.advInfoReceiveAgree === 'Y';
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
});

const router = useRouter();
const handlerClickUpdateButton = () => {
	if (!isValidation.value) {
		if (form.value.currentPassword === '')
			alertStore.open('현재 비밀번호를 입력해주세요.');
		else if (!isValidPassword(form.value.currentPassword))
			alertStore.open('비밀번호는 영문,숫자,특수문자를 조합한 8자 이상입니다.');
		else if (form.value.newPassword === '')
			alertStore.open('새 비밀번호를 입력해주세요.');
		else if (!isValidPassword(form.value.newPassword))
			alertStore.open('비밀번호는 영문,숫자,특수문자를 조합한 8자 이상입니다.');
		else if (form.value.newPassword !== form.value.confirmPassword)
			alertStore.open('새 비밀번호와 새 비밀번호 확인이 다릅니다.');
		return false;
	}
	loadingStore.setLoadingShow(true);

	const formData = {
		userId: form.value.userId,
		advInfoReceiveAgree: isToggle.value ? 'Y' : 'N',
		currentPassword: form.value.currentPassword,
		newPassword: form.value.newPassword,
	};

	user
		.setUserInfoUpdate(formData)
		.then(() => {
			alertStore.open('정보가 변경되었습니다.');
			router.go(-1);
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};
</script>

<style lang="scss" scoped>
.update-form {
	padding: 24px 28px 74px;
}
.update-toggle {
	display: flex;
	justify-content: space-between;
	align-items: center;
	& > p {
		color: #252525;
	}
}
</style>
