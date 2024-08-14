import { onMounted, onBeforeUnmount } from 'vue';
import { pageLeave } from '~/assets/js/pageLeave.js';

export function usePageLeave() {
	onMounted(() => {
		window.addEventListener('beforeunload', pageLeave);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('beforeunload', pageLeave);
	});
}
