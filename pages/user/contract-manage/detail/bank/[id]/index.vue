<template>
	<ContractManageDetailPage :tid="route.params.id" ins="bank" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import ContractManageDetailPage from '~/components/page/ContractManageDetailPage.vue';

definePageMeta({
	middleware: 'bank-auth',
});

const route = useRoute();
</script>
