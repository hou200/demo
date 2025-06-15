<template>
  <view class="header-nav-fixed">
    <!-- 搜索框 -->
    <view class="search-box" @click="openSearch">
      <uni-icons type="search" size="16" color="#999"></uni-icons>
      <text class="placeholder">搜索商品、店铺</text>
    </view>
    <!-- 定位信息 -->
    <view class="location" @click="openLocation">
      <text class="location-text">北京市</text>
      <uni-icons type="arrowdown" size="14" color="#333"></uni-icons>
    </view>
    <!-- 用户图标 -->
    <view class="user-icon" @click="openUserCenter">
      <uni-icons type="person" size="22" color="#333"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HeaderNav',
  methods: {
    openSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      });
    },
    openLocation() {
      uni.showActionSheet({
        itemList: ['北京市', '上海市', '广州市', '深圳市', '杭州市'],
        success: (res) => {
          // 处理选择结果
        }
      });
    },
    openUserCenter() {
      uni.navigateTo({
        url: '/pages/user/index'
      });
    }
  }
}
</script>

<style scoped>
.header-nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx;
  background-color: #FF5722;
  height: 140rpx;
  width: 100%;
  box-sizing: border-box;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 80rpx;
  margin-right: 20rpx;
  padding: 0 20rpx;
  background-color: white;
  border-radius: 40rpx;
}

.placeholder {
  margin-left: 10rpx;
  color: #999;
  font-size: 28rpx;
}

.location {
  display: flex;
  align-items: center;
  color: white;
  font-size: 30rpx;
}

.location-text {
  margin-right: 10rpx;
}

.user-icon {
  color: white;
}
</style> 