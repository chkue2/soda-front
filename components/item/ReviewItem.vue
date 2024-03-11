<template>
	<div class="review-item">
		<img class="review-profile" src="/img/icon/profile-iu.png" />
		<div class="review-item-contents">
			<div class="review-title">
				<p class="review-id">lovely_k**님</p>
				<p class="review-date">2024.01.01</p>
			</div>
			<div class="review-comment">
				정말 친절하시고 시간약속도 잘 지켜주셨습니다. 덕분에 첫 주택구매를 잘
				마쳤어요. 감사합니다. 다음에 또 이용할 생각이에요. 3줄이 넘어가면
				말줄임표를 사용하게 되어있으니까 아마 이제 줄여지지 않을까 싶은데..
			</div>
			<div class="review-rate">
				<img v-for="i in 5" :key="i" src="/img/icon/star-yellow.svg" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.review-item {
	display: flex;
	gap: 14px;
	align-items: center;
}
.review-profile {
	width: 76px;
	height: 76px;
	border-radius: 50%;
}
.review-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.review-id {
		font-size: 12px;
		font-weight: $ft-medium;
		color: #686868;
	}
	.review-date {
		font-size: 12px;
		color: #bababa;
	}
}
.review-comment {
	margin: 4px 0;
	font-size: 12px;
	font-weight: $ft-light;
	color: #252525;
	overflow: hidden;
	white-space: normal;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	line-height: 17px;
}
</style>
