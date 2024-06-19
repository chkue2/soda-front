<template>
	<LawyerDetailPage :ins="route.params.ins" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import LawyerDetailPage from '~/components/page/LawyerDetailPage.vue';

const route = useRoute();
</script>
