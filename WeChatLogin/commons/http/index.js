import Request from '../../js_sdk/luch-request/luch-request/index.js'
const http=new Request()
// let baseUrl="http://153.101.199.82:8888/api"
 let baseUrl="http://192.168.0.32:5000/api"

// 配置全局
http.setConfig((config)=>{
	config.baseURL=baseUrl
	config.timeout=5000
	config.custom = {
			loading:true
		}
	return config
})


//请求前拦截，用来动态加参
http.interceptors.request.use((config) => {
	if(config.url !== '/applogin' || config.url!=='login'|| config.url!=='wxlogin'){
			config.header.Authorization ='Bearer '+ uni.getStorageSync("token")
		}	// 演示custom 用处  
	if (config.custom.loading) {
		uni.showLoading()
	}
	return config
}, (config) => {
	return Promise.reject(config)
})

// 请求后
http.interceptors.response.use((response) => {
	console.log(response,'结果')
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	if (response.statusCode > 300 ||response.statusCode< 200) { 
		console.log('reject')
	  return Promise.reject(response)  
	} 
	if(response.data.code!==1){
		return Promise.reject(response) 
	}
	return response.data
}, (response) => { // 请求错误。可以使用async await 做异步操作  
	console.log(response,'错误')
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	if(response.statusCode == 401){
		uni.clearStorageSync();
		uni.showToast({
		    title: '登录失败，请重新登录',
		    duration: 2000
		});
		
		if(response.config.url !== "/login"){
			uni.reLaunch({
				url:'/pages/index/login.vue'
			})
		}
	}else{
		uni.showToast({
		    title: "网络请求错误！",
			icon: 'none',
		    duration: 2000
		});
	}
	return Promise.reject(response)
})
export default http