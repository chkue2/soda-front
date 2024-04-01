<template>
	<HeaderClose title="전문가 찾기" />
	<div class="form-container">
		<p class="form-title mb11">잔금일자를 선택해주세요</p>
		<div class="form-input mb27">
			<input v-model="form['bDate']" type="date" />
		</div>
		<p class="form-title mb11">목적물 소재지를 입력해주세요</p>
		<div class="form-input pointer mb11" @click="handlerClickSearchAddress">
			<input
				v-model="form['address']"
				type="text"
				class="pointer"
				readonly
				placeholder="주소를 검색해주세요"
			/>
			<img src="/img/icon/search-black.svg" />
		</div>
		<div class="form-input mb27">
			<input
				v-model="form['detailAddress']"
				type="text"
				placeholder="상세주소를 입력해주세요"
			/>
		</div>
		<p class="form-title mb11">계약일자를 선택해주세요</p>
		<div class="form-input mb27">
			<input v-model="form['cDate']" type="date" />
		</div>
		<p class="form-title mb11">매매대금을 입력해주세요</p>
		<div class="form-input mb11">
			<input v-model="form['price']" type="tel" placeholder="0" />
			<span>원</span>
		</div>
		<p class="form-won-text">{{ won }} 원</p>
	</div>
	<p class="form-count">{{ validateCount }}/5</p>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="다음"
			:progress-width="(validateCount / 5) * 100"
			@click-button="handlerClickNextButton"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import {
	keyupToLocaleString,
	convertToKoreanCurrency,
} from '~/assets/js/utils.js';

definePageMeta({
	middleware: 'auth',
});

const form = ref({
	bDate: '',
	address: '',
	detailAddress: '',
	cDate: '',
	price: '',
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

const isValidation = computed(
	() => validateCount.value === Object.values(form.value).length,
);

const handlerClickSearchAddress = () => {
	form.value.address = '경기도 안산시 단원구';
};

const router = useRouter();
const handlerClickNextButton = () => {
	if (!isValidation.value) return false;

	router.push('/lawyer/find/type');
};
</script>

<style lang="scss" scoped>
.form-container {
	padding: 30px;
	margin-bottom: 56px;
}
</style>
