<template>
	<LawyerFindMatchPage :tid="route.params.id" ins="soda" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import LawyerFindMatchPage from '~/components/page/LawyerFindMatchPage.vue';

definePageMeta({
	middleware: 'auth',
});

const route = useRoute();
</script>
