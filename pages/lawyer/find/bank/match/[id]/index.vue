<template>
	<LawyerFindMatchPage :tid="route.params.id" ins="bank" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import LawyerFindMatchPage from '~/components/page/LawyerFindMatchPage.vue';

definePageMeta({
	middleware: 'bank-auth',
});

const route = useRoute();
</script>
