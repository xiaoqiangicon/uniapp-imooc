<template>
	<view class="ranking-container">
		<image :src="getRankingBg" class="ranking-bg"></image>
		<text class="ranking-text" :class="{'text-white': ranking <= 3}">{{ ranking }}</text>
	</view>
</template>

<script>
	export default {
		name:"hot-ranking",
		props: {
			ranking: {
				type: Number,
				required: true,
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			getRankingBg() {
				if (this.ranking <= 3) {
					return require(`@/static/images/ranking-${this.ranking}.png`)
				} else {
					return require(`@/static/images/ranking-other.png`)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.ranking-container {
	position: relative;
	text-align: center;
	width: 18px;
	height: 20px;
	.ranking-bg {
		width: 100%;
		height: 100%;
	}
	.ranking-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-55%, -55%);
		font-size: 12px;
		font-weight: bold;
		color: #333;
	}
	.text-white {
		color: white;
	}
}
</style>