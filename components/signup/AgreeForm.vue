<template>
	<div class="agree-form-container">
		<div class="agree-form-top">
			<img src="/img/icon/soda-home.png" alt="회원가입" />
			<p class="agree-form-top-title">고객님<br />환영합니다!</p>
		</div>
		<div class="agree-form-bottom">
			<label
				class="agree-form-label bb pt4 pb14 mb10"
				@click="handlerClickAgreeAll"
			>
				<input v-model="agreeAll" type="checkbox" />
				<i></i>
				<span><b>전체 동의하기</b></span>
			</label>
			<label class="agree-form-label pt4 pb14 mb5">
				<input v-model="agreeAdult" type="checkbox" />
				<i></i>
				<span>[필수] 만 18세 이상입니다.</span>
			</label>
			<label class="agree-form-label pt4 pb14 mb5">
				<input v-model="agreeUse" type="checkbox" />
				<i></i>
				<span>[필수] 이용약관</span>
				<button @click="toggleTermsUseModal">보기</button>
			</label>
			<label class="agree-form-label pt4 pb14 mb5">
				<input v-model="agreePolicy" type="checkbox" />
				<i></i>
				<span>[필수] 개인정보처리방침</span>
				<button @click="toggleTermsPrivacyModal">보기</button>
			</label>
			<label class="agree-form-label pt4 pb14 mb5">
				<input v-model="agreeAd" type="checkbox" />
				<i></i>
				<span>[선택] 광고성 정보 수신 동의</span>
				<button>보기</button>
			</label>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="다음"
			:progress-color="agreePass ? '#29cdff' : '#d9d9d9'"
			@click-button="handlerClickNextButton"
		/>
	</div>
	<TermsUserModal
		v-if="isTermsUseModalShow"
		@close-modal="toggleTermsUseModal"
	/>
	<TermsPrivacyModal
		v-if="isTermsPrivacyModalShow"
		@close-modal="toggleTermsPrivacyModal"
	/>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import TermsPrivacyModal from '~/components/modal/TermsPrivacyModal.vue';
import TermsUserModal from '~/components/modal/TermsUserModal.vue';

import { useSignupStore } from '~/store/signup.js';

const signupStore = useSignupStore();

const agreeAll = ref(false);
const agreeAdult = ref(false);
const agreeUse = ref(false);
const agreePolicy = ref(false);
const agreeAd = ref(false);

const isTermsPrivacyModalShow = ref(false);
const isTermsUseModalShow = ref(false);

const handlerClickAgreeAll = e => {
	e.preventDefault();

	if (agreeUse.value && agreePolicy.value && agreeAd.value) {
		agreeAdult.value = false;
		agreeUse.value = false;
		agreePolicy.value = false;
		agreeAd.value = false;
		agreeAll.value = false;
	} else {
		agreeAdult.value = true;
		agreeUse.value = true;
		agreePolicy.value = true;
		agreeAd.value = true;
		agreeAll.value = true;
	}
};

watch([agreeAdult, agreeUse, agreePolicy, agreeAd], () => {
	agreeAll.value =
		agreeAdult.value && agreeUse.value && agreePolicy.value && agreeAd.value;
});

const agreePass = computed(
	() => agreeAdult.value && agreeUse.value && agreePolicy.value,
);

const handlerClickNextButton = () => {
	if (!agreePass.value) {
		alert('필수 항목에 모두 동의해주세요.');
		return false;
	}

	signupStore.setAgree({
		agreeUse: agreeUse.value,
		agreePolicy: agreePolicy.value,
		agreeAd: agreeAd.value,
	});
	signupStore.nextStep();
};

const toggleTermsUseModal = () => {
	isTermsUseModalShow.value = !isTermsUseModalShow.value;
};
const toggleTermsPrivacyModal = () => {
	isTermsPrivacyModalShow.value = !isTermsPrivacyModalShow.value;
};
</script>

<style lang="scss" scoped>
.agree-form-container {
	padding: 72px 30px;
}
.agree-form-top {
	& > img {
		width: 134px;
		height: auto;
		margin-bottom: 14px;
	}
	.agree-form-top-title {
		font-size: 24px;
		font-weight: $ft-medium;
		color: #404040;
		line-height: 1.25;
		margin-bottom: 130px;
	}
}
.agree-form-label {
	display: flex;
	align-items: center;
	padding: 0 9px;
	position: relative;
	cursor: pointer;
	&.bb {
		border-bottom: 1px solid #e2e2e2;
	}
	& > input[type='checkbox'] {
		display: none;
		&:checked + i {
			background-image: url(/img/icon/check-circle-blue.svg);
		}
	}
	& > i {
		display: block;
		width: 18px;
		height: 18px;
		background-image: url(/img/icon/check-circle-gray.svg);
	}
	gap: 15px;
	& > span {
		font-size: 12px;
		margin-bottom: 2px;
		& > b {
			font-size: 14px;
			font-weight: $ft-bold;
		}
	}
	& > button {
		background-color: transparent;
		color: #62656c;
		font-size: 12px;
		text-decoration: underline;
		position: absolute;
		top: 6px;
		right: 15px;
	}
}
</style>
