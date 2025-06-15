<template>
  <view class="content">
    <view class="title">
      <view class="left-items">
        <view>首页</view>
        <view>联系我们</view>
      </view>
    </view>
    <view class="login-container">
      <view class="login-title">用户登录</view>
      <view class="input-container">
        <input type="text" placeholder="用户名或者手机号" placeholder-style="font-weight: bold" />
      </view>
      <view class="input-container">
        <input type="password" placeholder="密码" placeholder-style="font-weight: bold" />
      </view>
      <view class="button-container">
        <button class="login-button" @click="goIndex">登录</button>
      </view>
      <view class="links-container">
        <view class="register-link" @click="goRegister">注册</view>
        <view class="forgot-password-link">忘记密码</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  methods: {
    goRegister() {
      uni.navigateTo({
        url: '/pages/register/register' // 确保路径正确
      });
    },
	goIndex(){
		uni.navigateTo({
			url:'/pages/shop/shop'
		})
	}
  }
}
</script>


<style>

@import './login.css';

</style>

