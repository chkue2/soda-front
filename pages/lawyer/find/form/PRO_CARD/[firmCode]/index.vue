<template>
	<HeaderClose title="등기프로 찾기" />
	<LawyerFindForm mode="PRO_CARD" :firm-code="route.params.firmCode" />
</template>

<script setup>
import { useRoute } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import LawyerFindForm from '~/components/form/LawyerFindForm.vue';

definePageMeta({
	middleware: 'auth',
});

const route = useRoute();
</script>
