<template>
	<div class="lawandtech-intro-container">
		<p class="intro-title">등기소다</p>
		<div class="intro-flex">
			<div class="intro-column">
				<p class="column-title">(주)로앤텍</p>
				<p class="column-content">사업자등록번호 211-88-86547</p>
			</div>
			<div class="intro-column">
				<p class="column-title">대표자</p>
				<p class="column-content">조성화</p>
			</div>
			<div class="intro-column">
				<p class="column-title">주소</p>
				<p class="column-content">
					경기도 과천시 별양상가1로 18, 4층 B-1호(별양동)
				</p>
			</div>
			<div class="intro-column">
				<p class="column-title">대표전화</p>
				<p class="column-content">1670-2361</p>
			</div>
			<div class="intro-column">
				<p class="column-title">이메일</p>
				<p class="column-content">priros@lawandtech.co.kr</p>
			</div>
		</div>
		<p class="intro-copy mt25 mb17">
			(주)로앤텍은 통신판매중개자로 법률 서비스 및 업무 당사자가 아니므로 법률
			서비스 및 업무에 대해 책임을 지지 않습니다.
		</p>
		<p class="intro-copy">COPYRIGHT &copy; PRIROS ALL RIGHTS RESERVED.</p>
	</div>
</template>

<style lang="scss" scoped>
.lawandtech-intro-container {
	padding: 17px;
	background-color: #f0f0f0;
}
.intro-title {
	font-size: 14px;
	font-weight: $ft-bold;
	line-height: 20px;
}
.intro-flex {
	display: flex;
	flex-direction: column;
	margin: 25px 0;
	gap: 5px;
}
.intro-column {
	display: flex;
}
.column-title {
	width: 80px;
	font-size: 12px;
	font-weight: $ft-medium;
	color: #949599;
}
.column-content {
	flex: 1;
	font-size: 12px;
	color: #949599;
	word-break: keep-all;
	line-height: 1.25;
}
.intro-copy {
	font-size: 12px;
	color: #b5b5b5;
	text-align: center;
	word-break: keep-all;
}
</style>
