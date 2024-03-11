<template>
	<CommonModal title="상세필터" @close-modal="closeModal">
		<template #modal-body>
			<div class="filter-container">
				<div class="filter-tag-container">
					<div class="filter-tags">
						<p class="tags-title">경력</p>
						<div class="tags-contents">
							<span class="filter-tag active">경력무관</span>
							<span class="filter-tag">5년이상</span>
							<span class="filter-tag">10년이상</span>
						</div>
					</div>
					<div class="filter-tags">
						<p class="tags-title">대표배지</p>
						<div class="tags-contents">
							<span class="filter-tag active">배상책임보험가입</span>
							<span class="filter-tag">고객평점우수</span>
							<span class="filter-tag">시간엄수</span>
							<span class="filter-tag">친절함</span>
						</div>
					</div>
				</div>
				<p class="filter-title">지역</p>
				<div class="filter-select-container">
					<select>
						<option value="">시/도</option>
					</select>
					<select>
						<option value="">군/구</option>
					</select>
				</div>
				<div class="filter-buttons">
					<button class="reset-button">초기화</button>
					<button class="apply-button">적용하기</button>
				</div>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import CommonModal from '~/components/modal/CommonModal.vue';

const emit = defineEmits(['close-modal']);
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
	margin: 17px 0 77px;
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
