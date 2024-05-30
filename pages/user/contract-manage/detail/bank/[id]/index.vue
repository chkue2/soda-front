<template>
	<ContractManageDetailPage :tid="route.params.id" type="bank" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import ContractManageDetailPage from '~/components/page/ContractManageDetailPage.vue';

definePageMeta({
	middleware: 'bank-auth',
});

const route = useRoute();
</script>
