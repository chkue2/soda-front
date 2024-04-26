<template>
	<div class="expert-tags" :class="{ 'align-center': align === 'center' }">
		<span v-if="props.badge.includes('TITLE_01')">예약시간준수</span>
		<span v-if="props.badge.includes('TITLE_02')">선호도 높음</span>
		<span v-if="props.badge.includes('TITLE_03')">프로중의 프로</span>
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
