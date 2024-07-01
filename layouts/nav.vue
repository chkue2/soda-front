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
import { onBeforeMount, onMounted } from 'vue';

import FooterNav from '~/components/layout/FooterNav.vue';
import LoadingModal from '~/components/modal/LoadingModal.vue';
import MoveToLoginConfirmModal from '~/components/modal/MoveToLoginConfirmModal.vue';

import { useAuthStore } from '~/store/auth.js';
import { useConfirmStore } from '~/store/confirm.js';
import { useLoadingStore } from '~/store/loading.js';

const confirmStore = useConfirmStore();
const loadingStore = useLoadingStore();

const useAuth = useAuthStore();

onBeforeMount(() => {
	if (process.env.NODE_ENV === 'production') {
		const script = document.createElement('script');
		script.src = `https://www.googletagmanager.com/gtag/js?id=${useRuntimeConfig().public.GA_TRACKING_ID}`;
		script.async = true;
		document.head.appendChild(script);

		window.dataLayer = window.dataLayer || [];
		function gtag() {
			window.dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', useRuntimeConfig().public.GA_TRACKING_ID, {
			anonymize_up: true,
		});
	}
});

onMounted(() => {
	useAuth.initialize();
});
</script>
