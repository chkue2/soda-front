<template>
	<HeaderLogo />
	<p class="page-title">알림</p>
	<div class="notification-container">
		<div class="notification-container-title">안 읽은 알림</div>
		<div class="notification-list">
			<div class="notification-item">
				<div class="notification-top">
					<p class="notification-title">담당법무사가 지정되었습니다.</p>
					<p class="notification-date">2024-01-12</p>
				</div>
				<p class="notification-content">
					다이렉트로 법무소사무소 조아라 법무사
				</p>
			</div>
			<div class="notification-item">
				<div class="notification-top">
					<p class="notification-title">담당법무사가 지정되었습니다.</p>
					<p class="notification-date">2024-01-12</p>
				</div>
			</div>
		</div>
		<div class="notification-container-title read mt32">읽은 알림</div>
		<div class="notification-list read">
			<div class="notification-item">
				<div class="notification-top">
					<p class="notification-title">담당법무사가 지정되었습니다.</p>
					<p class="notification-date">2024-01-12</p>
				</div>
				<p class="notification-content">
					다이렉트로 법무소사무소 조아라 법무사
				</p>
			</div>
			<div class="notification-item">
				<div class="notification-top">
					<p class="notification-title">담당법무사가 지정되었습니다.</p>
					<p class="notification-date">2024-01-12</p>
				</div>
			</div>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="모두 읽음으로 표시"
			progress-color="#404040"
		/>
		<ProgressBackgroundButton
			title="닫기"
			progress-color="#b7b7b7"
			@click-button="handlerClickCloseButton"
		/>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';

const router = useRouter();
const handlerClickCloseButton = () => {
	router.back();
};
</script>

<style lang="scss" scoped>
.page-title {
	padding: 10px 20px;
	font-weight: $ft-bold;
	color: #252525;
}
.notification-container {
	padding: 26px 12px;
}
.notification-container-title {
	border-bottom: 1px solid #ebebeb;
	font-size: 14px;
	font-weight: $ft-bold;
	padding-bottom: 11px;
	&.read {
		color: #959595;
	}
}
.notification-list {
	display: flex;
	flex-direction: column;
	gap: 26px;
	margin: 23px 0 15px;
	&.read {
		* {
			color: #959595;
		}
	}
}
.notification-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.notification-title {
	font-size: 14px;
	font-weight: $ft-medium;
}
.notification-date {
	font-size: 12px;
	font-weight: $ft-medium;
	color: #696969;
}
.notification-content {
	font-size: 14px;
	color: #717171;
	margin-top: 9px;
}
</style>
