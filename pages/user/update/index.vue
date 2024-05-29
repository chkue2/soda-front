<template>
	<HeaderClose title="내 정보 수정하기" />
	<div class="update-form">
		<div class="update-toggle mb37">
			<p>광고성정보 수신동의</p>
			<ToggleButton :is-toggle="isToggle" @click-toggle="handlerClickToggle" />
		</div>
		<p class="input-form-title mb11">이름</p>
		<div class="form-readonly-box mb10">
			<input type="text" readonly />
		</div>
		<p class="input-form-title mb11">
			휴대전화번호<span>휴대전화번호 변경은 고객센터로 문의</span>
		</p>
		<div class="form-readonly-box mb10">
			<input type="tel" readonly />
		</div>
		<p class="input-form-title mb11">아이디</p>
		<div class="form-readonly-box mb37">
			<input type="text" readonly />
		</div>
		<p class="input-form-title mb11">현재 비밀번호</p>
		<div class="form-input mb37">
			<input type="password" placeholder="비밀번호를 입력하세요" />
		</div>
		<p class="input-form-title mb11">
			새비밀번호<span>영문,숫자,특수문자를 조합한 8자 이상</span>
		</p>
		<div class="form-input mb10">
			<input type="password" placeholder="새 비밀번호를 입력하세요" />
		</div>
		<div class="form-input mb10">
			<input type="password" placeholder="새 비밀번호를 한번 더 입력하세요" />
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton title="수정하기" />
	</div>
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ToggleButton from '~/components/button/ToggleButton.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const isToggle = ref(false);
const handlerClickToggle = () => {
	isToggle.value = !isToggle.value;
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
