<template>
	<div class="app">
		<slot />
		<MoveToLoginConfirmModal
			v-if="confirmStore.isConfirmShow"
			@close-modal="confirmStore.setConfirmShow(false)"
		/>
	</div>
</template>

<script setup>
import MoveToLoginConfirmModal from '~/components/modal/MoveToLoginConfirmModal.vue';

import { useConfirmStore } from '~/store/confirm.js';

const confirmStore = useConfirmStore();
</script>
