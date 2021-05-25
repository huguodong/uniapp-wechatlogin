<template>
	<view>
		<view class="person-head">
		  <!-- <cmd-avatar id="head_img" :src="account.avatar" @click="fnInfoWin" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar> -->
		  <view class="cu-avatar xl round margin-left" :style="{backgroundImage: 'url(' + account.avatar + ')'}"></view>
		  <view class="person-head-box">
		    <view id="phone" class="person-head-nickname">{{account.phone}}</view>
		    <view id="username" class="person-head-username">{{account.name}}</view>
		  </view>
		</view>
		<view class="person-list">
		  <cmd-cell-item title="我的设备" slot-left arrow>
		    <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
		  </cmd-cell-item>
		  <cmd-cell-item title="消息通知" slot-left arrow>
		    <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
		  </cmd-cell-item>
		  <cmd-cell-item title="系统设置" slot-left arrow>
		    <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
		  </cmd-cell-item>
		  <cmd-cell-item title="检查版本" addon="v1.0" slot-left arrow>
		    <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
		  </cmd-cell-item>
		</view>
		<view>
			 <button class="btn-logout" @tap="loginOut()">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const _this = this
			return {
				$http: _this.$http,
				account:{
					phone:"186xxxxxxxx",
					name:"Administrator",
					avatar:"../../static/head.jpg",
				}
			}
		},
		methods: {
			loginOut() {
				uni.reLaunch({
					url: './login'
				});
			}
		},
		mounted() {
			var userid=uni.getStorageSync("userid");
				console.log(userid)
			this.$http.get('/user/detail',{
				 params: {id: userid}, 
			}).then(res=>{
				uni.showToast({
					title: "欢迎回来！",
					icon: 'none',
					duration: 2000
				});
				this.account.name=res.data.name;
				this.account.phone=res.data.phone;
				this.account.avatar=res.data.avatar;
				console.log("请求成功")
				
			}).catch(err=>{
				console.log(err.data.msg)
				uni.reLaunch({
					url: './login?type=error'
				})
			})
			
			
		}
	}
</script>

<style>

  .person-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    padding-left: 20px;
    background: linear-gradient(to right, #365fff, #36bbff);
  }
  .person-head-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
  }
  
  .person-head-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  
  .person-head-username {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
  }
  
  .person-list {
    line-height: 0;
  }
  
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #365fff, #36bbff);
  }
  
  .btn-logout-hover {
    background: linear-gradient(to right, #365fdd, #36bbfa);
  }
</style>
