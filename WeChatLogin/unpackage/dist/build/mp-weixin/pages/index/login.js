(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/login"],{"40d1":function(n,e,t){"use strict";t.r(e);var o=t("7f69"),i=t.n(o);for(var s in o)"default"!==s&&function(n){t.d(e,n,(function(){return o[n]}))}(s);e["default"]=i.a},"7f69":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o(t("bfa4"));function o(n){return n&&n.__esModule?n:{default:n}}var i=function(){t.e("components/cmd-page-body/cmd-page-body").then(function(){return resolve(t("65db"))}.bind(null,t)).catch(t.oe)},s=function(){t.e("components/cmd-transition/cmd-transition").then(function(){return resolve(t("3795"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/cmd-input/cmd-input").then(function(){return resolve(t("9141"))}.bind(null,t)).catch(t.oe)},a={components:{cmdPageBody:i,cmdTransition:s,cmdInput:c},data:function(){var n=this;return{$http:n.$http,status:!0,usernameReg:/^[A-Za-z0-9]+$/,passwordReg:/^\w+$/,phoneReg:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,mobile:{phone:"18652848780",code:""},account:{username:"",password:""},safety:{time:60,state:!1,interval:""},loginMobile:!1,loginAccount:!1}},methods:{fnLogin:function(){var e=this;this.status?this.$http.post("/applogin",{phone:this.mobile.phone,code:this.mobile.code}).then((function(n){console.log("请求成功"),e.addStorge(n)})).catch((function(e){console.log("请求失败"),console.log(e),n.showToast({title:e.data.msg,icon:"none",duration:2e3})})):this.$http.post("/login",{username:this.account.username,password:this.account.password}).then((function(n){console.log("请求成功"),e.addStorge(n)})).catch((function(e){console.log("请求失败"),n.showToast({title:e.data.msg,icon:"none",duration:2e3})}))},fnGetPhoneCode:function(){var e=this;this.phoneReg.test(this.mobile.phone)?n.showToast({title:"正在发送验证码",icon:"loading",success:function(){e.safety.state=!0,e.safety.interval=setInterval((function(){e.safety.time--<=0&&(e.safety.time=60,e.safety.state=!1,clearInterval(e.safety.interval))}),1e3),n.showToast({title:"发送成功",icon:"success"}),e.mobile.code="123456"}}):n.showToast({title:"手机号不正确",icon:"none"})},fnChangeStatus:function(n){this.mobile={phone:"18652848780",code:""},this.loginMobile=!1,this.account={username:"",password:""},this.loginAccount=!1,clearInterval(this.safety.interval),this.safety.time=60,this.safety.state=!1,n||(this.status=!this.status)},addStorge:function(e){console.log("res"),n.setStorageSync("token",e.data.token),n.setStorageSync("username",e.data.username),n.setStorageSync("userid",e.data.userid),n.reLaunch({url:"./Info"})},weiXinLogin:function(){n.getProvider({service:"oauth",success:function(e){console.log(e.provider),~e.provider.indexOf("weixin")&&n.login({provider:"weixin",success:function(e){console.log("-------获取openid(unionid)-----"),console.log(JSON.stringify(e)),n.getUserInfo({provider:"weixin",success:function(e){console.log("-------获取微信用户所有-----"),console.log(JSON.stringify(e.userInfo));var t="欢迎您"+e.userInfo.nickName;n.showToast({title:t,icon:"none",duration:2e3})}})},fail:function(n){console.log("App微信获取用户信息失败",n)}})}})},getUserInfo:function(){console.log("小程序授权"),n.getUserProfile({desc:"用于完善会员资料",lang:"zh_CN",success:function(e){console.log("getUserProfile成功"),console.log(JSON.stringify(e)),n.login({provider:"weixin",success:function(t){console.log(t),n.request({url:"https://api.weixin.qq.com/sns/jscode2session",data:{js_code:t.code,grant_type:"authorization_code",appid:"wx8055815d326ad864",secret:"794a2d9802450a03817932e17de3efab"},method:"GET",header:{"content-type":"application/json"},success:function(t){console.log("auth.code2Session成功"),console.log(JSON.stringify(t));var o="欢迎您"+JSON.parse(e.rawData).nickName;n.showToast({title:o,icon:"none",duration:2e3})},fail:function(n){console.log("auth.code2Session失败",n)}})}})},fail:function(n){console.log("getUserProfile失败"),console.log(JSON.stringify(n))}})}},watch:{mobile:{handler:function(n){this.phoneReg.test(n.phone)&&6===n.code.length?this.loginMobile=!0:this.loginMobile=!1},deep:!0},account:{handler:function(n){n.username.length>=5&&n.password.length>=5?this.loginAccount=!0:this.loginAccount=!1},deep:!0}},mounted:function(){this.account.username="admin"},created:function(){},onLoad:function(e){"error"==e.type&&n.showToast({title:"获取个人信息失败！",icon:"none",duration:2e3})}};e.default=a}).call(this,t("543d")["default"])},"90eb":function(n,e,t){"use strict";(function(n){t("e0b1");o(t("66fd"));var e=o(t("ff18"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},"99c1":function(n,e,t){"use strict";t.d(e,"b",(function(){return i})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return o}));var o={cmdPageBody:function(){return t.e("components/cmd-page-body/cmd-page-body").then(t.bind(null,"65db"))},cmdTransition:function(){return t.e("components/cmd-transition/cmd-transition").then(t.bind(null,"3795"))},cmdInput:function(){return t.e("components/cmd-input/cmd-input").then(t.bind(null,"9141"))}},i=function(){var n=this,e=n.$createElement;n._self._c;n._isMounted||(n.e0=function(e){!n.safety.state&&n.fnGetPhoneCode()})},s=[]},be26:function(n,e,t){"use strict";var o=t("eb16"),i=t.n(o);i.a},eb16:function(n,e,t){},ff18:function(n,e,t){"use strict";t.r(e);var o=t("99c1"),i=t("40d1");for(var s in i)"default"!==s&&function(n){t.d(e,n,(function(){return i[n]}))}(s);t("be26");var c,a=t("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=u.exports}},[["90eb","common/runtime","common/vendor"]]]);