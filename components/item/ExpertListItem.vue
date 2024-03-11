<template>
	<div class="expert-list-item" @click="handlerClickItem">
		<img class="expert-profile" src="/img/icon/profile-iu.png" />
		<div>
			<p class="expert-office-name"><span>다이렉트로 법무사사무소</span></p>
			<div class="expert-tags">
				<span>배상책임보험가입</span>
				<span>10년 경력</span>
			</div>
			<p class="expert-option">보수협의가능</p>
			<div class="expert-location">
				<img src="/img/icon/location-gray.svg" />
				<p>서울시 서초구 서초동</p>
			</div>
			<div class="expert-info">
				<p class="expert-distance">0 Km</p>
				<div class="expert-rate">
					<img src="/img/icon/star-yellow.svg" />
					<p>4.8</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const handlerClickItem = () => {
	router.push('/lawyer/detail/1');
};
</script>

<style lang="scss" scoped>
.expert-list-item {
	display: flex;
	gap: 14px;
	align-items: center;
	cursor: pointer;
	& > div {
		flex: 1;
	}
}
.expert-profile {
	width: 93px;
	height: 93px;
	border: 1px solid #dde0e3;
	border-radius: 16px;
}
.expert-office-name {
	display: table;
	table-layout: fixed;
	width: 100%;
	& > span {
		display: table-cell;
		font-weight: $ft-thin;
		line-height: 23px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.expert-tags {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 4px;
	margin: 4px 0;
	& > span {
		padding: 0 3px;
		line-height: 17px;
		border-radius: 3px;
		background-color: #eef1f8;
		color: #61666c;
		font-size: 12px;
	}
}
.expert-option {
	font-size: 12px;
	font-weight: $ft-medium;
	color: #686868;
}
.expert-location {
	display: flex;
	align-items: center;
	gap: 2px;
	margin: 2px 0 4px;
	& > p {
		line-height: 16px;
		font-size: 11px;
		font-weight: $ft-medium;
		color: #62656c;
	}
}
.expert-info {
	display: flex;
	align-items: center;
	gap: 10px;
}
.expert-distance {
	font-size: 11px;
	font-weight: $ft-bold;
}
.expert-rate {
	display: flex;
	align-items: center;
	gap: 2px;
	& > p {
		font-size: 11px;
		font-weight: $ft-medium;
		color: #62656c;
	}
}
</style>
