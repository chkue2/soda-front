<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="estimate-container">
				<p class="estimate-modal-subtitle">한 눈에 보기 쉽게</p>
				<p class="estimate-modal-title">견적서</p>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">견적요약 정보</p>
						<div class="estimate-accordion-top-right">
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<div class="estimate-accordion-contents-grid">
							<p class="estimate-accordion-contents-title">등기비용</p>
							<p class="estimate-accordion-contents-text">
								{{ (summary.taxAndPaySum || 0).toLocaleString() }}
								원<br /><strong>(제세공과금+수수료)</strong>
							</p>
							<p class="estimate-accordion-contents-title">입금계좌</p>
							<p class="estimate-accordion-contents-text">
								{{ summary.estimateAccount }}
							</p>
							<p class="estimate-accordion-contents-title">대출기관</p>
							<p class="estimate-accordion-contents-text">{{ bankName }}</p>
							<p class="estimate-accordion-contents-title">대출금</p>
							<p class="estimate-accordion-contents-text">
								{{ (summary.mortgageLoan || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">대출실행금</p>
							<p class="estimate-accordion-contents-text">
								{{ (summary.mortgageExecution || 0).toLocaleString() }}
								원<br /><strong>(대출기관 기준에 따름)</strong>
							</p>
							<p class="estimate-accordion-contents-title">견적발행일</p>
							<p class="estimate-accordion-contents-text">
								{{ summary.created }}
							</p>
						</div>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">사건 정보</p>
						<div class="estimate-accordion-top-right">
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<p class="estimate-accordion-object-title">목적물</p>
						<p class="estimate-accordion-object-address">
							{{ tradeCaseInfo.estateAddr }},
							{{ tradeCaseInfo.estateRestAddr }}
						</p>
						<div class="estimate-accordion-contents-grid">
							<p class="estimate-accordion-contents-title">매수인</p>
							<p class="estimate-accordion-contents-text">
								{{ (tradeCaseInfo.buyer || []).join(', ') }}
							</p>
							<p class="estimate-accordion-contents-title">산출조건</p>
							<p class="estimate-accordion-contents-text">
								{{ tradeCaseInfo.estateCondition }}
							</p>
							<p class="estimate-accordion-contents-title">농특세</p>
							<p class="estimate-accordion-contents-text">
								{{ tradeCaseInfo.farmTaxApply }}
							</p>
							<p class="estimate-accordion-contents-title">매매대금</p>
							<p class="estimate-accordion-contents-text">
								{{ (tradeCaseInfo.tradePrice || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">시가표준액</p>
							<p class="estimate-accordion-contents-text">
								{{ (tradeCaseInfo.estimatePrice || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">채권매입금</p>
							<p class="estimate-accordion-contents-text">
								{{ (tradeCaseInfo.estimateBond || 0).toLocaleString() }} 원
							</p>
						</div>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">제세공과금</p>
						<div class="estimate-accordion-top-right">
							<span class="estimate-accordion-top-amount"
								>{{ (taxesAndDues.taxSum || 0).toLocaleString() }} 원</span
							>
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<div class="estimate-accordion-contents-grid pd-sm">
							<p class="estimate-accordion-contents-title">취득세</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.regTax || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">지방교육세</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.eduTax || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">농특세</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.farmTax || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">인지</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.goveStamp || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">중지</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.courtStamp || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">채권부담금</p>
							<p class="estimate-accordion-contents-text">
								{{ (taxesAndDues.bondPay || 0).toLocaleString() }} 원
							</p>
						</div>
						<div class="estimate-accordion-total">
							<p class="estimate-accordion-total-title">소계</p>
							<p class="estimate-accordion-total-amount">
								{{ (taxesAndDues.taxSum || 0).toLocaleString() }} 원
							</p>
						</div>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">수수료</p>
						<div class="estimate-accordion-top-right">
							<span class="estimate-accordion-top-amount"
								>{{ (fee.paySum || 0).toLocaleString() }} 원</span
							>
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<div class="estimate-accordion-contents-grid pd-sm">
							<p class="estimate-accordion-contents-title">적용수수료</p>
							<p class="estimate-accordion-contents-text">
								{{ (fee.discountedLegalPay || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">거래신고대행</p>
							<p class="estimate-accordion-contents-text">
								{{ (fee.rtmsApplyPay || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">다중매매</p>
							<p class="estimate-accordion-contents-text">
								{{ (fee.multiPay || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">수수료계</p>
							<p class="estimate-accordion-contents-text">
								{{ (fee.payedPaySum || 0).toLocaleString() }} 원
							</p>
							<p class="estimate-accordion-contents-title">부가세</p>
							<p class="estimate-accordion-contents-text">
								{{ (fee.vatLegalPay || 0).toLocaleString() }} 원
							</p>
						</div>
						<div class="estimate-accordion-total">
							<p class="estimate-accordion-total-title">소계</p>
							<p class="estimate-accordion-total-amount">
								{{ (fee.paySum || 0).toLocaleString() }} 원
							</p>
						</div>
						<p class="estimate-info-text mt25">
							기본 법정수수료(소계) :
							{{ (fee.legalFee || 0).toLocaleString() }}원 (VAT포함)
						</p>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">견적서 안내문</p>
						<div class="estimate-accordion-top-right">
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<p class="estimate-accordion-intro" v-html="infoMemo"></p>
					</div>
				</div>
				<p class="estimate-charge-info">
					{{ info.registryFirmName }} (견적담당자 :
					{{ info.estimateChargerName }} )<br /><a
						:href="`tel:${rexFormatPhone(info.registryFirmPhone)}`"
						>T. {{ rexFormatPhone(info.registryFirmPhone) }}</a
					>
				</p>
				<button class="estimate-modal-button" @click="closeModal">닫기</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

import CommonModal from '~/components/modal/CommonModal.vue';

import { tradeCase } from '~/services/tradeCase.js';
import { bankSVG } from '~/assets/js/bankSVG.js';
import { rexFormatPhone } from '~/assets/js/utils.js';

const props = defineProps({
	tid: {
		type: String,
		default: '',
	},
	ins: {
		type: String,
		default: 'soda',
	},
});

const summary = ref({});
const tradeCaseInfo = ref({});
const taxesAndDues = ref({});
const fee = ref({});
const info = ref({});

onMounted(() => {
	document.querySelectorAll('.estimate-accordion').forEach(elm => {
		elm.addEventListener('click', () => {
			elm.classList.toggle('open');
		});
	});

	tradeCase
		.getEstimate(props.tid, props.ins)
		.then(({ data }) => {
			summary.value = data.summary;
			tradeCaseInfo.value = data.tradeCaseInfo;
			taxesAndDues.value = data.taxesAndDues;
			fee.value = data.fee;
			info.value = data.info;
		})
		.catch(e => {
			alert(e.response.data.message);
			closeModal();
		});
});

const bankName = computed(() =>
	summary.value.venderId ? bankSVG[summary.value.venderId].title : '',
);
const infoMemo = computed(() =>
	(info.value.estimateMemo || '').replaceAll('\r\n', '<br>'),
);

const emit = defineEmits(['close-modal']);
const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.estimate-container {
	padding: 0 13px 20px;
}
.estimate-modal-subtitle {
	font-size: 14px;
	color: #707070;
	font-weight: $ft-medium;
	text-align: center;
}
.estimate-modal-title {
	font-weight: $ft-bold;
	text-align: center;
	margin: 23px 0 25px;
}
.estimate-modal-button {
	width: calc(100% - 16px);
	padding: 14px 0;
	border-radius: 8px;
	background-color: #000000;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
	margin: 13px 8px 0;
}
.estimate-accordion {
	box-shadow: 0px 4px 10px 0px #00000026;
	cursor: pointer;
	& + .estimate-accordion {
		margin-top: 24px;
	}
	&.open {
		.estimate-accordion-contents {
			padding: 34px 24px 48px;
			max-height: 999px;
		}
		.estimate-accordion-top-icon {
			transform: rotate(180deg);
		}
	}
}
.estimate-accordion-top {
	height: 47px;
	background-color: #d9d9d9;
	padding: 0 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.estimate-accordion-top-title {
	font-size: 14px;
	font-weight: $ft-bold;
}
.estimate-accordion-top-right {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 10px;
}
.estimate-accordion-top-amount {
	text-align: right;
	font-weight: $ft-bold;
}
.estimate-accordion-top-icon {
	width: 24px;
	height: 24px;
	transform: rotate(0deg);
	transition: transform 0.2s ease-in-out;
}
.estimate-accordion-contents {
	padding: 0 24px;
	overflow: hidden;
	max-height: 0;
	transition: all 0.3s ease-in-out;
}
.estimate-accordion-contents-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-row-gap: 7px;
	&.pd-sm {
		padding: 24px 0;
	}
}
.estimate-accordion-contents-title {
	font-size: 14px;
	color: #929292;
	text-align: left;
}
.estimate-accordion-contents-text {
	font-size: 14px;
	font-weight: $ft-medium;
	text-align: right;
	line-height: 1.25;
	& > strong {
		font-size: 12px;
		color: #929292;
		font-weight: $ft-bold;
	}
}
.estimate-info-text {
	font-size: 14px;
	font-weight: $ft-medium;
	line-height: 20px;
	color: #6f6f6f;
	text-align: left;
}
.estimate-accordion-object-title {
	padding-bottom: 5px;
	margin-bottom: 8px;
	border-bottom: 1px dotted #e2e2e2;
	font-size: 14px;
	font-weight: $ft-medium;
	line-height: 20px;
	text-align: left;
	color: #6d7278;
}
.estimate-accordion-object-address {
	font-size: 14px;
	font-weight: $ft-medium;
	line-height: 20px;
	text-align: left;
	margin-bottom: 32px;
}
.estimate-accordion-total {
	padding-top: 12px;
	border-top: 1px dotted #979797;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.estimate-accordion-total-title {
		font-size: 14px;
		line-height: 19px;
	}
	.estimate-accordion-total-amount {
		font-size: 14px;
		font-weight: $ft-bold;
	}
}
.estimate-accordion-intro {
	font-size: 14px;
	font-weight: $ft-medium;
	text-align: left;
	line-height: 20px;
	&.mt-24 {
		margin-top: 24px;
	}
	&.mb-24 {
		margin-bottom: 24px;
	}
}
.estimate-charge-info {
	margin-top: 32px;
	font-size: 14px;
	line-height: 20px;
	color: #6f6f6f;
	text-align: center;
	a {
		color: #6f6f6f;
		text-decoration: none;
		cursor: pointer;
	}
}
</style>
