<template>
	<CommonModal title="상세필터" @close-modal="closeModal">
		<template #modal-body>
			<div class="filter-container">
				<div class="filter-tag-container">
					<div class="filter-tags">
						<p class="tags-title">경력</p>
						<div class="tags-contents">
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('1') }"
								@click="handlerClickCareer('1')"
								>경력무관</span
							>
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('2') }"
								@click="handlerClickCareer('2')"
								>5년이상</span
							>
							<span
								class="filter-tag"
								:class="{ active: careersValue.includes('3') }"
								@click="handlerClickCareer('3')"
								>10년이상</span
							>
						</div>
					</div>
					<div class="filter-tags">
						<p class="tags-title">대표배지</p>
						<div class="tags-contents">
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('1') }"
								@click="handlerClickBadge('1')"
								>배상책임보험가입</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('2') }"
								@click="handlerClickBadge('2')"
								>고객평점우수</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('3') }"
								@click="handlerClickBadge('3')"
								>시간엄수</span
							>
							<span
								class="filter-tag"
								:class="{ active: badgesValue.includes('4') }"
								@click="handlerClickBadge('4')"
								>친절함</span
							>
						</div>
					</div>
				</div>
				<p class="filter-title">지역</p>
				<div class="filter-select-container">
					<select v-model="addressValue.sido">
						<option value="">시/도</option>
						<option value="서울특별시">서울특별시</option>
					</select>
					<select v-model="addressValue.gungu">
						<option value="">군/구</option>
						<option value="도봉구">도봉구</option>
					</select>
				</div>
				<div class="filter-select-container mt10 mb48">
					<select v-model="addressValue.dong">
						<option value="">동/읍/면</option>
						<option value="도봉동">도봉동</option>
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

const emit = defineEmits([
	'close-modal',
	'set-careers',
	'set-badges',
	'set-address',
]);
const closeModal = () => {
	emit('close-modal');
};

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
				gungu: '',
				dong: '',
			};
		},
	},
});

const careersValue = ref([]);
const badgesValue = ref([]);
const addressValue = ref({
	sido: '',
	gungu: '',
	dong: '',
});

onMounted(() => {
	careersValue.value = [...props.careers];
	badgesValue.value = [...props.badges];
	addressValue.value = { ...props.address };
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

const handlerClickResetButton = () => {
	careersValue.value = [];
	badgesValue.value = [];
	addressValue.value = {
		sido: '',
		gungu: '',
		dong: '',
	};
};

const handlerClickApplyButton = () => {
	emit('set-careers', careersValue.value);
	emit('set-badges', badgesValue.value);
	emit('set-address', addressValue.value);
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
	padding: 0 35px;
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
