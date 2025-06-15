<template>
  <view class="register-page">
    <!-- 顶部导航栏 -->
    <view class="title">
      <view class="left-items">
        <view>首页</view>
        <view>联系我们</view>
      </view>
    </view>
    
    <view class="header">
      <view class="logo">用户注册</view>
    </view>
    
    <view class="form-container">
      <!-- 表单内容 -->
      <view class="form-group">
        <input type="text" placeholder="用户名" placeholder-style="font-weight: bold" />
      </view>
      <view class="form-group">
        <input type="text" placeholder="手机号" placeholder-style="font-weight: bold" />
      </view>
      <view class="form-group">
        <input type="password" placeholder="设置密码" placeholder-style="font-weight: bold" />
      </view>
      <view class="form-group">
        <input type="password" placeholder="确认密码" placeholder-style="font-weight: bold" />
      </view>
      
      <!-- 注册按钮 -->
      <button class="register-btn">立即注册</button>
      
      <!-- 登录链接（移动到注册按钮下方） -->
      <view class="login-link-container">
        <view class="login-link" @click="goBack">
          <text class="login-link-text">已有账号？</text>
          <text class="login-link-action">去登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style>
/* 重置默认样式 */
page, view, input, button {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 防止滚动 */
page {
  overflow: hidden;
  height: 100vh;
}

.register-page {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("/static/1.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* 顶部导航栏样式 */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 10px 15px;
  margin-top: 10px;
  margin-left: 5px;
}

.left-items {
  display: flex;
  gap: 20px;
}

.title view {
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.title view:hover {
  opacity: 0.8;
}

.header {
  display: flex;
  justify-content: center;
  padding: 20px 0 30px; /* 增大标题区的上下间距 */
}

.logo {
  font-size: 24px; /* 增大标题字体 */
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* 增强文字阴影 */
}

/* 表单容器居中并向下调整位置 */
.form-container {
  width: 100%;
  max-width: 320px; /* 稍微增大表单宽度 */
  margin: 5vh auto 0; /* 顶部间距增大为视口高度的5%，底部保持自动 */
  padding: 20px; /* 增大表单内边距 */
  background-color: rgba(255, 255, 255, 0.15); /* 增强表单背景透明度 */
  backdrop-filter: blur(12px); /* 增强毛玻璃效果 */
  border-radius: 18px; /* 增大圆角 */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); /* 增强阴影 */
}

.form-group {
  margin-bottom: 18px; /* 增大输入框间距 */
}

.form-group input {
  width: 100%;
  height: 44px; /* 增大输入框高度 */
  padding: 0 18px; /* 增大输入框内边距 */
  border: 1px solid rgba(255, 255, 255, 0.6); /* 增强边框透明度 */
  border-radius: 22px; /* 增大输入框圆角 */
  font-size: 15px; /* 增大字体大小 */
  background-color: rgba(255, 255, 255, 0.25); /* 增强输入框背景透明度 */
  backdrop-filter: blur(10px); /* 增强输入框毛玻璃效果 */
  color: white;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: rgba(255, 255, 255, 0.9); /* 增强聚焦时的边框颜色 */
  background-color: rgba(255, 255, 255, 0.35); /* 增强聚焦时的背景透明度 */
  transform: translateY(-1px); /* 聚焦时轻微上浮 */
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1); /* 添加聚焦时的阴影 */
}

.form-group input::placeholder {
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8); /* 增强占位符文字透明度 */
}

.register-btn {
  width: 100%;
  height: 46px; /* 增大按钮高度 */
  line-height: 46px;
  border-radius: 23px; /* 增大按钮圆角 */
  background-color: rgba(255, 255, 255, 0.95); /* 增强按钮背景透明度 */
  color: #333;
  font-size: 17px; /* 增大按钮字体大小 */
  font-weight: bold;
  margin-top: 25px; /* 增大按钮顶部间距 */
  margin-bottom: 15px; /* 增大按钮底部间距 */
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15); /* 增强按钮阴影 */
  transition: all 0.3s ease;
}

.register-btn:hover {
  background-color: white;
  transform: translateY(-2px); /* 悬停时上浮更多 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* 悬停时增强阴影 */
}

/* 登录链接容器 */
.login-link-container {
  margin-top: 20px; /* 增大登录链接顶部间距 */
  text-align: center;
}

.login-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px; /* 增大链接内边距 */
  font-size: 15px; /* 增大链接字体大小 */
  color: white;
  background-color: rgba(255, 255, 255, 0.12); /* 调整链接背景透明度 */
  border-radius: 25px; /* 增大链接圆角 */
  transition: all 0.3s ease;
}

.login-link:hover {
  background-color: rgba(255, 255, 255, 0.25); /* 悬停时增强背景透明度 */
  transform: translateY(-2px); /* 悬停时上浮更多 */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1); /* 悬停时添加阴影 */
}

.login-link-text {
  margin-right: 4px; /* 增大文字间距 */
  color: rgba(255, 255, 255, 0.85); /* 调整文字透明度 */
}

.login-link-action {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.6); /* 调整下划线透明度 */
}
</style>
