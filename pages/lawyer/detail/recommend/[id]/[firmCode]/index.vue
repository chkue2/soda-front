<template>
	<LawyerDetailPage type="recommend" ins="bank" />
</template>

<script setup>
import LawyerDetailPage from '~/components/page/LawyerDetailPage.vue';

definePageMeta({
	middleware: 'bank-auth',
});
</script>
