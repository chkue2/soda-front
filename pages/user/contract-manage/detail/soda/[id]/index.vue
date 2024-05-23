<template>
	<ContractManageDetailPage />
</template>

<script setup>
import ContractManageDetailPage from '~/components/page/ContractManageDetailPage.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
