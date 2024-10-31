<template>
	<HeaderClose title="1:1 문의" />
	<div class="inquiry-form">
		<p class="form-title mb11">제목</p>
		<div class="inquiry-input mb32">
			<input
				v-model="form.title"
				type="text"
				placeholder="제목을 입력하세요 (최대 20자)"
				maxlength="20"
			/>
		</div>
		<p class="form-title mb11">문의사항</p>
		<textarea
			v-model="form.memo"
			class="inquiry-area"
			placeholder="문의사항을 입력하세요"
		></textarea>
		<p class="inquiry-help-text">
			일대일문의에 문의사항을 남겨주시면<br />최대한 빠른 시일내에 상담사가
			답변드리겠습니다.
		</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="문의 남기기"
			@click-button="handlerClickApplyButton"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

import { inquiry } from '~/services/inquiry.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

definePageMeta({
	middleware: 'auth',
});

const form = ref({
	title: '',
	memo: '',
});

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const isValidation = computed(
	() => form.value.title !== '' && form.value.memo !== '',
);

const router = useRouter();

const handlerClickApplyButton = () => {
	if (!isValidation.value) {
		if (form.value.title === '') {
			alertStore.open('제목을 입력해주세요.');
		} else if (form.value.memo === '') {
			alertStore.open('문의사항을 입력해주세요.');
		}
		return false;
	}
	loadingStore.setLoadingShow(true);
	const formData = new FormData();

	formData.append('title', form.value.title);
	formData.append('memo', form.value.memo);

	inquiry
		.setInquiry(formData)
		.then(() => {
			alertStore.open(
				'일대일 문의가 작성되었습니다.\n빠른 시일내에 답변 드리겠습니다.',
			);
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
.inquiry-form {
	padding: 30px 30px 62px;
}
.inquiry-input {
	border-radius: 6px;
	padding: 13px 20px;
	border: 1px solid #dddddd;
	& > input {
		width: 100%;
		border: none;
	}
}
.inquiry-area {
	padding: 19px 14px;
	border-radius: 8px;
	border: 1px solid #dddddd;
	width: 100%;
	height: 330px;
	resize: none;
}
.inquiry-help-text {
	font-size: 13px;
	color: #949494;
	margin: 42px 0;
	text-align: center;
}
</style>
