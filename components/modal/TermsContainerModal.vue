<template>
	<CommonModal :title="props.title" @close-modal="closeModal">
		<template #modal-body>
			<div class="terms-container">
				<slot name="body" />
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const props = defineProps({
	title: {
		type: String,
		default: '',
	},
});
const emit = defineEmits(['close-modal']);

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.terms-title {
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.terms-container {
	padding: 12px;
}
</style>
