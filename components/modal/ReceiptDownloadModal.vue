<template>
	<CommonModal @close-modal="closeModal">
		<template #modal-body>
			<div class="receipt-container">
				<p class="receipt-modal-subtitle">다운로드 받을 수 있어요</p>
				<p class="receipt-modal-title">상환영수증</p>
				<div class="receipt-modal-contents">
					<div
						v-for="(receipt, index) in receiptList"
						:key="index"
						class="receipt-item"
					>
						<p>{{ receipt.docName }}</p>
						<img
							src="/img/icon/download-black.svg"
							alt="파일 다운로드"
							@click="
								handlerClickDownloadButton(receipt.documentId, receipt.fileName)
							"
						/>
					</div>
				</div>
				<button class="receipt-modal-button" @click="closeModal">닫기</button>
			</div>
		</template>
	</CommonModal>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import CommonModal from '~/components/modal/CommonModal.vue';

import { fileDownload } from '~/assets/js/utils.js';
import { tradeCase } from '~/services/tradeCase.js';
import { useAlertStore } from '~/store/alert.js';

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
const emit = defineEmits(['close-modal']);

const alertStore = useAlertStore();

const receiptList = ref([]);

onMounted(() => {
	tradeCase
		.getDocuments(props.tid, props.ins)
		.then(({ data }) => {
			receiptList.value = data.list;
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
			closeModal();
		});
});

const handlerClickDownloadButton = (did, fileName) => {
	tradeCase
		.downloadDocument(props.tid, did, props.ins)
		.then(({ data }) => {
			if (data !== null && data !== '') {
				fileDownload(data, fileName.split('.')[0], fileName.split('.')[1]);
			} else {
				alertStore.open('파일을 다운로드 할 수 없습니다.');
			}
		})
		.catch(e => {
			alertStore.open(e.response.data.message);
		});
};

const closeModal = () => {
	emit('close-modal');
};
</script>

<style lang="scss" scoped>
.receipt-container {
	padding: 0 28px 20px;
}
.receipt-modal-subtitle {
	font-size: 14px;
	font-weight: $ft-medium;
	color: #707070;
	text-align: center;
}
.receipt-modal-title {
	margin: 23px 0 17px;
	font-size: 18px;
	font-weight: $ft-bold;
	text-align: center;
}
.receipt-modal-contents {
	padding: 0 15px;
	margin: 23px 0 27px;
	border: 1px solid #dfdfdf;
	border-radius: 8px;
}
.receipt-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 13px 0;
	& + .receipt-item {
		border-top: 1px solid rgba(26, 56, 96, 0.1);
	}
	& > p {
		font-size: 14px;
		font-weight: $ft-medium;
		color: #3172f7;
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.25;
		white-space: nowrap;
	}
	& > img {
		cursor: pointer;
	}
}
.receipt-modal-button {
	width: 100%;
	padding: 14px 0;
	border-radius: 8px;
	background-color: #000000;
	font-size: 14px;
	font-weight: $ft-bold;
	color: #f5f5f5;
	margin-top: 29px;
}
</style>
