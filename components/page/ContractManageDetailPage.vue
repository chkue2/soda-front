<template>
	<HeaderClose title="내 계약관리 상세" />
	<div class="contract-manage-top-container">
		<div class="contract-manage-info-wrapper">
			<button
				v-if="tradeCaseDetail.sodaCase === true"
				class="contract-manage-info-button"
				@click="toggleContractUpdateModal"
			>
				수정
			</button>
			<p class="buyer-name">{{ tradeCaseDetail.buyer }}</p>
			<p class="object-address">
				{{ tradeCaseDetail.fullAddress }}
			</p>
			<div class="loans-bank">
				<img :src="bankIcon" />
				<span>{{ bankName }}</span>
			</div>
			<p class="buy-price">
				<b>매매대금 {{ (tradeCaseDetail.tradePrice || 0).toLocaleString() }}</b>
				원
			</p>
			<div class="info-column">
				<div class="info-column-title">
					<img src="/img/icon/calendar-color.svg" />
					<p>잔금일</p>
				</div>
				<p class="info-column-content">{{ tradeCaseDetail.issueDate }}</p>
			</div>
			<div class="info-column">
				<div class="info-column-title">
					<img src="/img/icon/clock-color.svg" />
					<p>잔금시간</p>
				</div>
				<p
					class="info-column-content time-none"
					@click="handlerClickIssueTimeText"
				>
					{{ issueTimeText }}
				</p>
			</div>
		</div>
	</div>
	<div class="contract-manage-middle-container">
		<p class="middle-title">진행현황</p>
		<div class="contract-state-wrapper">
			<div class="contract-state-card mb12 card-on">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-blue.svg" />
						<p>사무소 선택완료</p>
					</div>
					<button
						v-if="tradeCaseDetail.sodaCase === true"
						class="contract-cancel-button"
						@click="toggleContractCancelModal"
					>
						배정취소
					</button>
				</div>
				<div>
					<div class="contract-state-profile">
						<ExpertListItem :item="profileCard" />
					</div>
					<div class="contract-state-profile-info">
						<p class="contract-state-profile-info-title">서비스 유형</p>
						<p class="contract-state-profile-info-content">
							{{ serviceTypeText }}
						</p>
					</div>
					<div class="contract-state-profile-info">
						<p class="contract-state-profile-info-title">보수금액</p>
						<p class="contract-state-profile-info-content">
							{{ servicePriceText }}
						</p>
					</div>
					<div class="contract-state-profile-tel mt30">
						<span>사무소로 전화하기</span>
						<a :href="`tel:${rexFormatPhone(profileCard.firmPhone)}`">{{
							rexFormatPhone(profileCard.firmPhone)
						}}</a>
					</div>
					<div class="contract-state-profile-tel mt18">
						<span>대표에게 전화하기</span>
						<a :href="`tel:${rexFormatPhone(profileCard.delegaterPhone)}`">{{
							rexFormatPhone(profileCard.delegaterPhone)
						}}</a>
					</div>
					<div class="contract-state-profile-buttons">
						<button
							v-if="tradeCaseDetail.receiveFlag === false"
							class="button--gray"
						>
							리뷰남기기
						</button>
						<button
							v-if="tradeCaseDetail.receiveFlag === true && !profileCard.review"
							class="button--blue"
							@click="toggleReviewWriteModal"
						>
							리뷰남기기
						</button>
						<button
							v-if="tradeCaseDetail.receiveFlag === true && profileCard.review"
							class="button--black"
							@click="toggleReviewUpdateModal"
						>
							내 리뷰 확인
						</button>
					</div>
				</div>
			</div>
			<div
				class="contract-state-card"
				:class="{ 'card-on': tradeCaseDetail.estimateFlag }"
			>
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img :src="checkImage(tradeCaseDetail.estimateFlag)" />
						<p>견적보고 완료</p>
					</div>
					<button
						v-if="tradeCaseDetail.estimateFlag"
						@click="toggleEstimateViewModal"
					>
						견적서 보기
					</button>
				</div>
			</div>
			<div
				class="contract-state-card"
				:class="{ 'card-on': tradeCaseDetail.chargeFlag }"
			>
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img :src="checkImage(tradeCaseDetail.chargeFlag)" />
						<p>담당자보고 완료</p>
					</div>
				</div>
				<div v-if="tradeCaseDetail.chargeFlag">
					<p class="contract-state-subtitle">
						해당 담당자가 잔금일에 직접 방문합니다.
					</p>
					<div class="contract-state-charge-profile mt14">
						<img :src="chargerProfileImage" />
						<div class="contract-state-charge-info">
							<p class="firm-name">{{ charger.firmName }}</p>
							<p class="charge-name">
								{{ charger.userName }} {{ charger.position }}
							</p>
							<p class="charge-tel">
								<span>연락처</span>
								<a :href="`tel:${rexFormatPhone(charger.mobile)}`">{{
									rexFormatPhone(charger.mobile)
								}}</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div
				class="contract-state-card"
				:class="{ 'card-on': tradeCaseDetail.scheduleFlag }"
			>
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img :src="checkImage(tradeCaseDetail.scheduleFlag)" />
						<p>일정보고 완료</p>
					</div>
				</div>
				<div v-if="tradeCaseDetail.scheduleFlag">
					<p class="contract-state-subtitle">
						잔금일과 잔금시간을 꼭 확인해주세요.
					</p>
					<div class="contract-state-contents mt14">
						<div class="contract-state-contents-block">
							<p class="contract-state-contents-title">잔금일</p>
							<p class="contract-state-contents-content">
								{{ tradeCaseDetail.issueDate }}
							</p>
						</div>
						<div class="contract-state-contents-block">
							<p class="contract-state-contents-title">잔금시간</p>
							<p class="contract-state-contents-content">
								{{ tradeCaseDetail.issueTime }}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div
				class="contract-state-card"
				:class="{ 'card-on': tradeCaseDetail.repayReportFlag }"
			>
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img :src="checkImage(tradeCaseDetail.repayReportFlag)" />
						<p>상환보고 완료</p>
					</div>
					<button
						v-if="tradeCaseDetail.repayReportFlag"
						@click="toggleReceiptDownloadModal"
					>
						상환영수증 보기
					</button>
				</div>
			</div>
			<div
				class="contract-state-card"
				:class="{ 'card-on': tradeCaseDetail.receiveFlag }"
			>
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img :src="checkImage(tradeCaseDetail.receiveFlag)" />
						<p>접수보고 완료</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="contract-manage-bottom-container">
		<div class="contract-manage-help-text">
			접수보고까지 완료되었다면 소유권이전등기에 대한 업무가 모두 종료되었다는
			뜻입니다. 처리기간은 3일정도이며 등기필정보 수령까지 3일이 더
			소요됩니다.<br /><br />문의사항은 해당 사무소와 언제든 연락가능합니다.<br /><br />고객님의
			계약을 진심으로 축하드립니다.
		</div>
	</div>
	<LawyerCancelModal
		v-if="isLawyerCancelModalShow"
		@close-modal="toggleLawyerCancelModal"
		@open-complete-modal="toggleLawyerCancelCompleteModal"
	/>
	<LawyerCancelCompleteModal
		v-if="isLawyerCancelCompleteModalShow"
		@close-modal="toggleLawyerCancelCompleteModal"
	/>
	<BalanceTimeInformationModal
		v-if="isBalanceTimeInformationModalShow"
		@close-modal="toggleBalanceTimeInformationModal"
	/>
	<EstimateViewModal
		v-if="isEstimateViewModalShow"
		:tid="props.tid"
		:ins="props.ins"
		@close-modal="toggleEstimateViewModal"
	/>
	<ReceiptDownloadModal
		v-if="isReceiptDownloadModalShow"
		:tid="props.tid"
		:ins="props.ins"
		@close-modal="toggleReceiptDownloadModal"
	/>
	<ReviewWriteModal
		v-if="isReviewWriteModalShow"
		:card="profileCard"
		:detail="tradeCaseDetail"
		@call-api="callApi"
		@close-modal="toggleReviewWriteModal"
	/>
	<ReviewUpdateModal
		v-if="isReviewUpdateModalShow"
		:seq="profileCard.review ? profileCard.review[0].seq : 0"
		@re-call-api="callApi"
		@click-delete-button="toggleReviewDeleteConfirmModal"
		@close-modal="toggleReviewUpdateModal"
	/>
	<ReviewDeleteConfirmModal
		v-if="isReviewDeleteConfirmModalShow"
		@click-delete-button="deleteReview"
		@close-modal="toggleReviewDeleteConfirmModal"
	/>
	<ContractUpdateModal
		v-if="isContractUpdateModalShow"
		:tid="props.tid"
		@call-api="callApi"
		@close-modal="toggleContractUpdateModal"
	/>
	<ContractCancelModal
		v-if="isContractCancelModalShow"
		@click-cancel-button="cancelContract"
		@close-modal="toggleContractCancelModal"
	/>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertListItem from '~/components/item/ExpertListItem.vue';
