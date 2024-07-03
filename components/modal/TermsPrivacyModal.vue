<template>
	<TermsContainerModal title="개인정보처리방침" @close-modal="closeModal">
	</TermsContainerModal>
</template>

<script setup>
import TermsContainerModal from '~/components/modal/TermsContainerModal.vue';

const emit = defineEmits(['close-modal']);

const closeModal = () => {
	emit('close-modal');
};
</script>
