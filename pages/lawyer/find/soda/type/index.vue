<template>
	<LawyerFindTypePage @click-apply-button="handlerClickApplyButton" />
</template>

<script setup>
import { useRouter } from 'vue-router';

import LawyerFindTypePage from '~/components/page/LawyerFindTypePage.vue';

import { LAWTER_FIND_TYPE_KEY } from '~/assets/js/storageKeys.js';

definePageMeta({
	middleware: 'auth',
});

const router = useRouter();

const handlerClickApplyButton = (type, amount) => {
	window.localStorage.setItem(
		LAWTER_FIND_TYPE_KEY,
		JSON.stringify({
			type,
			amount,
		}),
	);
	router.push('/lawyer/find/ESTIMATE/preview');
};
</script>
