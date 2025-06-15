<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <!-- 搜索框 -->
      <view class="search-box" @click="openSearch">
        <uni-icons type="search" size="16" color="#999"></uni-icons>
        <text class="placeholder">搜索商品、店铺</text>
      </view>
      
      <!-- 定位信息（移到搜索框右侧） -->
      <view class="location" @click="openLocation">
        <text class="location-text">北京市</text>
        <uni-icons type="arrowdown" size="14" color="#333"></uni-icons>
      </view>
      
      <!-- 用户图标 -->
      <view class="user-icon" @click="openUserCenter">
        <uni-icons type="person" size="22" color="#333"></uni-icons>
      </view>
    </view>
    
    <!-- 轮播图 -->
    <swiper class="banner" indicator-dots autoplay interval="5000" duration="500">
      <block v-for="(item, index) in banners" :key="index">
        <swiper-item>
          <image :src="item.image" mode="aspectFill" class="banner-image"></image>
        </swiper-item>
      </block>
    </swiper>
    
    <!-- 功能图标 -->
    <view class="function-icons">
      <view class="icon-item" v-for="(item, index) in functionItems" :key="index" @click="navigateTo(item.url)">
        <image :src="item.icon" mode="aspectFit" class="icon-image"></image>
        <text class="icon-text">{{item.text}}</text>
      </view>
    </view>
    
    <!-- 促销活动 -->
    <view class="promotion">
      <view class="promotion-title">
        <text class="title-text">限时促销</text>
        <text class="more-text" @click="showMorePromotion">更多</text>
      </view>
      <view class="promotion-items">
        <view class="promotion-item" v-for="(item, index) in promotionItems" :key="index">
          <image :src="item.image" mode="aspectFill" class="promotion-image"></image>
          <text class="promotion-name">{{item.name}}</text>
          <text class="promotion-price">¥{{item.price}}</text>
        </view>
      </view>
    </view>
    
    <!-- 商品推荐 -->
    <view class="recommend">
      <view class="recommend-title">
        <text class="title-text">猜你喜欢</text>
      </view>
      <view class="recommend-items">
        <view class="recommend-item" v-for="(item, index) in recommendItems" :key="index">
          <image :src="item.image" mode="aspectFill" class="recommend-image"></image>
          <text class="recommend-name">{{item.name}}</text>
          <view class="recommend-info">
            <text class="recommend-price">¥{{item.price}}</text>
            <view class="recommend-sales">
              <text>{{item.sales}}人已买</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
        <uni-icons type="home" size="24" :color="currentTab === 0 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 0 ? '#FF5722' : '#999' }">主页</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
        <uni-icons type="apps" size="24" :color="currentTab === 1 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 1 ? '#FF5722' : '#999' }">分类</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 2 }" @click="switchTab(2)">
        <view class="cart-badge">
          <uni-icons type="shoppingcart" size="24" :color="currentTab === 2 ? '#FF5722' : '#999'"></uni-icons>
          <!-- 移除了badge-count -->
        </view>
        <text :style="{ color: currentTab === 2 ? '#FF5722' : '#999' }">购物车</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 3 }" @click="switchTab(3)">
        <uni-icons type="person" size="24" :color="currentTab === 3 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 3 ? '#FF5722' : '#999' }">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      banners: [
        { image: 'https://picsum.photos/750/300?random=1' },
        { image: 'https://picsum.photos/750/300?random=2' },
        { image: 'https://picsum.photos/750/300?random=3' }
      ],
      functionItems: [
        { icon: 'https://picsum.photos/80/80?random=10', text: '超市', url: '/pages/market/index' },
        { icon: 'https://picsum.photos/80/80?random=11', text: '生鲜', url: '/pages/fresh/index' },
        { icon: 'https://picsum.photos/80/80?random=12', text: '电器', url: '/pages/electronics/index' },
        { icon: 'https://picsum.photos/80/80?random=13', text: '服装', url: '/pages/clothing/index' },
        { icon: 'https://picsum.photos/80/80?random=14', text: '美妆', url: '/pages/beauty/index' },
        { icon: 'https://picsum.photos/80/80?random=15', text: '母婴', url: '/pages/baby/index' },
        { icon: 'https://picsum.photos/80/80?random=16', text: '家居', url: '/pages/home/index' },
        { icon: 'https://picsum.photos/80/80?random=17', text: '数码', url: '/pages/digital/index' }
      ],
      promotionItems: [
        { image: 'https://picsum.photos/345/345?random=20', name: '限时特惠商品1', price: '29.90' },
        { image: 'https://picsum.photos/345/345?random=21', name: '限时特惠商品2', price: '59.90' },
        { image: 'https://picsum.photos/345/345?random=22', name: '限时特惠商品3', price: '99.00' }
      ],
      recommendItems: [
        { image: 'https://picsum.photos/345/345?random=30', name: '推荐商品1 - 这是一个很长的商品名称', price: '129.00', sales: '128' },
        { image: 'https://picsum.photos/345/345?random=31', name: '推荐商品2', price: '89.50', sales: '245' },
        { image: 'https://picsum.photos/345/345?random=32', name: '推荐商品3', price: '229.00', sales: '87' },
        { image: 'https://picsum.photos/345/345?random=33', name: '推荐商品4', price: '59.00', sales: '342' },
        { image: 'https://picsum.photos/345/345?random=34', name: '推荐商品5', price: '169.00', sales: '93' },
        { image: 'https://picsum.photos/345/345?random=35', name: '推荐商品6', price: '79.00', sales: '156' }
      ]
    }
  },
  methods: {
    // 切换底部标签页
    switchTab(index) {
        this.currentTab = index;
        
        // 根据不同的标签页索引进行路由跳转
        const tabUrls = [
          '/pages/shop/shop',        // 主页
          '/pages/category/category',   // 分类
          '/pages/shopcar/shopcar',  // 购物车 - 修正为与pages.json一致
          '/pages/user/index'        // 我的
        ];
        
        if (index >= 0 && index < tabUrls.length) {
          uni.switchTab({
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
      },
    
    // 打开搜索页面
    openSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      });
    },
    
    // 打开定位选择
    openLocation() {
      uni.showActionSheet({
        itemList: ['北京市', '上海市', '广州市', '深圳市', '杭州市'],
        success: (res) => {
          // 处理选择结果
        }
      });
    },
    
    // 打开用户中心
    openUserCenter() {
      uni.navigateTo({
        url: '/pages/user/index'
      });
    },
    
    // 显示更多促销
    showMorePromotion() {
      uni.navigateTo({
        url: '/pages/promotion/index'
      });
    },
    
    // 导航到功能页面
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 头部样式（调整高度和内边距） */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx; /* 上下内边距从15rpx增加到30rpx */
  background-color: #FF5722;
  height: 140rpx; /* 高度从100rpx增加到140rpx */
}

