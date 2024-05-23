<template>
	<div class="expert-list-item" @click="handlerClickItem">
		<img class="expert-profile" :src="imageUrl" />
		<div>
			<p class="expert-office-name">
				<span>{{ props.item.firmName }}</span>
			</p>
			<ExpertTagsItem :badge="props.item.badge || []" />
			<ExpertOptionsItem :badge="props.item.badge || []" />
			<div class="expert-rate">
				<img src="/img/icon/star-yellow-02.svg" />
				<p>{{ (props.item.firmAvgStar || 0).toFixed(1) }}</p>
			</div>
			<div class="expert-info">
				<p class="expert-distance">{{ props.item.distance_km }} Km</p>
				<div class="expert-location">
					<img src="/img/icon/location-gray.svg" />
					<p>{{ props.item.sido }} {{ props.item.gugun }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import ExpertTagsItem from '~/components/item/ExpertTagsItem.vue';
import ExpertOptionsItem from '~/components/item/ExpertOptionsItem.vue';

const props = defineProps({
	item: {
		type: Object,
		default: () => {
			return { profileFileUrl: '' };
		},
	},
});

const imageUrl = computed(() =>
	props.item.profileFileUrl !== undefined && props.item.profileFileUrl
		? `${useRuntimeConfig().public.apiURL}${props.item.profileFileUrl}`
		: '',
);

const router = useRouter();
const handlerClickItem = () => {
	router.push(`/lawyer/detail/${props.item.firmCode}`);
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/item/profile.scss';
.expert-list-item {
	display: flex;
	gap: 14px;
	align-items: center;
	cursor: pointer;
	& > div {
		flex: 1;
	}
}
.expert-profile {
	width: 104px;
	height: 104px;
	border: 1px solid #dde0e3;
	border-radius: 16px;
}
.expert-office-name {
	display: table;
	table-layout: fixed;
	width: 100%;
	& > span {
		display: table-cell;
		font-weight: $ft-medium;
		line-height: 23px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.expert-location {
	display: flex;
	align-items: center;
	gap: 2px;
	margin: 2px 0 4px;
	& > p {
		line-height: 16px;
		font-size: 11px;
		color: #62656c;
	}
}
.expert-info {
	display: flex;
	align-items: center;
	gap: 10px;
}
.expert-distance {
	font-size: 12px;
	font-weight: $ft-medium;
}
.expert-rate {
	display: flex;
	align-items: center;
	gap: 2px;
	& > p {
		font-size: 12px;
		color: #555a62;
	}
}
</style>
