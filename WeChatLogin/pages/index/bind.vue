<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<cmd-page-body type="top">
			<view class="login">
				<view class="login-title">绑定您的手机号!</view>
				<cmd-transition name="fade-up">
					<view>
						<view class="login-phone">
							<cmd-input v-model="mobile.phone" type="number" maxlength="11" placeholder="请输入手机号">
							</cmd-input>
							<view class="login-phone-getcode" @tap="fnGetPhoneCode">
								{{!safety.state&&'获取验证码'||(safety.time+' s')}}
							</view>
						</view>
						<view class="login-code">
							<cmd-input v-model="mobile.code" type="number" maxlength="6" placeholder="请输入短信验证码">
							</cmd-input>
						</view>
						<button class="btn-login" :class="bindMobile ? 'btn-login-active':''" :disabled="!bindMobile"
							hover-class="btn-login-hover" @tap="fnBind">绑定手机号</button>
					</view>
				</cmd-transition>
			</view>
		</cmd-page-body>
	</view>
</template>

<script>
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	import cmdInput from "@/components/cmd-input/cmd-input.vue"
	export default {
		data() {
			return {
				phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				//输入框
				mobile: {
					phone: '18652848780',
					code: ''
				},
				//获取验证码
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				bindMobile: false,
				openId:""
			}
		},
		methods: {
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
			fnBind() {
				console.log("openId",this.openId);
				this.$http.post('/wxbind', {
					openId: this.openId,
					phone:this.mobile.phone,
					code:this.mobile.code
				}).then(res => {
					console.log("绑定成功,准备登录");
					uni.setStorageSync("token", res.data.token);
					uni.setStorageSync("username", res.data.username)
					uni.setStorageSync("userid", res.data.userid)
					uni.reLaunch({
						url: './Info'
					}) 
				}).catch(err => {
					console.log("微信绑定失败",err);
					uni.showToast({
						title: err.data.msg,
						icon: 'none',
						duration: 2000
					});
				})
			}
		},
		watch: {
			mobile: {
				handler(newValue) {
					if (this.phoneReg.test(newValue.phone) && newValue.code.length === 6) {
						this.bindMobile = true;
					} else {
						this.bindMobile = false;
					}
				},
				deep: true
			}
		},
		onLoad: function(option) {
			// option.openId="1"
			if(option.openId===undefined){
				uni.redirectTo({
					url: './login?type=openid'
				})
			}else{
				this.openId=option.openId;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/style/login.scss";

	page {
		background: #fff;
	}
	
	.btn-login {
		margin-top: 50upx;

	}
	.login-title {
		color: #7c7c7c;
	}
</style>
