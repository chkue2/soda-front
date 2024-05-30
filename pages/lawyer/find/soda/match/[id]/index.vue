<template>
	<LawyerFindMatchPage :tid="route.params.id" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import LawyerFindMatchPage from '~/components/page/LawyerFindMatchPage.vue';

definePageMeta({
	middleware: 'auth',
});

const route = useRoute();
</script>
