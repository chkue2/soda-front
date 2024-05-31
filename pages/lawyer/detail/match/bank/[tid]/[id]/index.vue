<template>
	<LawyerDetailPage type="match" ins="bank" />
</template>

<script setup>
import { onBeforeUnmount } from 'vue';

import LawyerDetailPage from '~/components/page/LawyerDetailPage.vue';

import { BANK_ID_KEY, BANK_AUTH_KEY } from '~/assets/js/storageKeys.js';

onBeforeUnmount(() => {
	window.localStorage.removeItem(BANK_ID_KEY);
	window.localStorage.removeItem(BANK_AUTH_KEY);
});
</script>
