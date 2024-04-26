<template>
	<CommonModal title="상세필터" @close-modal="closeModal">
		<template #modal-body>
			<div class="filter-container">
				<div class="filter-tag-container">
					<div class="filter-tags">
						<p class="tags-title">획득배지</p>
						<div class="tags-contents">
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('TITLE_02') }"
								@click="handlerClickCareer('TITLE_02')"
								>프로중의 프로</span
							>
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('TITLE_01') }"
								@click="handlerClickCareer('TITLE_01')"
								>선호도 높음</span
							>
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('TITLE_03') }"
								@click="handlerClickCareer('TITLE_03')"
								>예약시간준수</span
							>
						</div>
					</div>
					<div class="filter-tags">
						<p class="tags-title">어필배지</p>
						<div class="tags-contents">
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('APPEAL_01') }"
								@click="handlerClickBadge('APPEAL_01')"
								>주말응대가능</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('APPEAL_02') }"
								@click="handlerClickBadge('APPEAL_02')"
								>빠른응답</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('APPEAL_03') }"
								@click="handlerClickBadge('APPEAL_03')"
								>공감하는</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('APPEAL_04') }"
								@click="handlerClickBadge('APPEAL_04')"
								>꼼꼼해요</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('APPEAL_05') }"
								@click="handlerClickBadge('APPEAL_05')"
								>친절해요</span
							>
						</div>
					</div>
				</div>
				<p class="filter-title">지역</p>
				<div class="filter-select-container">
					<select v-model="addressValue.sido" @change="handlerChangeSido">
						<option value="">시/도</option>
						<option
							v-for="(sido, index) in locationStore.sidoEnums"
							:key="index"
							:value="sido.label"
						>
							{{ sido.label }}
						</option>
					</select>
					<select v-model="addressValue.gugun" @change="handlerChangeGugun">
						<option value="">군/구</option>
						<option
							v-for="(gugun, index) in locationStore.gugunEnums"
							:key="index"
							:value="gugun.label"
						>
							{{ gugun.label }}
						</option>
					</select>
				</div>
				<div class="filter-select-container mt10 mb48">
					<select v-model="addressValue.dong" @change="handlerChangeDong">
						<option value="">동/읍/면</option>
						<option
							v-for="(dong, index) in locationStore.detailEnums"
							:key="index"
							:value="dong.label"
						>
							{{ dong.label }}
						</option>
					</select>
				</div>
				<div class="filter-buttons">
					<button class="reset-button" @click="handlerClickResetButton">
						초기화
					</button>
					<button class="apply-button" @click="handlerClickApplyButton">
						적용하기
					</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommonModal from '~/components/modal/CommonModal.vue';
import { useLocationStore } from '~/store/location.js';

const locationStore = useLocationStore();

const emit = defineEmits([
	'close-modal',
	'set-careers',
	'set-badges',
	'set-address',
]);

const props = defineProps({
	careers: {
		type: Array,
		default: () => [],
	},
	badges: {
		type: Array,
		default: () => [],
	},
	address: {
		type: Object,
		default: () => {
			return {
				sido: '',
				gugun: '',
				dong: '',
				locationCode: '',
			};
		},
	},
});

const careersValue = ref([...props.careers]);
const badgesValue = ref([...props.badges]);
const addressValue = ref({ ...props.address });

onMounted(() => {
	locationStore.getSido();
	if (props.address.sido !== '') {
		locationStore.getGugun(props.address.sido);
	}
	if (props.address.gugun !== '') {
		locationStore.getDetail(props.address.sido, props.address.gugun);
	}
});

const handlerClickCareer = val => {
	if (careersValue.value.includes(val)) {
		careersValue.value = careersValue.value.filter(v => v !== val);
	} else {
		careersValue.value.push(val);
	}
};
const handlerClickBadge = val => {
	if (badgesValue.value.includes(val)) {
		badgesValue.value = badgesValue.value.filter(v => v !== val);
	} else {
		badgesValue.value.push(val);
	}
};

const handlerChangeSido = () => {
	locationStore.getGugun(addressValue.value.sido);
	addressValue.value.gugun = '';
	addressValue.value.dong = '';
	locationStore.setLocationCode('');
};

const handlerChangeGugun = () => {
	locationStore.getDetail(addressValue.value.sido, addressValue.value.gugun);
	addressValue.value.dong = '';
	locationStore.setLocationCode('');
};

const handlerChangeDong = () => {
	const code = locationStore.detailEnums.filter(
		d => d.label === addressValue.value.dong,
	)[0].code;

	addressValue.value.locationCode = code;
};

const handlerClickResetButton = () => {
	careersValue.value = [];
	badgesValue.value = [];
	addressValue.value = {
		sido: '',
		gugun: '',
		dong: '',
		locationCode: '',
	};
};

const handlerClickApplyButton = () => {
	emit('set-careers', careersValue.value);
	emit('set-badges', badgesValue.value);
	emit('set-address', addressValue.value);
	emit('close-modal');
};

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.filter-container {
	padding: 100px 16px 13px;
}
.filter-tag-container {
	display: flex;
	flex-direction: column;
	gap: 52px;
	padding: 0 20px;
}
.filter-tags {
	display: flex;
	gap: 28px;
	.tags-title {
		font-size: 14px;
		font-weight: $ft-bold;
	}
	.tags-contents {
		flex: 1;
		display: flex;
		column-gap: 32px;
		row-gap: 24px;
		flex-wrap: wrap;
	}
	.filter-tag {
		cursor: pointer;
		font-size: 14px;
		&.active {
			font-weight: $ft-bold;
			text-decoration: underline;
		}
	}
}
.filter-title {
	margin: 24px 0 17px;
	font-size: 14px;
	font-weight: $ft-bold;
}
.filter-select-container {
	display: flex;
	gap: 9px;
	width: 100%;
	& > select {
		flex: 1;
		height: 44px;
		border-radius: 8px;
		border: 1px solid #e9eff2;
		box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.04);
		padding-left: 16px;
	}
}
.filter-buttons {
	display: flex;
	flex-direction: column;
	gap: 24px;
	.reset-button {
		font-size: 14px;
		color: #919191;
	}
	.apply-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 44px;
		border-radius: 8px;
		background-color: #29cdff;
		font-size: 14px;
		font-weight: $ft-bold;
		color: #f5f5f5;
	}
}
</style>
