<template>
	<HeaderClose title="아이디 찾기" />
	<div class="find-container mb56">
		<p class="input-form-title mb5">휴대전화번호</p>
		<div class="form-readonly-box mb10">
			<input
				v-model="form.phone"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
			<button @click="handlerClickSelfIdentification">본인인증</button>
		</div>
		<p class="input-form-title mb5">이름</p>
		<div class="form-readonly-box mb40">
			<input
				v-model="form.name"
				type="text"
				readonly
				placeholder="본인인증 후 자동입력"
			/>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton title="아이디 찾기" />
	</div>
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { signup } from '~/services/signup.js';

const form = ref({
	name: '',
	phone: '',
});

onMounted(() => {
	const receiveData = async e => {
		if (e.data.name) {
			form.value.name = e.data.name;
			form.value.phone = e.data.phone;
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
			console.log(e);
			alert(e.response.data.message);
		});
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/form/find.scss';
</style>
