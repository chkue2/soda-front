<template>
	<div class="expert-list-item" @click="handlerClickItem">
		<img class="expert-profile" src="/img/icon/profile-iu.png" />
		<div>
			<p class="expert-office-name"><span>다이렉트로 법무사사무소</span></p>
			<div class="expert-tags">
				<span>예약시간준수</span>
				<span>선호도 높음</span>
				<span v-if="false">프로중의 프로</span>
			</div>
			<div class="expert-options">
				<span class="text--red">주말응대가능</span>
				<span><img src="/img/icon/quick-icon.svg" />빠른응답</span>
				<span v-if="false"><img src="/img/icon/good-icon.svg" />친절해요</span>
				<span v-if="false"><img src="/img/icon/smile-icon.svg" />공감하는</span>
				<span v-if="false"><img src="/img/icon/message-icon.svg" />꼼꼼한</span>
			</div>
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
@import '~/assets/scss/item/profile.scss';
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
