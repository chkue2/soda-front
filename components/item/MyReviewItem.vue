<template>
	<div class="my-review-item">
		<div class="my-review-title">
			<p>최고다 법무사사무소</p>
			<img src="/img/icon/expand-right-black.svg" />
		</div>
		<div class="my-review-rating">
			<div class="my-review-rating-column">
				<p>시간준수</p>
				<div>
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-gray.svg" />
				</div>
			</div>
			<div class="my-review-rating-column">
				<p>친절만족</p>
				<div>
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-gray.svg" />
				</div>
			</div>
			<div class="my-review-rating-column">
				<p>업무수행</p>
				<div>
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-yellow.svg" />
					<img src="/img/icon/star-gray.svg" />
				</div>
			</div>
		</div>
		<p class="my-review-reg-date">작성일 2024-02-02</p>
		<div class="my-review-content">
			정말 친절하시고 시간약속도 잘 지켜주셨습니다. 덕분에 첫 주택구매를 잘
			마쳤어요. 처음이라 긴장을 많이했는데 아이유 담당자님이 긴장하지말라고
			노래도 불러주시고 얼굴도 예쁜데 마음도 이쁘시더라구요~호호호호 주변에 많이
			자랑해놨어요
		</div>
		<div class="my-review-buttons">
			<button>수정</button>
			<button>삭제</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.my-review-item {
	padding: 35px 0 14px;
}
.my-review-title {
	padding: 5px 0 14px;
	border-bottom: 1px solid #ebebeb;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	& > p {
		font-size: 14px;
		font-weight: $ft-bold;
	}
	& > img {
		margin-right: 7px;
	}
}
.my-review-rating {
	margin: 13px 0;
}
.my-review-rating-column {
	display: flex;
	gap: 13px;
	align-items: center;
	& + .my-review-rating-column {
		margin-top: 3px;
	}
	& > p {
		font-size: 12px;
		font-weight: $ft-bold;
		color: #787878;
	}
	& > div {
		display: flex;
		align-content: center;
		& > img {
			width: 17px;
			height: 17px;
		}
	}
}
.my-review-reg-date {
	font-size: 12px;
	font-weight: $ft-medium;
	color: #929292;
	text-align: right;
}
.my-review-content {
	padding: 14px 8px 27px;
	font-size: 14px;
	color: #252525;
	margin: 6px 0 13px;
	background-color: #f8f8f8;
}
.my-review-buttons {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 8px;
	& > button {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #929292;
	}
}
</style>
