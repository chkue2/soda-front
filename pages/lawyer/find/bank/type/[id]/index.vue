<template>
	<LawyerFindTypePage
		ins="bank"
		@click-apply-button="handlerClickApplyButton"
	/>
</template>

<script setup>
import { useRouter } from 'vue-router';

import LawyerFindTypePage from '~/components/page/LawyerFindTypePage.vue';

import { LAWYER_FIND_TYPE_KEY } from '~/assets/js/storageKeys.js';

definePageMeta({
	middleware: 'bank-auth',
});

const router = useRouter();

const handlerClickApplyButton = (type, amount) => {
	window.localStorage.setItem(
		LAWYER_FIND_TYPE_KEY,
		JSON.stringify({
			type,
			amount,
		}),
	);
	router.push(`/lawyer/find/bank/ESTIMATE/preview`);
};
</script>
