<template>
  <view class="container">
    <!-- 使用统一的顶部导航栏组件 -->
    <HeaderNav />
    
    <view class="main-content">
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
    </view>
    
    <!-- 使用统一的底部导航栏组件 -->
    <TabBar 
      :currentTab="currentTab" 
      :cartCount="cartCount"
      @tabChange="handleTabChange"
    />
  </view>
</template>

<script>
import store from '@/utils/store.js'

export default {
  data() {
    return {
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
  computed: {
    currentTab() {
      return store.getState().currentTab;
    },
    cartCount() {
      return store.getState().cartCount;
        }
      },
  mounted() {
    // 设置当前页面为主页（tab 0）
    store.setCurrentTab(0);
    },
  methods: {
    handleTabChange(index) {
      store.setCurrentTab(index);
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

.main-content {
  flex: 1;
  padding-top: 140rpx;
  /* 让内容不被HeaderNav遮挡 */
  overflow-y: auto;
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
  margin-bottom: 100rpx; /* 为底部导航栏留空间 */
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
</style>