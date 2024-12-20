// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'ko',
			},
			title: '등기소다 | 부동산 등기를 위한 법무사 매칭',
			meta: [
				{
					name: 'viewport',
					content:
						'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
				},
				{
					name: 'keywords',
					content: '등기대행, 부동산등기, 등기법무사',
				},
				{
					name: 'description',
					content: '부동산 등기를 위한 법무사 매칭, 등기소다',
				},
				{
					name: 'og:title',
					property: 'og:title',
					content: '등기 잘하는 등기소다',
				},
				{
					name: 'og:url',
					property: 'og:url',
					content: 'https://www.lawtalksoda.com',
				},
				{
					name: 'og:description',
					property: 'og:description',
					content: '아는사람 찾지말고 등기는 등기소다',
				},
				{
					name: 'og:image',
					property: 'og:image',
					content: 'https://www.lawtalksoda.com/img/preview/thumbnail.png',
				},
			],
			script: [
				{
					src: 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
				},
				{
					src: 'https://www.googletagmanager.com/gtag/js?id=GTM-PRNPQZTH',
					async: true,
				},
				{
					innerHTML: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'GTM-PRNPQZTH');
					`,
				},
			],
		},
	},
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			apiURL: process.env.API_URL,
			GA_TRACKING_ID: process.env.GA_TRACKING_ID,
			aesSecretKey: process.env.AES_SECRET_KEY,
		},
	},
	plugins: ['~/plugins/google-analytics.client.js'],
	ssr: false,
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/eslint-module',
		'@nuxtjs/robots',
		'@nuxtjs/sitemap',
	],
	robots: {
		userAgent: '*',
		disallow: '/contract-manage/',
		allow: '/',
	},
	site: {
		url: 'https://lawtalksoda.com',
	},
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
