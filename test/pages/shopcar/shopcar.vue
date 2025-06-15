<template>
  <view class="container">
    <!-- 使用统一的顶部导航栏组件 -->
    <HeaderNav />

    <view class="main-content">
      <!-- 购物车内容 -->
      <view class="cart-content">
        <shopCar 
          :cartData="cartData" 
          @updateCart="updateCart"
          @updateTotal="updateTotal"
        />
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
import shopCar from '@/components/shopCar/shopCar.vue'
import store from '@/utils/store.js'

export default {
  components: {
    shopCar
  },
  data() {
    return {
      cartData: [
        {
          shopName: "示例店铺1",
          goods: [
            {
              id: 1,
              name: "商品1",
              price: 29.90,
              number: 2,
              image: "https://picsum.photos/200/200?random=1"
            },
            {
              id: 2,
              name: "商品2",
              price: 59.90,
              number: 1,
              image: "https://picsum.photos/200/200?random=2"
            }
          ]
        },
        {
          shopName: "示例店铺2",
          goods: [
            {
              id: 3,
              name: "商品3",
              price: 99.00,
              number: 3,
              image: "https://picsum.photos/200/200?random=3"
            }
          ]
        }
      ],
      totalPrice: 0
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
    // 设置当前页面为购物车页（tab 2）
    store.setCurrentTab(2);
    this.updateCartCount();
  },
  methods: {
    handleTabChange(index) {
      store.setCurrentTab(index);
    },
    
    updateCart(newCartData) {
      this.cartData = newCartData;
      this.updateCartCount();
    },
    
    updateTotal(total) {
      this.totalPrice = total;
    },
    
    updateCartCount() {
      const count = this.cartData.reduce((total, shop) => {
        return total + shop.goods.reduce((shopTotal, good) => {
          return shopTotal + good.number;
        }, 0);
      }, 0);
      
      store.updateCartCount(count);
      store.updateCartItems(this.cartData);
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

.cart-content {
  flex: 1;
  margin-bottom: 100rpx; /* 为底部导航栏留空间 */
}
</style>