/* 搜索框（调整上下边距） */
.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 80rpx; /* 高度从60rpx增加到80rpx */
  margin-right: 20rpx;
  padding: 0 20rpx;
  background-color: white;
  border-radius: 40rpx; /* 圆角同步增大，保持比例 */
}

.placeholder {
  margin-left: 10rpx;
  color: #999;
  font-size: 28rpx; /* 文字大小略微增大，适配高度 */
}

/* 定位信息（调整上下边距） */
.location {
  display: flex;
  align-items: center;
  color: white;
  font-size: 30rpx; /* 文字大小略微增大 */
}

.location-text {
  margin-right: 10rpx;
}

.user-icon {
  color: white;
}

/* 轮播图样式 */
.banner {
  height: 300rpx;
}

.banner-image {
  width: 100%;
  height: 100%;
}

/* 功能图标样式 */
.function-icons {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 20rpx 0;
}

.icon-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15rpx 0;
}

.icon-image {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
}

.icon-text {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
}

/* 促销活动样式 */
.promotion {
  margin-top: 20rpx;
  background-color: white;
  padding: 20rpx 30rpx;
}

.promotion-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.more-text {
  font-size: 26rpx;
  color: #999;
}

.promotion-items {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10rpx;
}

.promotion-item {
  width: 345rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
}

.promotion-image {
  width: 100%;
  height: 345rpx;
}

.promotion-name {
  display: block;
  padding: 10rpx 15rpx;
  font-size: 26rpx;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.promotion-price {
  display: block;
  padding: 0 15rpx 15rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #FF5722;
}

/* 推荐商品样式 */
.recommend {
  margin-top: 20rpx;
  background-color: white;
  padding: 20rpx 30rpx;
}

.recommend-title {
  margin-bottom: 20rpx;
}

.recommend-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.recommend-item {
  width: 345rpx;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
}

.recommend-image {
  width: 100%;
  height: 345rpx;
}

.recommend-name {
  display: block;
  padding: 10rpx 15rpx;
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
  height: 72rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.recommend-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15rpx 15rpx;
}

.recommend-price {
  font-size: 28rpx;
  font-weight: bold;
  color: #FF5722;
}

.recommend-sales {
  font-size: 22rpx;
  color: #999;
}

/* 底部导航栏样式 */
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
}

.tab-item text {
  margin-top: 5rpx;
  font-size: 22rpx;
}

.cart-badge {
  position: relative;
}
</style>