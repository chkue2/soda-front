<template>
	<HeaderClose title="등기프로 찾기" />
	<LawyerFindForm mode="ESTIMATE" />
</template>

<script setup>
import HeaderClose from '~/components/layout/HeaderClose.vue';
import LawyerFindForm from '~/components/form/LawyerFindForm.vue';

definePageMeta({
	middleware: 'auth',
});
</script>
