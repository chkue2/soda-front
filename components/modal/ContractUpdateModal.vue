<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="update-modal-container">
				<p class="update-modal-subtitle">확인하고 입력해주세요</p>
				<p class="update-modal-title">계약정보 수정</p>
				<p class="form-title mb11">목적물 소재지</p>
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
				<p class="form-title mb11">잔금일자</p>
				<div class="form-input mb27">
					<input v-model="form['bDate']" type="date" />
				</div>
				<p class="form-title mb11">매매대금을 입력해주세요</p>
				<div class="form-input mb11">
					<input v-model="form['price']" type="tel" placeholder="0" />
					<span>원</span>
				</div>
				<p class="form-title mt14 mb11">계약서 사진 업로드</p>
				<div
					class="form-input input-file mb11"
					@click="handlerClickContractFile"
				>
					<input
						ref="contractFile"
						type="file"
						@change="handlerChangeContractFile"
					/>
					<p>{{ contractFileText }}</p>
					<img src="/img/icon/folder-black.svg" />
				</div>
				<p class="form-help-text">주민번호 뒷자리는 가려서 올려주세요</p>
				<div class="update-bottom-buttons">
					<button class="close-button" @click="closeModal">닫기</button>
					<button class="update-button">수정하기</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import CommonModal from '~/components/modal/CommonModal.vue';

import {
	keyupToLocaleString,
	convertToKoreanCurrency,
} from '~/assets/js/utils.js';

const form = ref({
	bDate: '',
	address: '',
	detailAddress: '',
	price: '',
	contract: null,
});
const won = ref('');

const emit = defineEmits(['close-modal']);

watch(
	() => form.value.price,
	() => {
		form.value.price = keyupToLocaleString(form.value.price);
		won.value = convertToKoreanCurrency(form.value.price.replace(/,/gi, ''));
	},
);

const validateCount = computed(
	() => Object.values(form.value).filter(v => v !== '' && v !== null).length,
);

const isValidation = computed(
	() => validateCount.value === Object.values(form.value).length,
);

const handlerClickSearchAddress = () => {
	new window.daum.Postcode({
		onComplete: function (data) {
			form.value.address = data.roadAddress;
		},
	}).open();
};

const contractFile = ref(null);
const handlerClickContractFile = () => {
	contractFile.value.click();
};
const handlerChangeContractFile = e => {
	const files = e.target.files;
	if (files.length === 0) return false;

	form.value.contract = files[0];
};
const contractFileText = computed(() =>
	!form.value.contract
		? '파일업로드'
		: typeof form.value.contract === 'object'
			? form.value.contract.name
			: form.value.contract,
);

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.update-modal-container {
	padding: 0 25px 28px;
}
.update-modal-subtitle {
	font-size: 14px;
	color: #707070;
	font-weight: $ft-medium;
	text-align: center;
}
.update-modal-title {
	font-weight: $ft-bold;
	text-align: center;
	margin: 23px 0 43px;
}
.update-bottom-buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	margin-top: 24px;
	& > button {
		flex: 1;
		height: 44px;
		border-radius: 8px;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #ffffff;
		&.close-button {
			background-color: #d9d9d9;
		}
		&.update-button {
			background-color: #29cdff;
		}
	}
}
</style>
