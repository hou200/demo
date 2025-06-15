<template>
  <view class="container">
    <!-- 固定顶部导航栏（搜索框+定位+个人中心） -->
    <view class="fixed-header">
      <view class="search-location">
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
      </view>
      <!-- 用户图标 -->
      <view class="user-icon" @click="openUserCenter">
        <uni-icons type="person" size="22" color="#333"></uni-icons>
      </view>
    </view>

    <!-- 内容容器（给顶部固定栏留空间） -->
    <view class="content-wrapper">
      <!-- 购物车列表 -->
      <view class="cart-content">
        <commonCar 
          :list="goodsProducts" 
          @delect="delect" 
          @accounts="accounts" 
          @goods-check="goodsCheck"
        >
          <text slot="empty">购物车空空如也</text>
        </commonCar>
      </view>

      <!-- 底部结算栏 -->
      <view class="footer" v-show="goodsProducts.length > 0">
        <view class="footer-left">
          <view class="select-all" @click="selectAll">
            <uni-icons :type="allSelected ? 'circlefilled' : 'circle'" size="24" color="#FF5722"></uni-icons>
            <text>全选</text>
          </view>
          <view class="total-price">
            <text>合计:</text>
            <text class="price">¥{{ totalPrice.toFixed(2) }}</text>
          </view>
        </view>
        <view class="footer-right" @click="accounts">
          <text>结算({{ selectedCount }})</text>
        </view>
      </view>
    </view>

    <!-- 底部导航栏（固定） -->
    <view class="fixed-tab-bar">
      <view class="tab-item" :class="{ active: currentTab === 0 }" @click="switchTab(0)">
        <uni-icons type="home" size="24" :color="currentTab === 0 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 0 ? '#FF5722' : '#999' }">主页</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 1 }" @click="switchTab(1)">
        <uni-icons type="apps" size="24" :color="currentTab === 1 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 1 ? '#FF5722' : '#999' }">分类</text>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 2 }" @click="switchTab(2)">
        <view class="cart-tab-container">
          <uni-icons type="shoppingcart" size="24" color="#FF5722"></uni-icons>
          <text style="color: #FF5722">购物车</text>
          <!-- 角标最终位置：购物车文字右上角 -->
          <text class="badge-count" v-if="cartCount > 0">{{ cartCount }}</text>
        </view>
      </view>
      <view class="tab-item" :class="{ active: currentTab === 3 }" @click="switchTab(3)">
        <uni-icons type="person" size="24" :color="currentTab === 3 ? '#FF5722' : '#999'"></uni-icons>
        <text :style="{ color: currentTab === 3 ? '#FF5722' : '#999' }">我的</text>
      </view>
    </view>
  </view>
</template>

