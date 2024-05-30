<template>
	<LawyerDetailPage type="match" />
</template>

<script setup>
import LawyerDetailPage from '~/components/page/LawyerDetailPage.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
