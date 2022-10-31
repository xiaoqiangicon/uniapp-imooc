// 导入vue , vuex
// 安装vuex
// 创建store;

import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	// 模块
	modules: {
		search,
	}
})

export default store;