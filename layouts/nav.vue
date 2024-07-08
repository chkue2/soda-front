<template>
	<div class="app">
		<div class="wrapper">
			<slot name="body"> </slot>
		</div>
		<FooterNav />
	</div>
	<MoveToLoginConfirmModal
		v-if="confirmStore.isConfirmShow"
		@close-modal="confirmStore.setConfirmShow(false)"
	/>
	<LoadingModal v-if="loadingStore.isLoading" />
</template>
<script setup>
import { onMounted } from 'vue';

import FooterNav from '~/components/layout/FooterNav.vue';
import LoadingModal from '~/components/modal/LoadingModal.vue';
import MoveToLoginConfirmModal from '~/components/modal/MoveToLoginConfirmModal.vue';

import { useAuthStore } from '~/store/auth.js';
import { useConfirmStore } from '~/store/confirm.js';
import { useLoadingStore } from '~/store/loading.js';

const confirmStore = useConfirmStore();
const loadingStore = useLoadingStore();

const useAuth = useAuthStore();

onMounted(() => {
	useAuth.initialize();
});
</script>
