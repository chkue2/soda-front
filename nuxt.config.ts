// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			script: [
				{
					src: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
				},
			],
		},
	},
	devtools: { enabled: true },
	ssr: false,
	modules: ['@pinia/nuxt', '@nuxtjs/eslint-module'],
	css: ['~/assets/scss/_style.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "~/assets/scss/_variables.scss";`,
				},
			},
		},
	},
});
