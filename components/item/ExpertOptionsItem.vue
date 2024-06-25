<template>
	<div class="expert-options" :class="{ 'align-center': align === 'center' }">
		<span v-if="props.badge.includes('APPEAL_01')" class="text--red"
			>주말응대가능</span
		>
		<span v-if="props.badge.includes('APPEAL_02')"
			><img src="/img/icon/quick-icon.svg" alt="빠른응답" />빠른응답</span
		>
		<span v-if="props.badge.includes('APPEAL_03')"
			><img src="/img/icon/good-icon.svg" alt="친절해요" />친절해요</span
		>
		<span v-if="props.badge.includes('APPEAL_04')"
			><img src="/img/icon/smile-icon.svg" alt="공감하는" />공감하는</span
		>
		<span v-if="props.badge.includes('APPEAL_05')"
			><img src="/img/icon/message-icon.svg" alt="꼼꼼한" />꼼꼼한</span
		>
	</div>
</template>

<script setup>
const props = defineProps({
	badge: {
		type: Array,
		default: () => [],
	},
	align: {
		type: String,
		default: '',
	},
});
</script>

<style scoped>
@import '~/assets/scss/item/profile.scss';
</style>
