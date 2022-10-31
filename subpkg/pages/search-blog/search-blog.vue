<template>
	<view class="search-blog-container">
		<view class="search-bar-box">
			<my-search :isShowInput="true" :placeholderText="defaultText" v-model="searchVal"></my-search>
		</view>
	</view>
</template>

<script>
	import mySearch from '@/components/my-search/my-search.vue';
	
	export default {
		data() {
			return {
				defaultText: '请输入',
				searchVal: '',
			};
		}
	}
</script>

<style lang="scss" scoped>
.search-blog-container {
	.search-bar-box {
		background-color: #fff;
		padding: 5px;
		position: sticky;
		top: 0;
		z-index: 9;
	}
}
</style>