<script>
import commonCar from '@/components/shopCar/shopCar.vue'
export default {
  components: { commonCar },
  data() {
    return {
      currentTab: 2, 
      goodsProducts: [
        {
          name: '华为旗舰店',
          checked: true, 
          goods: [
            {
              img: 'https://picsum.photos/300/300?random=1',
              title: '华为荣耀',
              remark: '256G',
              price: '128.80',
              number: 1,
              checked: true 
            },
            {
              img: 'https://picsum.photos/300/300?random=2',
              title: 'mate40',
              remark: '128G',
              price: '116.80',
              number: 1,
              checked: true 
            }
          ]
        },
        {
          name: '小米旗舰店',
          checked: true, 
          goods: [
            {
              img: 'https://picsum.photos/300/300?random=3',
              title: '小米11',
              remark: '128G',
              price: '129.80',
              number: 1,
              checked: true 
            },
            {
              img: 'https://picsum.photos/300/300?random=4',
              title: '红米Note10',
              remark: '64G',
              price: '156.80',
              number: 1,
              checked: true 
            }
          ]
        }
      ],
      allSelected: true 
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.goodsProducts.forEach(shop => {
        shop.goods.forEach(good => {
          if (good.checked) { 
            total += parseFloat(good.price) * good.number;
          }
        });
      });
      return total;
    },
    selectedCount() {
      let count = 0;
      this.goodsProducts.forEach(shop => {
        shop.goods.forEach(good => {
          if (good.checked) { 
            count += good.number;
          }
        });
      });
      return count;
    },
    cartCount() {
      let count = 0;
      this.goodsProducts.forEach(shop => {
        shop.goods.forEach(good => {
          count += good.number;
        });
      });
      return count;
    }
  },
  methods: {
    switchTab(index) {
      this.currentTab = index;
      const tabUrls = [
        '/pages/shop/shop',   
        '/pages/category/category', 
        '/pages/shopcar/shopcar',    
        '/pages/user/index'     
      ];
      if (index >= 0 && index < tabUrls.length) {
        uni.switchTab({
          url: tabUrls[index]
        });
      }
    },
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
    },
    selectAll() {
      this.allSelected = !this.allSelected;
      this.goodsProducts.forEach(shop => {
        shop.checked = this.allSelected; 
        shop.goods.forEach(good => {
          good.checked = this.allSelected; 
        });
      });
    },
    delect(e) {
      console.log('删除商品:', e);
      const { shopIndex, goodIndex } = e;
      this.goodsProducts[shopIndex].goods.splice(goodIndex, 1);
      if (this.goodsProducts[shopIndex].goods.length === 0) {
        this.goodsProducts.splice(shopIndex, 1);
      }
    },
    accounts() {
      console.log('结算商品');
      uni.showToast({
        title: `结算${this.selectedCount}件商品，共${this.totalPrice.toFixed(2)}元`,
        icon: 'none'
      });
    },
    goodsCheck(shopIndex, goodIndex) {
      this.goodsProducts[shopIndex].goods[goodIndex].checked = !this.goodsProducts[shopIndex].goods[goodIndex].checked;
      const shop = this.goodsProducts[shopIndex];
      const allGoodsChecked = shop.goods.every(good => good.checked);
      shop.checked = allGoodsChecked;
      this.allSelected = this.goodsProducts.every(shopItem => shopItem.checked);
    }
  }
}
</script>

<style scoped>
/* 最外层容器 */
.container {
  position: relative;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 固定顶部导航栏（搜索+定位+个人中心） */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: #FF5722;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  z-index: 999;
}

/* 搜索框+定位 容器 */
.search-location {
  display: flex;
  align-items: center;
  flex: 1;
}

/* 搜索框样式 */
.search-box {
  display: flex;
  align-items: center;
  height: 60rpx;
  padding: 0 20rpx;
  background-color: white;
  border-radius: 30rpx;
  margin-right: 20rpx;
  flex: 1;
}

/* 搜索框提示文字 */
.placeholder {
  margin-left: 10rpx;
  color: #999;
  font-size: 28rpx;
}

/* 定位样式 */
.location {
  display: flex;
  align-items: center;
  color: white;
  font-size: 30rpx;
}

/* 定位文字 */
.location-text {
  margin-right: 10rpx;
}

/* 个人中心图标 */
.user-icon {
  color: white;
}

/* 内容容器（给顶部固定栏和底部固定栏留空间） */
.content-wrapper {
  padding-top: 100rpx; /* 顶部固定栏高度 */
  padding-bottom: 100rpx; /* 底部导航栏高度 */
}

/* 购物车列表容器 */
.cart-content {
  flex: 1;
  padding: 20rpx;
}

/* 底部结算栏 */
.footer {
  position: fixed;
  bottom: 100rpx; /* 底部导航栏高度 */
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: white;
  border-top: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  z-index: 998;
}

/* 结算栏左侧（全选+合计） */
.footer-left {
  display: flex;
  align-items: center;
}

/* 全选按钮 */
.select-all {
  display: flex;
  align-items: center;
  margin-right: 30rpx;
}

.select-all text {
  margin-left: 10rpx;
  font-size: 28rpx;
  color: #333;
}

/* 合计价格 */
.total-price {
  font-size: 28rpx;
}

.price {
  color: #FF5722;
  font-weight: bold;
  margin-left: 10rpx;
}

/* 结算按钮 */
.footer-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220rpx;
  height: 100%;
  background-color: #FF5722;
  color: white;
  font-size: 30rpx;
}

/* 固定底部导航栏 */
.fixed-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background-color: white;
  border-top: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 999;
}

/* 导航项通用样式 */
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-item text {
  margin-top: 5rpx;
  font-size: 22rpx;
}

/* 购物车导航项容器（用于角标定位） */
.cart-tab-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 角标最终样式：购物车文字右上角 */
.badge-count {
  position: absolute;
  top: -17rpx;   /* 向上偏移 */
  right: -25rpx; /* 向右偏移 */
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