import LawyerCancelModal from '~/components/modal/LawyerCancelModal.vue';
import LawyerCancelCompleteModal from '~/components/modal/LawyerCancelCompleteModal.vue';
import BalanceTimeInformationModal from '~/components/modal/BalanceTimeInformationModal.vue';
import EstimateViewModal from '~/components/modal/EstimateViewModal.vue';
import ReceiptDownloadModal from '~/components/modal/ReceiptDownloadModal.vue';
import ReviewWriteModal from '~/components/modal/ReviewWriteModal.vue';
import ReviewUpdateModal from '~/components/modal/ReviewUpdateModal.vue';
import ReviewDeleteConfirmModal from '~/components/modal/ReviewDeleteConfirmModal.vue';
import ContractUpdateModal from '~/components/modal/ContractUpdateModal.vue';
import ContractCancelModal from '~/components/modal/ContractCancelModal.vue';

import { useLoadingStore } from '~/store/loading.js';
import { tradeCase } from '~/services/tradeCase.js';
import { user } from '~/services/user.js';
import { rexFormatPhone } from '~/assets/js/utils.js';
import { bankSVG } from '~/assets/js/bankSVG.js';
import { getServiceType } from '~/assets/js/serviceType.js';
import { BANK_AUTH_KEY } from '~/assets/js/storageKeys.js';

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

