<template>
	<HeaderLogo />
	<p class="page-title">알림</p>
	<div class="notification-container">
		<div class="notification-container-title">안 읽은 알림</div>
		<ListEmptyItem
			v-if="notReadList.length === 0"
			title="알림이 없습니다"
			:margin="[36, 0, 36, 0]"
		/>
		<div v-if="notReadList.length > 0" class="notification-list">
			<div
				v-for="(item, index) in notReadList"
				:key="index"
				class="notification-item"
				@click="callApiReadNotification(item.seq)"
			>
				<div class="notification-top">
					<p class="notification-title">{{ item.title }}</p>
					<p class="notification-date">
						{{ changeDateFormat(item.created || '') }}
					</p>
				</div>
				<p class="notification-content" v-html="item.content"></p>
			</div>
		</div>
		<div class="notification-container-title read mt32">읽은 알림</div>
		<ListEmptyItem
			v-if="readList.length === 0"
			title="알림이 없습니다"
			:margin="[36, 0, 36, 0]"
		/>
		<div v-if="readList.length > 0" class="notification-list read">
			<div
				v-for="(item, index) in readList"
				:key="index"
				class="notification-item"
			>
				<div class="notification-top">
					<p class="notification-title">{{ item.title }}</p>
					<p class="notification-date">
						{{ changeDateFormat(item.created || '') }}
					</p>
				</div>
				<p class="notification-content" v-html="item.content"></p>
			</div>
		</div>
	</div>
	<div class="form-bottom-buttons">
		<ProgressBackgroundButton
			title="모두 읽음으로 표시"
			progress-color="#404040"
			@click="callApiReadAllNotification"
		/>
		<ProgressBackgroundButton
			title="닫기"
			progress-color="#b7b7b7"
			@click-button="handlerClickCloseButton"
		/>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

import HeaderLogo from '~/components/layout/HeaderLogo.vue';
import ProgressBackgroundButton from '~/components/button/ProgressBackgroundButton.vue';
import ListEmptyItem from '~/components/item/ListEmptyItem.vue';

import { notification } from '~/services/notification.js';
import { useLoadingStore } from '~/store/loading';

const notificationList = ref([]);

onMounted(() => {
	callApi();
});

const loadingStore = useLoadingStore();

const callApi = () => {
	loadingStore.setLoadingShow(true);
	notification
		.getNotification()
		.then(({ data }) => {
			notificationList.value = data.notification;
		})
		.catch(e => {
			alert(e.response.data.message);
		})
		.finally(() => {
			loadingStore.setLoadingShow(false);
		});
};

const notReadList = computed(() =>
	notificationList.value.filter(x => x.readYn === false),
);
const readList = computed(() =>
	notificationList.value.filter(x => x.readYn === true),
);

const changeDateFormat = date => {
	return dayjs(date).format('YYYY-MM-DD');
};

const callApiReadNotification = seq => {
	notification
		.readNotification(seq)
		.then(() => {
			callApi();
		})
		.catch(e => {
			console.log(e);
			alert(e.response.data.message);
		});
};

const callApiReadAllNotification = () => {
	notification
		.readAllNotification()
		.then(() => {
			callApi();
		})
		.catch(e => {
			console.log(e);
			alert(e.response.data.message);
		});
};

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
	padding: 26px 12px 70px;
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
.notification-item {
	cursor: pointer;
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
