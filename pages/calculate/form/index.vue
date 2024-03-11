<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderClose title="소유권이전등기 계산하기" />
			<div class="form-container">
				<p class="form-title mb11">부동산 종류를 선택해주세요</p>
				<select v-model="form['type']" class="form-select mb29">
					<option value="">선택해주세요</option>
					<option value="1">아파트</option>
				</select>
				<p class="form-title mb11">매매대금을 입력해주세요</p>
				<div class="form-input mb11">
					<input v-model="form['price']" type="tel" placeholder="0" />
					<span>원</span>
				</div>
				<p class="form-won-text mb37">{{ won }} 원</p>
				<p class="form-title mb11">감면조항을 선택해주세요</p>
				<select v-model="form['clause']" class="form-select mb27">
					<option value="">선택해주세요</option>
					<option value="1">전용면적 85제곱미터 이상</option>
				</select>
				<p class="form-title mb11">보유주택수를 선택해주세요</p>
				<select v-model="form['houses']" class="form-select mb29">
					<option value="">선택해주세요</option>
					<option value="1">1주택</option>
				</select>
			</div>
			<p class="form-count">{{ validateCount }}/4</p>
			<div class="form-bottom-buttons">
				<ProgressBackgroundButton
					title="계산하기"
					:progress-width="(validateCount / 4) * 100"
					@click-button="handlerClickCalcButton"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { watch, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import {
	keyupToLocaleString,
	convertToKoreanCurrency,
} from '~/assets/js/utils.js';

definePageMeta({
	layout: false,
});

const form = ref({
	type: '',
	price: '',
	clause: '',
	houses: '',
});
const won = ref('');

watch(
	() => form.value.price,
	() => {
		form.value.price = keyupToLocaleString(form.value.price);
		won.value = convertToKoreanCurrency(form.value.price.replace(/,/gi, ''));
	},
);

const validateCount = computed(
	() => Object.values(form.value).filter(v => v !== '').length,
);

const router = useRouter();
const handlerClickCalcButton = () => {
	router.push('/calculate/result');
};
</script>

<style lang="scss" scoped>
.form-container {
	padding: 30px;
	margin-bottom: 56px;
}
.form-bottom-buttons {
	bottom: 52px;
}
.form-count {
	bottom: 132px;
}
</style>
