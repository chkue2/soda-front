<template>
	<ContractManageDetailPage :tid="route.params.id" ins="bank" />
</template>

<script setup>
import { onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import ContractManageDetailPage from '~/components/page/ContractManageDetailPage.vue';

import { BANK_ID_KEY, BANK_AUTH_KEY } from '~/assets/js/storageKeys.js';

definePageMeta({
	middleware: 'bank-auth',
});

const route = useRoute();

onBeforeUnmount(() => {
	window.localStorage.removeItem(BANK_ID_KEY);
	window.localStorage.removeItem(BANK_AUTH_KEY);
});
</script>
