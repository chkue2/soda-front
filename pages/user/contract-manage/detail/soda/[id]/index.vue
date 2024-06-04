<template>
	<ContractManageDetailPage :tid="route.params.id" ins="soda" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import ContractManageDetailPage from '~/components/page/ContractManageDetailPage.vue';

definePageMeta({
	middleware: 'auth',
});

const route = useRoute();
</script>
