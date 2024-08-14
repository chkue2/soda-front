import { onMounted, onBeforeUnmount } from 'vue';
import { pageLeave } from '~/assets/js/pageLeave.js';

export function usePageLeave() {
	onMounted(() => {
		window.addEventListener('visibilitychange', pageLeave);
	});

	onBeforeUnmount(() => {
		window.removeEventListener('visibilitychange', pageLeave);
	});
}
