<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<cmd-page-body type="top">
			<view class="login">
				<!-- 上部分 start -->
				<view class="login-title">{{ status ? '手机快捷登录': '使用账号密码登录'}}</view>
				<view class="login-explain">{{ status ? '已注册用户可通过手机验证码直接登录': '未注册用户可通过点击右上角进行注册'}}</view>
				<!-- 手机表单登录 start -->
				<!-- #ifdef H5 -->
				<cmd-transition name="fade-up">
					<view v-if="status">
						<view class="login-phone">
							<cmd-input v-model="mobile.phone" type="number" maxlength="11" placeholder="请输入手机号">
							</cmd-input>
							<view class="login-phone-getcode" @tap="!safety.state ? fnGetPhoneCode() : ''">
								{{!safety.state&&'获取验证码'||(safety.time+' s')}}
							</view>
						</view>
						<view class="login-code">
							<cmd-input v-model="mobile.code" type="number" maxlength="6" placeholder="请输入短信验证码">
							</cmd-input>
						</view>
						<button class="btn-login" :class="loginMobile ? 'btn-login-active':''" :disabled="!loginMobile"
							hover-class="btn-login-hover" @tap="fnLogin">登录</button>
					</view>
				</cmd-transition>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<cmd-transition name="fade-up" v-if="status">
					<view class="login-phone">
						<cmd-input v-model="mobile.phone" type="number" maxlength="11" placeholder="请输入手机号">
						</cmd-input>
						<view class="login-phone-getcode" @tap="!safety.state ? fnGetPhoneCode() : ''">
							{{!safety.state&&'获取验证码'||(safety.time+' s')}}
						</view>
					</view>
					<view class="login-code">
						<cmd-input v-model="mobile.code" type="number" maxlength="6" placeholder="请输入短信验证码"></cmd-input>
					</view>
					<button class="btn-login" :class="loginMobile ? 'btn-login-active':''" :disabled="!loginMobile"
						hover-class="btn-login-hover" @tap="fnLogin">登录</button>
				</cmd-transition>
				<!-- #endif -->
				<!-- 手机表单登录 end -->
				<!-- 账号表单登录 start -->
				<!-- #ifdef H5 -->
				<cmd-transition name="fade-up">
					<view v-if="!status">
						<view class="login-username">
							<cmd-input v-model="account.username" type="text" maxlength="26" placeholder="请输入账号"
								value="admin">
							</cmd-input>
						</view>
						<view class="login-password">
							<cmd-input v-model="account.password" type="password" displayable maxlength="26"
								placeholder="请输入密码"></cmd-input>
						</view>
						<button class="btn-login" :class="loginAccount ? 'btn-login-active':''"
							:disabled="!loginAccount" hover-class="btn-login-hover" @tap="fnLogin">登录</button>
					</view>
				</cmd-transition>
				<!-- #endif -->
				<!-- #ifndef H5 -->
				<cmd-transition name="fade-up" v-if="!status">
					<view class="login-username">
						<cmd-input v-model="account.username" type="text" maxlength="26" placeholder="请输入账号">
						</cmd-input>
					</view>
					<view class="login-password">
						<cmd-input v-model="account.password" type="password" displayable maxlength="26"
							placeholder="请输入密码"></cmd-input>
					</view>
					<button class="btn-login" :class="loginAccount ? 'btn-login-active':''" :disabled="!loginAccount"
						hover-class="btn-login-hover" @tap="fnLogin">登录</button>
				</cmd-transition>
				<!-- #endif -->
				<!-- 账号表单登录 end -->
				<!-- 切换登录方式 -->
				<view class="login-mode" @tap="fnChangeStatus(false)">{{status ?	'账号密码登录' : '手机快捷登录'}}</view>
				<view class="otherLoginWays">
					<view class="otherWayTextWrapper">
						<view class="otherWayText">其他登录方式</view>
					</view>
					<view class="icons">
						<slot name="otherLoginWays_icons">
							<!-- <img class="icon" src="../../static/images/icon_QQ.png" @click="$emit('qq_login')" alt="qqLogin"> -->
							<!-- <img class="icon" src="../../static/icon_weixin.png" @tap="weiXinLogin()" alt="weixinLogin"> -->
							<!-- <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="weiXinLogin">授权登录
                </button> -->



							<!-- 		<button type="default" open-type="getUserInfo" @getuserinfo="getUserInfo"
									withCredentials="true">小程序登录</button> -->
							<!-- #ifdef MP-WEIXIN -->
							<!-- 		<button class="mp-login cu-btn cuIcon " type="default" open-type="getUserInfo"
								@getuserinfo="getUserInfo" withCredentials="true"> </button> -->
							<image class="avatar" src="../../static/icon_weixin.png" @tap="getUserInfo()"
								alt="weixinLogin">
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<image class="avatar" src="../../static/icon_weixin.png" @tap="weiXinLogin()"
									alt="weixinLogin">

									<!-- #endif -->

									<!-- <img class="icon" src="../../static/images/icon_weibo.png" @click="$emit('weibo_login')" alt="weiboLogin"> -->
						</slot>
					</view>
				</view>
			</view>

		</cmd-page-body>
	</view>
