<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="location-setting-container">
				<img src="/img/cow/cow-find.png" class="setting-cow-image" />
				<p class="setting-title"><b>거래대상 소재지</b>를 설정해주세요!</p>
				<p class="setting-content">
					잔금일 당일, 수월한 업무 수행을 위해서는 거래대상 소재지에서 가까운
					거리에 있는 법무사와 매칭하는 것이 좋습니다.
				</p>
				<div class="setting-select-container mt24">
					<select v-model="selectedAddress.sido" @change="handlerChangeSido">
						<option value="">시/도</option>
						<option
							v-for="(sido, index) in locationStore.sidoEnums"
							:key="index"
							:value="sido.label"
						>
							{{ sido.label }}
						</option>
					</select>
					<select v-model="selectedAddress.gugun" @change="handlerChangeGugun">
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
				<div class="setting-select-container mt10 mb34">
					<select v-model="selectedAddress.dong" @change="handlerChangeDong">
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
				<button class="setting-button" @click="setAddress">설정하기</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CommonModal from '~/components/modal/CommonModal.vue';
import { useLocationStore } from '~/store/location.js';

const locationStore = useLocationStore();

const props = defineProps({
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

const selectedAddress = ref({ ...props.address });

onMounted(() => {
	locationStore.getSido();
	if (props.address.sido !== '') {
		locationStore.getGugun(props.address.sido);
	}
	if (props.address.gugun !== '') {
		locationStore.getDetail(props.address.sido, props.address.gugun);
	}
});

const handlerChangeSido = () => {
	locationStore.getGugun(selectedAddress.value.sido);
	selectedAddress.value.gugun = '';
	selectedAddress.value.dong = '';
	locationStore.setLocationCode('');
};

const handlerChangeGugun = () => {
	locationStore.getDetail(
		selectedAddress.value.sido,
		selectedAddress.value.gugun,
	);
	selectedAddress.value.dong = '';
	locationStore.setLocationCode('');
};

const handlerChangeDong = () => {
	const code = locationStore.detailEnums.filter(
		d => d.label === selectedAddress.value.dong,
	)[0].code;

	selectedAddress.value.locationCode = code;
};

const emit = defineEmits(['set-address', 'call-api', 'close-modal']);
const setAddress = () => {
	if (selectedAddress.value.dong === '') {
		alert('동/읍/면까지 모두 선택해야 조회 가능합니다.');
		return false;
	}
	emit('set-address', selectedAddress.value);
	emit('call-api');
	closeModal();
};
const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.location-setting-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px 13px;
}
.setting-cow-image {
	width: auto;
	height: 181px;
	margin: 0px 0 26px;
}
.setting-title {
	font-size: 18px;
	font-weight: $ft-bold;
	color: #54595e;
	margin-bottom: 8px;
	& > b {
		color: #29cdff;
	}
}
.setting-content {
	font-size: 14px;
	line-height: 21px;
	color: #53595e;
	text-align: center;
	word-break: keep-all;
}
.setting-select-container {
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
.setting-button {
	width: 100%;
	height: 44px;
	border-radius: 8px;
	background: #29cdff;
	color: #f5f5f5;
	font-size: 14px;
	font-weight: $ft-bold;
}
</style>
