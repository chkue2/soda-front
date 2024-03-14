<template>
	<CommonModal @close-modal="CloseModal">
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
								780,000 원<br /><strong>(제세공과금+수수료)</strong>
							</p>
							<p class="estimate-accordion-contents-title">입금계좌</p>
							<p class="estimate-accordion-contents-text">110-11-11123-23</p>
							<p class="estimate-accordion-contents-title">대출기관</p>
							<p class="estimate-accordion-contents-text">카카오뱅크</p>
							<p class="estimate-accordion-contents-title">대출금</p>
							<p class="estimate-accordion-contents-text">110,000,000 원</p>
							<p class="estimate-accordion-contents-title">대출실행금</p>
							<p class="estimate-accordion-contents-text">
								110,000,000 원<br /><strong>(대출기관 기준에 따름)</strong>
							</p>
							<p class="estimate-accordion-contents-title">견적발행일</p>
							<p class="estimate-accordion-contents-text">2023-10-01</p>
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
							경기도 의왕시 내손동 844 인덕원센트럴자이아파트 5단지 501동 1012호
						</p>
						<div class="estimate-accordion-contents-grid">
							<p class="estimate-accordion-contents-title">매수인</p>
							<p class="estimate-accordion-contents-text">홍길동</p>
							<p class="estimate-accordion-contents-title">산출조건</p>
							<p class="estimate-accordion-contents-text">조정대상지역-1주택</p>
							<p class="estimate-accordion-contents-title">농특세</p>
							<p class="estimate-accordion-contents-text">비과세</p>
							<p class="estimate-accordion-contents-title">매매대금</p>
							<p class="estimate-accordion-contents-text">110,000,000 원</p>
							<p class="estimate-accordion-contents-title">시가표준액</p>
							<p class="estimate-accordion-contents-text">400,000,000 원</p>
							<p class="estimate-accordion-contents-title">채권매입금</p>
							<p class="estimate-accordion-contents-text"></p>
						</div>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">제세공과금</p>
						<div class="estimate-accordion-top-right">
							<span class="estimate-accordion-top-amount">5,507,092 원</span>
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<div class="estimate-accordion-contents-grid pd-sm">
							<p class="estimate-accordion-contents-title">취득세</p>
							<p class="estimate-accordion-contents-text">4,000,000 원</p>
							<p class="estimate-accordion-contents-title">지방교육세</p>
							<p class="estimate-accordion-contents-text">400,000 원</p>
							<p class="estimate-accordion-contents-title">농특세</p>
							<p class="estimate-accordion-contents-text">0 원</p>
							<p class="estimate-accordion-contents-title">인지</p>
							<p class="estimate-accordion-contents-text">150,000 원</p>
							<p class="estimate-accordion-contents-title">중지</p>
							<p class="estimate-accordion-contents-text">13,000 원</p>
							<p class="estimate-accordion-contents-title">채권부담금</p>
							<p class="estimate-accordion-contents-text">944,092 원</p>
						</div>
						<div class="estimate-accordion-total">
							<p class="estimate-accordion-total-title">소계</p>
							<p class="estimate-accordion-total-amount">5,507,092 원</p>
						</div>
					</div>
				</div>
				<div class="estimate-accordion open">
					<div class="estimate-accordion-top">
						<p class="estimate-accordion-top-title">수수료</p>
						<div class="estimate-accordion-top-right">
							<span class="estimate-accordion-top-amount">463,100 원</span>
							<img
								src="/img/icon/expand-down-gray.svg"
								class="estimate-accordion-top-icon"
							/>
						</div>
					</div>
					<div class="estimate-accordion-contents">
						<div class="estimate-accordion-contents-grid pd-sm">
							<p class="estimate-accordion-contents-title">적용수수료</p>
							<p class="estimate-accordion-contents-text">381,000 원</p>
							<p class="estimate-accordion-contents-title">거래신고대행</p>
							<p class="estimate-accordion-contents-text">40,000 원</p>
							<p class="estimate-accordion-contents-title">다중매매</p>
							<p class="estimate-accordion-contents-text">0 원</p>
							<p class="estimate-accordion-contents-title">수수료계</p>
							<p class="estimate-accordion-contents-text">421,000 원</p>
							<p class="estimate-accordion-contents-title">부가세</p>
							<p class="estimate-accordion-contents-text">42,100 원</p>
						</div>
						<div class="estimate-accordion-total">
							<p class="estimate-accordion-total-title">소계</p>
							<p class="estimate-accordion-total-amount">463,100 원</p>
						</div>
						<p class="estimate-info-text mt25">
							기본 법정수수료(소계) : 642,400원 (VAT포함)
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
						<p class="estimate-accordion-intro">준비서류들 표시</p>
					</div>
				</div>
				<p class="estimate-charge-info">
					다이렉트로 법무사 (견적담당자 : 김프리 )<br /><a
						:href="`tel:02-453-7896`"
						>T. 02-453-7896</a
					>
				</p>
				<button class="estimate-modal-button" @click="CloseModal">닫기</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { onMounted } from 'vue';
import CommonModal from '~/components/modal/CommonModal.vue';

onMounted(() => {
	document.querySelectorAll('.estimate-accordion').forEach(elm => {
		elm.addEventListener('click', () => {
			elm.classList.toggle('open');
		});
	});
});

const emit = defineEmits(['close-modal']);
const CloseModal = () => {
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
	background-color: #f2f2f2;
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