</template>

<script>
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdInput from "@/components/cmd-input/cmd-input.vue"
	import md5 from "../../commons/md5.js";
	export default {
		components: {
			cmdPageBody,
			cmdTransition,
			cmdInput
		},
		data() {
			const _this = this
			return {
				$http: _this.$http,
				status: true,
				usernameReg: /^[A-Za-z0-9]+$/,
				passwordReg: /^\w+$/,
				phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				//输入框
				mobile: {
					phone: '18652848780',
					code: ''
				},
				// 账号登录部分数据
				account: {
					username: '',
					password: ''
				},
				//获取验证码
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				loginMobile: false,
				loginAccount: false,

			}
		},

		methods: {
			/**
			 * 登录按钮点击执行
			 */
			fnLogin() {
				if (this.status) {
					this.$http.post('/applogin', {
						phone: this.mobile.phone,
						code: this.mobile.code
					}).then(res => {
						console.log("请求成功");
						// console.log(res);
						this.addStorge(res);
					}).catch(err => {
						console.log("请求失败");
						console.log(err);
						uni.showToast({
							title: err.data.msg,
							icon: 'none',
							duration: 2000
						});
					})
				} else {

					this.$http.post('/login', {
						username: this.account.username,
						password: this.account.password
					}).then(res => {
						console.log("请求成功");
						// console.log(res);
						this.addStorge(res);
					}).catch(err => {
						console.log("请求失败");
						// console.log(err);
						uni.showToast({
							title: err.data.msg,
							icon: 'none',
							duration: 2000
						});
					})
				}
			},
			/**
			 * 获取验证码
			 */
			fnGetPhoneCode() {
				if (this.phoneReg.test(this.mobile.phone)) {
					uni.showToast({
						title: "正在发送验证码",
						icon: "loading",
						success: () => {
							// 成功后显示倒计时60s后可在点击
							this.safety.state = true;
							// 倒计时
							this.safety.interval = setInterval(() => {
								if (this.safety.time-- <= 0) {
									this.safety.time = 60;
									this.safety.state = false;
									clearInterval(this.safety.interval);
								}
							}, 1000);
							uni.showToast({
								title: "发送成功",
								icon: "success",

							});
							this.mobile.code = "123456"
						}
					})
				} else {
					uni.showToast({
						title: "手机号不正确",
						icon: "none"
					})
				}
			},
			/**
			 * 改变登录方式状态 reset作为重置标识
			 */
			fnChangeStatus(reset) {
				// 手机登录部分
				this.mobile = {
					phone: '18652848780',
					code: ''
				}
				this.loginMobile = false
				// 账号登录部分
				this.account = {
					username: '',
					password: ''
				}
				this.loginAccount = false
				// 验证码时间状态还原
				clearInterval(this.safety.interval);
				this.safety.time = 60;
				this.safety.state = false;
				if (!reset) {
					// 可以延迟3毫秒后切换
					this.status = !this.status;
				}
			},
			addStorge(res) {
				console.log("res")
				uni.setStorageSync("token", res.data.token);
				uni.setStorageSync("username", res.data.username)
				uni.setStorageSync("userid", res.data.userid)
				uni.reLaunch({
					url: './Info'
				})
			},
			weiXinLogin() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res.provider);
						//支持微信、qq和微博等
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log('-------获取openid(unionid)-----');
									console.log(JSON.stringify(loginRes));
									// uni.authorize({
									//     scope: 'scope.userInfo',
									//     success() {
									//         console.log("授权成功!")
									//     },
									// 	fail(err) {
									// 		 console.log(err)
									// 	}
									// })
									// 获取用户信息
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log('-------获取微信用户所有-----');
											console.log(JSON.stringify(infoRes
												.userInfo));
											var info = "欢迎您" + infoRes.userInfo
												.nickName
											uni.showToast({
												title: info,
												icon: 'none',
												duration: 2000
											});
										}
									});
								},
								fail: function(res) {
									console.log("App微信获取用户信息失败", res);
								}
							});
						}
					}
				});
			},
			getUserInfo() {
				console.log("小程序授权")
				uni.getUserProfile({
					desc: '用于完善会员资料',
					lang: 'zh_CN',
					success(user) {
						console.log(JSON.stringify(user));
						var info = "欢迎您" + JSON.parse(user.rawData)
							.nickName
						uni.showToast({
							title: info,
							icon: 'none',
							duration: 2000
						});
						// 获取用户信息
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes);

								// 获取用户信息
								//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
								//不推荐在app端使用
								// uni.request({
								// 	url: 'https://api.weixin.qq.com/sns/jscode2session',
								// 	data: {
								// 		js_code: loginRes.code,
								// 		grant_type: 'authorization_code',
								// 		"appid": "wx8055815d326ad864",
								// 		"secret": "794a2d9802450a03817932e17de3efab"
								// 	},
								// 	method: 'GET',
								// 	header: {
								// 		'content-type': 'application/json'
								// 	},
								// 	success: (res) => {
								// 		uni.showToast({
								// 			title: "身份校验成功",
								// 			icon: 'none',
								// 			duration: 2000
								// 		});
								// 		//openId、或SessionKdy存储//隐藏loading
								// 		console.log("auth.code2Session成功")
								// 		console.log(JSON.stringify(res));
								// 	},
								// 	fail: (err) => {
								// 		uni.showModal({
								// 			title: '请求失败',
								// 			content: JSON.stringify(err).toString(),
								// 			success: function (res) {
								// 				if (res.confirm) {
								// 					console.log('用户点击确定');
								// 				} else if (res.cancel) {
								// 					console.log('用户点击取消');
								// 				}
								// 			}
								// 		});
										
								// 		//openId、或SessionKdy存储//隐藏loading
								// 		console.log("auth.code2Session失败", err)
								// 	}
								// });
							}
						});
					},
					fail(err) {
						console.log("getUserProfile失败")
						console.log(JSON.stringify(err));
					}
				})
				// uni.login({
				// 	provider: 'weixin',
				// 	success: function(loginRes) {
				// 		console.log(loginRes);
				// 		// 获取用户信息
				// 		//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
				// 		uni.request({
				// 			url: 'https://api.weixin.qq.com/sns/jscode2session',
				// 			data: {
				// 				js_code: loginRes.code,
				// 				grant_type: 'authorization_code',
				// 				"appid": "wx8055815d326ad864",
				// 				"secret": "794a2d9802450a03817932e17de3efab"
				// 			},
				// 			method: 'GET',
				// 			header: {
				// 				'content-type': 'application/json'
				// 			},
				// 			success: (res) => {
				// 				//openId、或SessionKdy存储//隐藏loading
				// 				console.log("auth.code2Session成功")
				// 				console.log(JSON.stringify(res));
				// 			},
				// 			fail: (err) => {
				// 				//openId、或SessionKdy存储//隐藏loading
				// 				console.log("auth.code2Session失败", err)
				// 			}
				// 		});
				// 	}
				// });


			}
		},
		watch: {
			/**
			 * 监听手机登录数值
			 */
			mobile: {
				handler(newValue) {
					if (this.phoneReg.test(newValue.phone) && newValue.code.length === 6) {
						this.loginMobile = true;
					} else {
						this.loginMobile = false;
					}
				},
				deep: true
			},
			/**
			 * 监听账号登录数值
			 */
			account: {
				handler(newValue) {
					if (newValue.username.length >= 5 && newValue.password.length >= 5) {

						this.loginAccount = true;

					} else {
						this.loginAccount = false
					}
				},
				deep: true
			}
		},
		mounted() {
			// document.querySelector('.uni-page-head-hd').style.display = 'none'
			this.account.username = "admin"
		},
		created() {

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// console.log(option); //打印出上个页面传递的参数。
			if (option.type == 'error') {
				uni.showToast({
					title: "获取个人信息失败！",
					icon: 'none',
					duration: 2000
				});
			}
		},
	}
