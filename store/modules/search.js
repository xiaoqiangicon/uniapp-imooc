export default {
	// 独立命名空间
	namespaced: true,
	// 通过state声明数据
	state: () => {
		return {
			// 搜索历史的数据
			searchData: [],
		}
	}
}