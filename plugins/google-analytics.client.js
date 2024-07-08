export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.hook('page:finish', page => {
		if (process.env.NODE_ENV === 'production') {
			gtag('event', 'page_view', {
				page_path: page.fullPath,
				page_title: document.title,
			});
		}
	});
});
