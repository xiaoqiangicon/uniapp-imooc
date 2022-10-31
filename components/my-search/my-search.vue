<template>
	<view class="my-search-container">
		<uni-search-bar v-if="isShowInput" class="my-search-bar" :radius="100" :bgColor="config.backgroundColor"
			:placeholder="placeholderText"
			:value="value"
			@confirm="onSearch"
			@focus="onFocus"
			@blur="onBlur"
			@clear="onClear"
			@input="onInput"
			@cancel="onCancel"
		>
			<uni-icons slot="clearIcon" type="clear"></uni-icons>
		</uni-search-bar>
		<view class="my-search-box" v-else>
			<image src="../../static/images/search.png" class="icon"></image>
			<text class="placeholder">{{ placeholderText }}</text>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	
	export default {
		name:"my-search",
		props: {
			// 输入的内容
			value: {
				type: String
			},
			// 是否显示输入框
			isShowInput: {
				type: Boolean,
				default: false,
			},
			placeholderText: {
				type: String,
				default: '搜索'
			},
			// 配置对象
			config: {
				type: Object,
				default: () => ({
					height: 36,
					backgroundColor: '#eee',
					icon: '/static/images/search.png',
					textColor: '#454545',
					border: '1px solid #c9c9c9',
				})
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			// 通过mapState函数，注册state中的数据，导入之后的数据可以直接使用
			// mapState(模块名称, ['字段名'])
			// ...mapState('search', ['msg'])
		},
		methods: {
			onSearch() {
				console.log('search')
			},
			onFocus() {
				console.log('onFocus')
			},
			onInput(val) {
				console.log('onInput')
				this.$emit('input', val);
			},
			onCancel() {
				console.log('onCancel')
			},
			onClear() {
				console.log('onClear')
			},
			onBlur() {
				console.log('onBlur')
			},
		}
	}
</script>

<style lang="scss">
.my-search-container {
	display: flex;
	align-items: center;
	.my-search-box {
		width: 100%;
		height: 36px;
		background-color: $uni-bg-color;
		border-radius: 18px;
		border: 1px solid $uni-border-4;
		display: flex;
		align-items: center;
		padding: 0 $uni-spacing-row-base;
	}
	.icon {
		height: $uni-img-size-sm;
		width: $uni-img-size-sm;
	}
	.my-search-bar {
		width: 100%;
	}
	.placeholder {
		font-size: $uni-font-size-sm;
		margin-left: $uni-spacing-row-sm;
		color: $uni-text-color-placeholder;
	}
}
</style>