<template>
	<div class="app">
		<slot />
		<MoveToLoginConfirmModal
			v-if="confirmStore.isConfirmShow"
			@close-modal="confirmStore.setConfirmShow(false)"
		/>
		<LoadingModal v-if="loadingStore.isLoading" />
	</div>
</template>

<script setup>
import LoadingModal from '~/components/modal/LoadingModal.vue';
import MoveToLoginConfirmModal from '~/components/modal/MoveToLoginConfirmModal.vue';

import { useConfirmStore } from '~/store/confirm.js';
import { useLoadingStore } from '~/store/loading.js';

const confirmStore = useConfirmStore();
const loadingStore = useLoadingStore();
</script>
