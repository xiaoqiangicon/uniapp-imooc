<template>
	<view class="hot-container">
		<view>test</view>
		<image src="../../static/images/logo.png" mode="aspectFit" class="logo"></image>
		<view class="search-box" @click="onToSearch">
			<my-search placeholderText="uni-app 自定义组件"></my-search>
		</view>
		<view class="tab-sticky">
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex"  @tabClick="tabClick"></my-tabs>
		</view>
		<!-- list视图 -->
		<swiper class="swiper" :current="currentIndex" :style="{height: currentSwiperHeight + 'px'}" @change="swiperChange" @animationfinish="onSwiperEnd">
			<!-- swiper数量由tabData决定-->
			<swiper-item class="swiper-item" v-for="(item, tabIndex) in tabData" :key="tabIndex">
				<view>
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<block v-else>
						<hot-list-item :class="'hot-list-item-' + tabIndex " v-for="(item, index) in listData[currentIndex]" :key="index" :data="item" :ranking="index + 1"></hot-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import mySearch from '@/components/my-search/my-search.vue';
	import myTabs from '@/components/my-tabs/my-tabs.vue';
	import { getHotTabs, getHotListFromTabType } from '../../api/hot.js'
	
	export default {
		data() {
			return {
				tabData: [],
				// 激活项
				currentIndex: 0,
				isLoading: true,
				// 以index为key，对应的list为value；
				listData: {},
				currentSwiperHeight: 0,
				// 缓存高度的计算结果，以Index为key,对应的高度为value,
				swiperHeightData: {},
				currentPageScrollTop: 0,
			};
		},
		components: {
			mySearch,
			myTabs,
		},
		// 组件配置完成，但是DOM未渲染，进行网络请求，配置响应式数据.
		created() {
			this.loadHotTabs()
		},
		onPageScroll(res) {
			this.currentPageScrollTop = res.scrollTop;
		},
		methods: {
			async loadHotTabs() {
				const res = await getHotTabs();
				this.tabData = res.data.list;
				await this.loadHotListFromTab();
			},
			async loadHotListFromTab() {
				if (!this.listData[this.currentIndex]) {
					this.isLoading = true;
					const id = this.tabData[this.currentIndex].id;
					const res = await getHotListFromTabType(id);
					this.listData[this.currentIndex] = res.data.list;
					this.isLoading = false;
					
					// 渲染完成后，计算高度，this.$nextTick存在兼容性问题
					setTimeout(async () => {
						// 获取到当前swiper的高
						this.currentSwiperHeight = await this.getCurrentSwiperHeight();
						// 放入到缓存
						this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
					}, 0)
				}
				
			},
			onToSearch() {
				console.log(1234)
				uni.navigateTo({
					url: '/subpkg/pages/search-blog/search-blog'
				})
			},
			tabClick(index) {
				if (this.currentPageScrollTop > 130) {
					// 控制列表的滚动位置
					uni.pageScrollTo({
						scrollTop: this.currentPageScrollTop
					})
				}
				// console.log(index, 'index')
				this.currentIndex = index;
			},
			swiperChange(e) {
				this.currentIndex = e.detail.current;
			},
			onSwiperEnd() {
				// 判断缓存是否存在
				if(!this.listData[this.currentIndex]) {
					this.loadHotListFromTab();
					return;
				}
				// 存在数据缓存则同时存在height的缓存数据
				this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
			},
			getCurrentSwiperHeight() {
				// 拿到所有的item,拿到所有item的高度，相加
				return new Promise((resolve, reject) => {
					let sum = 0;
					
					const query = uni.createSelectorQuery().in(this);
					query.selectAll(`.hot-list-item-${this.currentIndex}`)
						.boundingClientRect((res) => {
							console.log(res, 'res')
							res.forEach(item => {
								sum += item.height;
							})
							resolve(sum)
						})
						.exec();
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.hot-container {
	background-color: #fff;
	.logo {
		width: 100%;
		height: 80px;
	}
	.search-box {
		padding: 0 16px;
		margin-bottom: $uni-spacing-col-base;
	}
	.tab-sticky {
		position: sticky;
		z-index: 99;
		top: 0;
	}
}
</style>
