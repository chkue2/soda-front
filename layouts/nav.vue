<template>
	<div class="app">
		<div class="wrapper">
			<slot name="body"> </slot>
		</div>
		<FooterNav />
	</div>
</template>
<script setup>
import FooterNav from '~/components/layout/FooterNav.vue';
</script>
