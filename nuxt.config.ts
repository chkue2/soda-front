// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
				},
			],
			script: [
				{
					src: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
				},
			],
		},
	},
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiURL: process.env.API_URL,
		},
	},
	plugins: ['~/plugins/router.js'],
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