</script>

<style lang='scss'>
	.mp-login {
		background: url(../../static/icon_weixin.png);
		background-size: 100% 100%;
	}

	.cu-btn.cuIcon {
		width: 84upx;
		height: 84upx;
	}

	.avatar {
		width: 90upx;
		height: 90upx;
	}

	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.login {
		border-color: #007AFF;
		margin-top: 156upx;
		margin-right: 72upx;
		margin-left: 72upx;
	}

	.login-title {
		font-size: 56upx;
		font-weight: 500;
	}

	.login-explain {
		font-size: 28upx;
		color: #9E9E9E;
	}

	.login-phone {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2upx #dedede solid;
		margin-top: 56upx;
		margin-bottom: 40upx;
	}

	.login-phone-getcode {
		color: #3F51B5;
		text-align: center;
		width: 230upx;
		/* min-width: 130upx;
		max-width: 160upx; */
		/* font-size: 30upx; */
	}

	.login-code {
		border-bottom: 2upx #dedede solid;
	}

	.btn-login {
		margin-top: 100upx;
		border-radius: 50upx;
		font-size: 16px;
		color: #fff;
		background: linear-gradient(to right, #88a1f9, #9ac6ff);
	}

	.btn-login-active {
		background: linear-gradient(to right, #365fff, #36bbff);
	}

	.btn-login-hover {
		background: linear-gradient(to right, #365fdd, #36bbfa);
	}

	.login-username {
		margin-top: 56upx;
		margin-bottom: 40upx;
		border-bottom: 2upx #dedede solid;
	}

	.login-password {
		border-bottom: 2upx #dedede solid;
	}

	button[disabled] {
		color: #fff;
	}

	.login-mode {
		text-align: center;
		margin-top: 32upx;
	}

	.otherLoginWays {
		top: 50upx;
		width: 80%;
		position: relative;
		bottom: 8.2%;
		left: 10%;
		right: 10%;
		text-align: center;

		.otherWayTextWrapper {
			line-height: 0;

			&:before,
			&:after {
				position: absolute;
				background: #ddd;
				content: "";
				height: 1px;
				width: 30%;
			}

			&:before {
				left: 0;
			}

			&:after {
				right: 0;
			}

			.otherWayText {
				font-size: .8rem;
				color: #bbbbbb;
			}
		}

		.icons {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-top: 1.4em;

			img {
				width: 2rem;
				height: 2em;
			}
		}
	}

	.protocol {
		position: fixed;
		bottom: 4%;
		left: 2%;
		right: 2%;
		font-size: .72em;
		margin-top: 8%;
		color: #333333;

		span {
			color: #2986de;
		}
	}
</style>