const profileCard = ref({});
const tradeCaseDetail = ref({});
const charger = ref({});

const issueTimeText = computed(
	() => tradeCaseDetail.value.issueTime || '아직 정해지지 않았어요',
);

const router = useRouter();
const loadingStore = useLoadingStore();
onMounted(() => {
	callApi();
});

const callApi = () => {
	loadingStore.setLoadingShow(true);
	tradeCase
		.getTradeCaseDetail(props.tid, props.ins)
		.then(({ data }) => {
			profileCard.value = data.card;
			tradeCaseDetail.value = data.detail;
			charger.value = data.charger;
		})
		.catch(e => {
			window.localStorage.removeItem(BANK_AUTH_KEY);
			alert(e.response.data.message);
			router.go(-1);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const isLawyerCancelModalShow = ref(false);
const toggleLawyerCancelModal = () => {
	isLawyerCancelModalShow.value = !isLawyerCancelModalShow.value;
};

const isLawyerCancelCompleteModalShow = ref(false);
const toggleLawyerCancelCompleteModal = () => {
	isLawyerCancelCompleteModalShow.value =
		!isLawyerCancelCompleteModalShow.value;
};
const isBalanceTimeInformationModalShow = ref(false);
const toggleBalanceTimeInformationModal = () => {
	isBalanceTimeInformationModalShow.value =
		!isBalanceTimeInformationModalShow.value;
};
const isEstimateViewModalShow = ref(false);
const toggleEstimateViewModal = () => {
	isEstimateViewModalShow.value = !isEstimateViewModalShow.value;
};
const isReceiptDownloadModalShow = ref(false);
const toggleReceiptDownloadModal = () => {
	isReceiptDownloadModalShow.value = !isReceiptDownloadModalShow.value;
};
const isReviewWriteModalShow = ref(false);
const toggleReviewWriteModal = () => {
	isReviewWriteModalShow.value = !isReviewWriteModalShow.value;
};
const isReviewUpdateModalShow = ref(false);
const toggleReviewUpdateModal = () => {
	isReviewUpdateModalShow.value = !isReviewUpdateModalShow.value;
};
const isReviewDeleteConfirmModalShow = ref(false);
const toggleReviewDeleteConfirmModal = () => {
	isReviewDeleteConfirmModalShow.value = !isReviewDeleteConfirmModalShow.value;
};
const isContractUpdateModalShow = ref(false);
const toggleContractUpdateModal = () => {
	isContractUpdateModalShow.value = !isContractUpdateModalShow.value;
};
const isContractCancelModalShow = ref(false);
const toggleContractCancelModal = () => {
	isContractCancelModalShow.value = !isContractCancelModalShow.value;
};

const handlerClickIssueTimeText = () => {
	if (tradeCaseDetail.value.issueTime === null)
		toggleBalanceTimeInformationModal();
};

const bankIcon = computed(() =>
	tradeCaseDetail.value.venderId
		? `/img/icon/${bankSVG[tradeCaseDetail.value.venderId].icon}`
		: '',
);
const bankName = computed(() =>
	tradeCaseDetail.value.venderId
		? bankSVG[tradeCaseDetail.value.venderId].title
		: '',
);

const checkImage = flag =>
	flag ? '/img/icon/check-bubble-blue.svg' : '/img/icon/check-bubble-gray.svg';

const serviceTypeText = computed(() => {
	return getServiceType(tradeCaseDetail.value.serviceType);
});
const servicePriceText = computed(() => {
	return tradeCaseDetail.value.serviceType === 'CARD'
		? '협의완료'
		: `${(tradeCaseDetail.value.servicePrice || 0).toLocaleString()}원`;
});

const chargerProfileImage = computed(() => {
	const domain =
		location.href.includes('.local') || location.href.includes('.dev')
			? 'https://pro-api.dev.priros.com'
			: 'https://pro-api.priros.com';

	return `${domain}${charger.value.profileFileUrl}`;
});

const cancelContract = () => {
	loadingStore.setLoadingShow(true);
	tradeCase
		.deleteTradeCase(props.tid)
		.then(() => {
			alert('계약을 취소하였습니다.');
			router.replace('/');
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const deleteReview = () => {
	user
		.deleteReview(profileCard.value.review[0].seq)
		.then(() => {
			alert('작성하신 리뷰가 삭제되었습니다.');
			callApi();
			toggleReviewDeleteConfirmModal();
			toggleReviewUpdateModal();
		})
		.catch(e => {
			alert(e.response.data.message);
		});
};
</script>

<style lang="scss" scoped>
.contract-manage-top-container {
	padding: 25px 20px 30px;
	background-color: #f2f3f5;
}
.contract-manage-info-wrapper {
	padding: 45px 23px 50px;
	border-radius: 14px;
	border: 1px solid #dadada;
	background-color: #ffffff;
	position: relative;
	.contract-manage-info-button {
		width: 60px;
		height: 30px;
		border-radius: 6px;
		border: 1px solid #097cff;
		font-size: 12px;
		font-weight: $ft-medium;
		color: #097cff;
		position: absolute;
		top: 12px;
		right: 12px;
	}
	.buyer-name {
		font-weight: $ft-bold;
	}
	.object-address {
		font-size: 14px;
		color: #505050;
		margin: 12px 0;
		line-height: 1.25;
	}
	.loans-bank {
		border: 1px solid #e4e4e4;
		border-radius: 3px;
		background-color: #ffffff;
		display: inline-flex;
		align-items: center;
		padding: 5px 8px;
		gap: 7px;
		& > img {
			width: 12px;
			height: 12px;
		}
		& > span {
			font-size: 12px;
			font-weight: $ft-medium;
			color: #252525;
		}
	}
	.buy-price {
		border-bottom: 1px solid #e8e8e8;
		padding: 4px 0;
		margin: 4px 0 30px;
		font-size: 13px;
		font-weight: $ft-bold;
		color: #252525;
		text-align: right;
		& > b {
			font-size: 12px;
		}
	}
	.info-column {
		display: flex;
		align-items: center;
		& + .info-column {
			margin-top: 8px;
		}
		.info-column-title {
			display: flex;
			align-items: center;
			gap: 5px;
			width: 100px;
			& > p {
				font-size: 14px;
				font-weight: $ft-bold;
			}
		}
		.info-column-content {
			flex: 1;
			font-size: 14px;
			font-weight: $ft-bold;
			color: #097cff;
			&.time-none {
				color: #bfbfbf;
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
}
.contract-manage-middle-container {
	padding: 35px 9px 12px;
	.middle-title {
		font-size: 15px;
		font-weight: $ft-bold;
		color: #252525;
		margin-bottom: 14px;
	}
	.contract-state-wrapper {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.contract-state-card {
		padding: 22px;
		border-radius: 15px;
		background-color: #ffffff;
		box-shadow: 1px 1px 8.2px 0px rgba(0, 0, 0, 0.25);
		.contract-state-title {
			.contract-state-title-left {
				& > p {
					color: #d4d4d4;
					font-weight: $ft-medium;
				}
			}
		}
		&.card-on {
			.contract-state-title {
				.contract-state-title-left {
					& > p {
						color: #000000;
						font-weight: $ft-bold;
					}
				}
			}
		}
	}
	.contract-state-profile {
		margin: 18px 0 21px;
	}
	.contract-state-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.contract-state-title-left {
			display: flex;
			align-items: center;
			gap: 8px;
			& > p {
				font-weight: $ft-bold;
			}
		}
		& > button {
			height: 36px;
			padding: 0 12px;
			border-radius: 6px;
			border: 1px solid #3182f7;
			font-size: 12px;
			font-weight: $ft-medium;
			color: #3182f7;
			line-height: 1.5;
			&.contract-cancel-button {
				border-color: #b9b9b9;
				color: #b9b9b9;
			}
		}
	}
	.contract-state-profile-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		& + .contract-state-profile-info {
			margin-top: 11px;
		}
		.contract-state-profile-info-title {
			font-size: 12px;
			font-weight: $ft-medium;
			color: #929292;
		}
		.contract-state-profile-info-content {
			font-size: 12px;
			font-weight: $ft-bold;
		}
	}
	.contract-state-profile-tel {
		text-align: right;
		font-size: 14px;
		& > span {
			color: rgba(68, 68, 68, 0.88);
		}
		& > a {
			font-weight: $ft-bold;
			color: #4096ff;
			text-decoration: underline;
			margin-left: 4px;
		}
	}
	.contract-state-profile-buttons {
		display: flex;
		gap: 5px;
		margin: 29px 0 0;
		& > button {
			flex: 1;
			height: 36px;
			border-radius: 6px;
			font-size: 12px;
			font-weight: $ft-medium;
			color: #ffffff;
			&.button--blue {
				background-color: #097cff;
			}
			&.button--gray {
				background-color: #d9d9d9;
			}
			&.button--black {
				background-color: #535353;
			}
		}
	}
	.contract-state-subtitle {
		margin: 4px 0 0;
		padding-left: 28px;
		font-size: 13px;
		color: #a9a9a9;
	}
	.contract-state-contents {
		display: flex;
		align-items: center;
		gap: 33px;
		padding-left: 23px;
		.contract-state-contents-block {
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.contract-state-contents-title {
			font-size: 12px;
			font-weight: $ft-medium;
			color: #929292;
		}
		.contract-state-contents-content {
			font-size: 12px;
			font-weight: $ft-bold;
		}
	}
	.contract-state-charge-profile {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 13px;
		& > img {
			width: 81px;
			height: 81px;
			border: 1px solid #dde8e3;
			border-radius: 16px;
		}
		.firm-name {
			font-weight: $ft-thin;
			line-height: 1.4;
		}
		.charge-name {
			font-size: 14px;
			font-weight: $ft-medium;
			line-height: 1.25;
		}
		.charge-tel {
			font-size: 14px;
			margin-top: 14px;
			& > span {
				color: rgba(68, 68, 68, 0.88);
			}
			& > a {
				font-weight: $ft-bold;
				color: #4096ff;
				text-decoration: underline;
				margin-left: 4px;
			}
		}
	}
}
.contract-manage-bottom-container {
	padding: 22px 15px;
	.contract-manage-help-text {
		padding: 11px 13px;
		background-color: #f6f6f6;
		font-size: 13px;
		line-height: 1.45;
	}
}
</style>
