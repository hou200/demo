<template>
  <view class="tab-bar">
    <view 
      class="tab-item" 
      :class="{ active: currentTab === 0 }" 
      @click="switchTab(0)"
    >
      <uni-icons type="home" size="24" :color="currentTab === 0 ? '#FF5722' : '#999'"></uni-icons>
      <text class="tab-text" :style="{ color: currentTab === 0 ? '#FF5722' : '#999' }">主页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentTab === 1 }" 
      @click="switchTab(1)"
    >
      <uni-icons type="apps" size="24" :color="currentTab === 1 ? '#FF5722' : '#999'"></uni-icons>
      <text class="tab-text" :style="{ color: currentTab === 1 ? '#FF5722' : '#999' }">分类</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentTab === 2 }" 
      @click="switchTab(2)"
    >
      <view class="cart-tab-container">
        <uni-icons type="shoppingcart" size="24" :color="currentTab === 2 ? '#FF5722' : '#999'"></uni-icons>
        <text class="tab-text" :style="{ color: currentTab === 2 ? '#FF5722' : '#999' }">购物车</text>
        <text class="badge-count" v-if="cartCount > 0">{{ cartCount }}</text>
      </view>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: currentTab === 3 }" 
      @click="switchTab(3)"
    >
      <uni-icons type="person" size="24" :color="currentTab === 3 ? '#FF5722' : '#999'"></uni-icons>
      <text class="tab-text" :style="{ color: currentTab === 3 ? '#FF5722' : '#999' }">我的</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    currentTab: {
      type: Number,
      default: 0
    },
    cartCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchTab(index) {
      // 立即更新当前选中的标签页
      this.$emit('tabChange', index);
      
      const tabUrls = [
        '/pages/shop/shop',
        '/pages/category/category',
        '/pages/shopcar/shopcar',
        '/pages/user/user'
      ];
      
      if (index >= 0 && index < tabUrls.length) {
        // 使用reLaunch跳转到tabBar页面，避免页面栈问题
        uni.reLaunch({
          url: tabUrls[index],
          success: () => {
            console.log(`成功跳转到 ${tabUrls[index]}`);
          },
          fail: (err) => {
            console.error('跳转失败:', err);
            uni.showToast({
              title: '页面跳转失败',
              icon: 'none'
            });
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  height: 100rpx;
  border-top: 1rpx solid #eee;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.tab-text {
  margin-top: 5rpx;
  font-size: 22rpx;
  display: block;
}

.cart-tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.badge-count {
  position: absolute;
  top: -10rpx;
  right: -20rpx;
  background-color: #FF5722;
  color: white;
  border-radius: 50%;
  width: 34rpx;
  height: 34rpx;
  line-height: 34rpx;
  text-align: center;
  font-size: 22rpx;
  z-index: 1;
}
</style> 