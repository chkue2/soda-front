<template>
	<div></div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
	const urlSearch = new URLSearchParams(window.location.search);
	const status = atob(urlSearch.get('status'));
	const name = atob(urlSearch.get('name'));
	const mobileNo = atob(urlSearch.get('mobileNo'));
	const userIdentityKey = atob(urlSearch.get('userIdentityKey'));
	const message = atob(urlSearch.get('message'));

	console.log(status);
	console.log(name);
	console.log(mobileNo);
	console.log(userIdentityKey);
	console.log(message);

	// 	if(status === '200') {
	// 		sendData(name, mobileNo, userIdentityKey);
	// 	} else {
	// alert('이미 가입된 이력이 있습니다.');
	// window.close();
	// 	}
});
const sendData = (name, phone, userIdentityKey) => {
	window.opener.postMessage({ name, phone, userIdentityKey }, '*');
	window.close();
};
</script>
