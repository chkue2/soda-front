<template>
	<div></div>
</template>

<script setup>
import { onMounted } from 'vue';

import { signup } from '~/services/signup.js';

onMounted(() => {
	const urlSearch = new URLSearchParams(window.location.search);
	const encData = urlSearch.get('enc_data');
	const tokenApiId = urlSearch.get('token_version_id');
	const integrityValue = urlSearch.get('integrity_value');

	signup
		.getNiceInfo({
			encData,
			tokenApiId,
			integrityValue,
		})
		.then(({ data }) => {
			sendData(data.name, data.mobileNo, data.userIdentityKey);
		})
		.catch(e => {
			alert(e.response.data.message);
			window.close();
		});
});
const sendData = (name, phone, userIdentityKey) => {
	window.opener.postMessage({ name, phone, userIdentityKey }, '*');
	window.close();
};
</script>
