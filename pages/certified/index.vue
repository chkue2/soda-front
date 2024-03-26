<template>
	<HeaderClose title="본인확인" />
	<div class="certified-form">
		<p class="form-title text-center mb11">휴대전화 뒤의 4자리를 입력하세요</p>
		<input
			v-model="form.phone"
			type="password"
			class="form-input mb35"
			placeholder="휴대전화 뒤의 4자리"
			maxlength="4"
		/>
		<p class="form-title text-center mb11">대출받은 은행을 선택하세요</p>
		<select v-model="form.bank" class="form-select mb42">
			<option value="">은행 선택</option>
			<option value="kbank">케이뱅크</option>
		</select>
		<p class="form-warning">입력하신 정보를 다시 한번 확인해주세요!</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="본인확인"
			:progress-width="(validateCount / 2) * 100"
			@click-button="handlerClickNextButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const form = ref({
	phone: '',
	bank: '',
});

const validateCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);

const router = useRouter();
const handlerClickNextButton = () => {
	router.push('/lawyer/find/type');
};
</script>

<style lang="scss" scoped>
.certified-form {
	padding: 62px 30px;
}
.form-warning {
	text-align: center;
	color: #ff0c0c;
}
</style>
