<template>
	<HeaderClose title="소유권이전등기 계산하기" />
	<div class="result-container">
		<div class="result-table">
			<div class="table-column table-header">
				<div class="table-name">항목</div>
				<div class="table-price">금액</div>
				<div class="table-other">비고</div>
			</div>
			<div class="table-body">
				<div class="table-column">
					<div class="table-name">취득세</div>
					<div class="table-price">4,000,000원</div>
					<div class="table-other">1%</div>
				</div>
				<div class="table-column">
					<div class="table-name">지방교육세</div>
					<div class="table-price">400,000원</div>
					<div class="table-other">0.100%</div>
				</div>
				<div class="table-column">
					<div class="table-name">농특세</div>
					<div class="table-price">0원</div>
					<div class="table-other">0.2%</div>
				</div>
				<div class="table-column">
					<div class="table-name">인지</div>
					<div class="table-price">150,000원</div>
					<div class="table-other"></div>
				</div>
				<div class="table-column">
					<div class="table-name">중지</div>
					<div class="table-price">13,000원</div>
					<div class="table-other"></div>
				</div>
				<div class="table-column">
					<div class="table-name">법정수수료</div>
					<div class="table-price">944,092원</div>
					<div class="table-other"></div>
				</div>
				<div class="table-column table-footer">
					<div class="table-name">합계</div>
					<div class="table-price">5,507,092원</div>
				</div>
			</div>
		</div>
		<p class="result-help-text">
			이 금액은 가계산이며 정확한 금액을 알기 위해서는<br />
			하단의 <b>견적넣기 버튼</b>을 눌러 법무사와 대화해보시기 바랍니다
		</p>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="등기프로 찾기"
			@click-button="handlerClickFind"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import HeaderClose from '~/components/layout/HeaderClose.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const router = useRouter();

const handlerClickFindYourself = () => {
	router.push('/lawyer/find');
};

const handlerClickFind = () => {
	router.push('/lawyer/find/form');
};
</script>

<style lang="scss" scoped>
.result-container {
	padding: 30px;
	margin-bottom: 56px;
}
.result-table {
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}
.table-column {
	display: flex;
	& > div {
		display: flex;
		align-items: center;
		padding: 0 20px;
	}
}
.table-header {
	height: 60px;
	background-color: #f7f7f7;
	padding: 0 25px;
	& > div {
		font-size: 14px;
		font-weight: $ft-semibold;
	}
}
.table-body {
	padding: 25px;
	.table-column {
		height: 30px;
		padding: 5px 0;
		&.table-footer {
			height: 50px;
			margin-top: 80px;
			padding: 15px 0;
			border-top: 1px dotted #000000;
			.table-name {
				color: #000000;
			}
			.table-price {
				font-weight: $ft-bold;
			}
		}
		& > div {
			font-size: 14px;
		}
	}
	.table-name {
		color: #6d7278;
	}
}
.table-name {
	flex: 2;
}
.table-price {
	flex: 2;
	justify-content: flex-end;
}
.table-other {
	flex: 1;
}
.result-help-text {
	font-size: 12px;
	color: #252525;
	text-align: center;
	margin-top: 45px;
	line-height: 18px;
	b {
		font-weight: $ft-bold;
	}
}

@media all and (max-width: 640px) {
	.table-body {
		padding: 10px;
	}
	.table-column {
		padding: 0 10px;
		& > div {
			padding: 0 10px;
		}
	}
}
</style>
