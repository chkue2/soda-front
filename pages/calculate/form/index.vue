<template>
	<NuxtLayout name="nav">
		<template #body>
			<HeaderLogo />
			<div class="form-container">
				<p class="form-title mb11">부동산 종류를 선택해주세요</p>
				<select v-model="form['type']" class="form-select mb29">
					<option value="HOUSE">주택 (아파트, 빌라, 단독주택 등)</option>
				</select>
				<p class="form-title mb11">매매대금을 입력해주세요</p>
				<div class="form-input mb11">
					<input v-model="form['price']" type="tel" placeholder="0" />
					<span>원</span>
				</div>
				<p class="form-won-text mb37 pr20">{{ won }} 원</p>
				<p class="form-title mb11">보유주택수를 선택해주세요</p>
				<select v-model="form['subjectCnt']" class="form-select mb29">
					<option value="">선택해주세요</option>
					<option value="1">1주택</option>
					<option value="2">2주택</option>
					<option value="3">3주택</option>
					<option value="4">4주택 이상</option>
				</select>
				<p class="form-title mb11">감면조항을 선택해주세요</p>
				<select v-model="form['farmTaxApply']" class="form-select mb27">
					<option value="">선택해주세요</option>
					<option value="N">전용면적 85제곱미터 이하</option>
					<option value="Y">전용면적 85제곱미터 초과</option>
				</select>
			</div>
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
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import HeaderLogo from '~/components/layout/HeaderLogo.vue';

import { CALC_FORM_DATA_KEY } from '~/assets/js/storageKeys.js';

import {
	convertToKoreanCurrency,
	keyupToLocaleString,
} from '~/assets/js/utils.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	layout: false,
});

const alertStore = useAlertStore();

onMounted(() => {
	const formStorage = window.localStorage.getItem(CALC_FORM_DATA_KEY);

	if (formStorage) {
		form.value = JSON.parse(formStorage);
	}
});

const form = ref({
	type: 'HOUSE',
	price: '',
	farmTaxApply: '',
	subjectCnt: '',
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
	if (form.value.price === '') {
		alertStore.open('매매대금을 입력해주세요');
		return false;
	} else if (form.value.subjectCnt === '') {
		alertStore.open('보유주택수를 선택해주세요');
		return false;
	} else if (form.value.farmTaxApply === '') {
		alertStore.open('감면조항을 선택해주세요');
		return false;
	}
	window.localStorage.setItem(CALC_FORM_DATA_KEY, JSON.stringify(form.value));
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
