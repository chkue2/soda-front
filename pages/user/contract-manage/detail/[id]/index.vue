<template>
	<HeaderClose title="내 계약관리 상세" />
	<div class="contract-manage-top-container">
		<div class="contract-manage-info-wrapper">
			<p class="buyer-name">홍길동</p>
			<p class="object-address">
				경기도 의왕시 내손동 844 인덕원센트럴자이아파트 5단지 501동 1012호
			</p>
			<div class="loans-bank">
				<img src="/img/icon/kakaobank.png" />
				<span>카카오뱅크</span>
			</div>
			<p class="buy-price"><b>매매대금 550,000,000</b> 원</p>
			<div class="info-column">
				<div class="info-column-title">
					<img src="/img/icon/calendar-color.svg" />
					<p>잔금일</p>
				</div>
				<p class="info-column-content">2024-04-15</p>
			</div>
			<div class="info-column">
				<div class="info-column-title">
					<img src="/img/icon/clock-color.svg" />
					<p>잔금시간</p>
				</div>
				<p
					class="info-column-content time-none"
					@click="toggleBalanceTimeInformationModal"
				>
					아직 정해지지 않았어요
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
				</div>
				<div>
					<div class="contract-state-profile">
						<ExpertListItem />
					</div>
					<div class="contract-state-profile-info">
						<p class="contract-state-profile-info-title">서비스 유형</p>
						<p class="contract-state-profile-info-content">
							프리미엄 서비스 (잔금일 직접 참석)
						</p>
					</div>
					<div class="contract-state-profile-info">
						<p class="contract-state-profile-info-title">보수금액</p>
						<p class="contract-state-profile-info-content">720,000원</p>
					</div>
					<div class="contract-state-profile-tel mt30">
						<span>사무소로 전화하기</span>
						<a href="tel:031-452-5555">031-452-5555</a>
					</div>
					<div class="contract-state-profile-tel mt18">
						<span>대표에게 전화하기</span>
						<a href="tel:010-1234-1234">010-1234-1234</a>
					</div>
					<div class="contract-state-profile-buttons">
						<button class="button--gray" @click="toggleReviewWriteModal">
							리뷰남기기
						</button>
					</div>
				</div>
			</div>
			<div class="contract-state-card card-on">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-blue.svg" />
						<p>견적보고 완료</p>
					</div>
					<button @click="toggleEstimateViewModal">견적서 보기</button>
				</div>
			</div>
			<div class="contract-state-card card-on">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-blue.svg" />
						<p>일정보고 완료</p>
					</div>
				</div>
				<div>
					<p class="contract-state-subtitle">
						잔금일과 잔금시간을 꼭 확인해주세요.
					</p>
					<div class="contract-state-contents">
						<div class="contract-state-contents-block">
							<p class="contract-state-contents-title">잔금일</p>
							<p class="contract-state-contents-content">2024-05-15</p>
						</div>
						<div class="contract-state-contents-block">
							<p class="contract-state-contents-title">잔금시간</p>
							<p class="contract-state-contents-content">오전 9시 30분</p>
						</div>
					</div>
				</div>
			</div>
			<div class="contract-state-card card-on">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-blue.svg" />
						<p>담당자보고 완료</p>
					</div>
				</div>
				<div>
					<p class="contract-state-subtitle">
						해당 담당자가 잔금일에 직접 방문합니다.
					</p>
					<div class="contract-state-charge-profile">
						<img src="/img/icon/profile-iu.png" />
						<div class="contract-state-charge-info">
							<p class="firm-name">최고다 법무사사무소</p>
							<p class="charge-name">최고은 법무사</p>
							<p class="charge-tel">
								<span>연락처</span>
								<a href="tel:010-1234-1234">010-1234-1234</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="contract-state-card card-on">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-blue.svg" />
						<p>상환보고 완료</p>
					</div>
					<button @click="toggleReceiptDownloadModal">상환영수증 보기</button>
				</div>
			</div>
			<div class="contract-state-card card-off">
				<div class="contract-state-title">
					<div class="contract-state-title-left">
						<img src="/img/icon/check-bubble-gray.svg" />
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
		@close-modal="toggleEstimateViewModal"
	/>
	<ReceiptDownloadModal
		v-if="isReceiptDownloadModalShow"
		@close-modal="toggleReceiptDownloadModal"
	/>
	<ReviewWriteModal
		v-if="isReviewWriteModalShow"
		@close-modal="toggleReviewWriteModal"
	/>
	<ReviewUpdateModal
		v-if="isReviewUpdateModalShow"
		@close-modal="toggleReviewUpdateModal"
	/>
</template>

<script setup>
import { ref } from 'vue';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ExpertListItem from '~/components/item/ExpertListItem.vue';
import LawyerCancelModal from '~/components/modal/LawyerCancelModal.vue';
import LawyerCancelCompleteModal from '~/components/modal/LawyerCancelCompleteModal.vue';
import BalanceTimeInformationModal from '~/components/modal/BalanceTimeInformationModal.vue';
import EstimateViewModal from '~/components/modal/EstimateViewModal.vue';
import ReceiptDownloadModal from '~/components/modal/ReceiptDownloadModal.vue';
import ReviewWriteModal from '~/components/modal/ReviewWriteModal.vue';
import ReviewUpdateModal from '~/components/modal/ReviewUpdateModal.vue';

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
</script>

<style lang="scss" scoped>
.contract-manage-top-container {
	padding: 25px 20px 30px;
	background-color: #f2f3f5;
}
.contract-manage-info-wrapper {
	padding: 35px 23px;
	border-radius: 14px;
	border: 1px solid #dadada;
	background-color: #ffffff;
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
		&.card-off {
			.contract-state-title {
				.contract-state-title-left {
					& > p {
						color: #d4d4d4;
						font-weight: $ft-medium;
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
			padding: 4px 12px;
			border-radius: 6px;
			border: 1px solid #3182f7;
			font-size: 12px;
			font-weight: $ft-medium;
			color: #3182f7;
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
			&.button--blue {
				color: #4c86e9;
				background-color: #eaf2ff;
			}
			&.button--gray {
				color: #ffffff;
				background-color: #d9d9d9;
			}
		}
	}
	.contract-state-subtitle {
		margin: 4px 0 14px;
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
