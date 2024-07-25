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
	<CustomAlertModal v-if="alertStore.isOpen" />
</template>
<script setup>
import { onMounted } from 'vue';

import FooterNav from '~/components/layout/FooterNav.vue';
import LoadingModal from '~/components/modal/LoadingModal.vue';
import MoveToLoginConfirmModal from '~/components/modal/MoveToLoginConfirmModal.vue';
import CustomAlertModal from '~/components/modal/CustomAlertModal.vue';

import { useAuthStore } from '~/store/auth.js';
import { useConfirmStore } from '~/store/confirm.js';
import { useLoadingStore } from '~/store/loading.js';
import { useAlertStore } from '~/store/alert.js';

const confirmStore = useConfirmStore();
const loadingStore = useLoadingStore();

const useAuth = useAuthStore();
const alertStore = useAlertStore();

onMounted(() => {
	useAuth.initialize();
});
</script>
