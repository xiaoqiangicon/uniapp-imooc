<template>
	<view class="item-container">
		<view class="item-box">
			<view class="item-box-left">
				<hot-ranking :ranking="ranking"></hot-ranking>
			</view>
			<view class="item-box-right">
				<view class="item-title">{{ data.title }}</view>
				<view class="item-desc">{{data.desc}}</view>
				<view class="item-bottom-box">
					<text class="item-author">{{ data.nickname }}</text>
					<view class="hot-box">
						<image src="@/static/images/hot-icon.png" class="hot-icon"></image>
						<text class="hot-text">{{ data.views }}热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import hotRanking from '../hot-ranking/hot-ranking.vue';
	
	export default {
		name:"hot-list-item",
		components: {
			hotRanking,
		},
		props: {
			data: {
				type: Object,
				required: true
			},
			ranking: {
				type: Number,
				required: true,
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.item-container {
	padding-bottom: $uni-spacing-col-lg;
	.item-box {
		display: flex;
		margin: 0 10px;
		padding: 12px 10px;
		background-color: #fff;
		border-radius: 6px;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, .1);
		.item-box-left {
			margin-right: 5px;
		}
		.item-box-right {
			width: 100%;
			.item-title {
				font-size: 16px;
				font-weight: bold;
				color: #000;
			}
			.item-desc {
				padding-top: 4px;
				font-size: 14px;
				color: rgb(10, 9, 9);
			}
			.item-bottom-box {
				margin-top: 5px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-author {
					font-size: 12px;
					color: #999;
				}
				.hot-box {
					.hot-icon {
						width: 16px;
						height: 16px;
						vertical-align: middle;
					}
					.hot-text {
						margin-left: 5px;
						font-size: 12px;
						color: #f94d2a;
					}
				}
			}
		}
	}
}
</style>