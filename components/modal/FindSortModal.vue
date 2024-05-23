<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<ul class="sort-list">
				<li>
					<button
						:class="{ active: props.sort === 'default' }"
						@click="handlerClickSortButton('default')"
					>
						기본순
					</button>
				</li>
				<li>
					<button
						:class="{ active: props.sort === 'distance' }"
						@click="handlerClickSortButton('distance')"
					>
						거리순
					</button>
				</li>
				<li>
					<button
						:class="{ active: props.sort === 'review' }"
						@click="handlerClickSortButton('review')"
					>
						리뷰많은
					</button>
				</li>
				<li>
					<button
						:class="{ active: props.sort === 'rate' }"
						@click="handlerClickSortButton('rate')"
					>
						평점순
					</button>
				</li>
			</ul>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const props = defineProps({
	sort: {
		type: String,
		default: 'default',
	},
});

const emit = defineEmits(['set-sort', 'close-modal']);

const handlerClickSortButton = val => {
	emit('set-sort', val);
	closeModal();
};

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.sort-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 24px;
	gap: 18px;
	button {
		font-size: 15px;
		color: #000000;
		&.active {
			color: #29cdff;
		}
	}
}
</style>
