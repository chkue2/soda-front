<template>
	<div class="loading-modal">
		<div class="loading-modal-container">
			<img src="/img/icon/loading.gif" alt="로딩중" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.loading-modal {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	background-color: rgba(0, 0, 0, 0.6);
	.loading-modal-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 330px;
		border-radius: 15px;
		background-color: #ffffff;
		padding: 30px 60px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		& > img {
			width: 100px;
			height: auto;
		}
	}
}
</style>
