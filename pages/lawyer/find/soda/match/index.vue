<template>
	<LawyerFindMatchPage />
</template>

<script setup>
import LawyerFindMatchPage from '~/components/page/LawyerFindMatchPage.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
