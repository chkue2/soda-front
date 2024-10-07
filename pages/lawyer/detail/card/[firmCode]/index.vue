<template>
	<LawyerDetailPage type="card" />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import LawyerDetailPage from '~/components/page/LawyerDetailPage.vue';

import { LAWYER_FIND_SENDER_KEY } from '~/assets/js/storageKeys.js';

const route = useRoute();

onMounted(() => {
	const sender = route.query.sender;
	if (sender) {
		window.localStorage.setItem(LAWYER_FIND_SENDER_KEY, sender);
	}
});
</script>
