<template>
	<view class="tab-container">
		<view class="tab-box">
			<scroll-view scroll-x class="scroll-view" scroll-with-animation :scroll-left="scrollLeft">
			<view class="scroll-content">
				<view class="tab-item-box">
					<block v-for="(item, index) in tabData" :key="index">
						<view 
							class="tab-item" 
							:id="'_tab_' + index" 
							:class="{'tab-item-active' : activeIndex === index}" 
							@click="onTabClick(index)"
							:style="{
								color: activeIndex === index ? defaultConfig.activeTextColor: defaultConfig.textColor
							}"
						>
							{{item.label || item}}
						</view>
					</block>
				</view>
				<!-- 滑块 -->
				<view 
					class="underline" 
					:style="{ 
						transform: 'translateX(' + slider.left + 'px)'
					}">
				</view>
			</view>
		</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-tabs",
		props: {
			// 配置对象
			config: {
				type: Object,
				// default如果是复杂数据类型，那么需要指定value为一个函数，通过返回值的形式指定默认值
				default: () => {
					return {}
				}
			},
			// 父组件指定数据
			tabData: {
				type: Array,
				default: () => {
					return []
				}
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [],
				// 当前激活项Index
				activeIndex: -1,
				// 滑块, 确定滑块滚动的时机和距离
				slider: {
					left: 0
				},
				// scrollView的横向滚动条位置
				scrollLeft: 0,
				// 默认配置
				defaultConfig: {
					// 默认的字体颜色
					textColor: '#333',
					activeTextColor: '#f94d2a',
					underLineWidth: 24,
					underLineHeight: 2,
					underLineColor: '#f94d2a',
				}
			};
		},
		watch: {
			tabData: {
				handler(val) {
					this.tabList = val;
					// this.$nextTick()虽然支持，但是存在兼容性问题
					setTimeout(() => {
						// 计算item的slider
						this.updateTabWidth();
					}, 0);
				},
				immediate: true,	// 当前回调将会在监听开始后立即调用
			},
			// 监听激活项目变化
			defaultIndex: {
				handler(val) {
					this.activeIndex = val;
					// 重新计算滑块位置
					this.tabToIndex();
				},
				immediate: true,	// 当前回调将会在监听开始后立即调用
			},
			config: {
				handler(val) {
					this.defaultConfig = { ...this.defaultConfig, ...val }
				},
				immediate: true,
			}
		},
		methods: {
			updateTabWidth() {
				// tabItem的宽度,tabItem的left, 为每个item维护一个slider对象
				let data = this.tabList;
				if (data.length === 0) return;
				
				// 获取dom的固定写法
				const query = uni.createSelectorQuery().in(this);
				// 循环数据源
				data.forEach((item, index) => {
					// 获取dom的固定写法
					query.select('#_tab_' + index).boundingClientRect((res) => {
						// res就是拿到的dom；为数据对象的每一个item都维护一个slider对象；
						item._slider = {
							// left = tabItem.left + (tabItem.width - slider.width) / 2;
							left: res.left + (res.width - this.defaultConfig.underLineWidth) / 2,
						}
						// 运算完成后，计算滑块位置
						if (data.length - 1 === index) {
							this.tabToIndex()
						}
					}).exec();
				})
			},
			onTabClick(index) {
				this.activeIndex = index;
				this.tabToIndex()
				this.$emit('tabClick', index);
			},
			// 根据当前的activeIndex计算
			tabToIndex() {
				if (this.tabList.length === 0) return;
				const index = this.activeIndex;
				this.slider = {
					left: this.tabList[index]._slider.left
				}
				// 控制scrollView进行横向滚动
				this.scrollLeft = index * this.defaultConfig.underLineWidth;
			},
		}
	}
</script>

<style lang="scss">
.tab-container {
	font-size: $uni-font-size-base;
	height: 45px;
	line-height: 45px;
	background-color: $uni-bg-color;
	.tab-box {
		width: 100%;
		height: 45px;
		display: flex;
		position: relative;
		.scroll-view {
			white-space: nowrap;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			.scroll-content {
				width: 100%;
				height: 100%;
				position: relative;
				.tab-item-box {
					height: 100%;
					.tab-item {
						height: 100%;
						display: inline-block;
						text-align: center;
						padding: 0 15px;
						position: relative;
						color: $uni-text-color;
						&-active {
							color: #f94d2a;
						}
					}
				}
				.underline {
					height: 2px;
					width: 24px;
					background-color: #f94d2a;
					border-radius: 3px;
					transition: .5s;
					position: absolute;
					bottom: 0;
				}
			}
		}
	}
}
</style>