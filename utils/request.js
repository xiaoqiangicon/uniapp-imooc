const BASE_URL = 'http://192.168.1.103:8000';

function request ({url, data = {}, method = 'GET'}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data,
			method,
			success: ({ data, statusCode, header}) => {
				if (data.errno === 0) {
					// 请求成功了
					resolve(data.data);
				} else {
					// 请求失败
					uni.showToast({
						title: data.message,
						icon: 'none',
						duration: 3000,
						mask: true
					})
					reject(data.message)
				}
			},
			fail: (error) => {
				reject(error);
			}
		})
	})
}

export default request;