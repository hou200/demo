<template>
  <view class="common-car">
    <!-- 购物车为空时的显示 -->
    <view class="empty-shop-car" v-if="isEmpty">
      <image src="../../static/empty_shop_car.png" class="empty-shop-car-image" mode=""></image>
      <text>当前您的购物车是空的</text>
      <view class="empty-shop-car-btn" @click="$emit('goShopping')">
        <text>去逛逛</text>
      </view>
    </view>
    
    <!-- 购物车有商品时的显示 -->
    <view class="shop-car" v-else>
      <view class="shop-car-header">
        <text @tap="cut">{{isCut ? '编辑' : '完成'}}</text>
      </view>
      
      <!-- 店铺列表循环 -->
      <view class="store-box" v-for="(itemq, indexq) in datas" :key="indexq">
        <view class="store-header">
          <!-- 店铺选中状态图标 -->
          <view class="checked-image" @tap="storeCheck(indexq, itemq.checked)">
            <uni-icons :type="itemq.checked === 2 ? 'circlefilled' : 'circle'" size="24" color="#FF5722"></uni-icons>
          </view>
          <text>{{itemq.shopName}}</text>
          <image src="../../static/youjiantou1.png" class="label" mode=""></image>
        </view>
        
        <!-- 商品列表循环 -->
        <view class="goodsInfo" v-for="(itemw, indexw) in itemq.goods" :key="indexw">
          <!-- 商品选中状态图标 -->
          <view class="checked-image" @tap="goodsCheck(indexq, indexw, itemw.checked)">
            <uni-icons :type="itemw.checked === 2 ? 'circlefilled' : 'circle'" size="24" color="#FF5722"></uni-icons>
          </view>
          
          <view class="goodsInfo-right">
            <image :src="itemw.image" class="goods-image" mode=""></image>
            <view class="goodsInfo-box">
              <text class="goods-name">{{itemw.name}}</text>
              <text class="spe">规格：默认规格</text>
              <view class="goods-box">
                <text class="goods-price">¥{{itemw.price}}</text>
                <view class="goods-num-box">
                  <!-- 减少数量按钮 -->
                  <view class="goods-btn" @tap="sub(indexq, indexw, itemw.number)">
                    <text>-</text>
                  </view>
                  <!-- 数量显示 -->
                  <view class="goods-num">
                    <text>{{itemw.number}}</text>
                  </view>
                  <!-- 增加数量按钮 -->
                  <view class="goods-btn" @tap="add(indexq, indexw, itemw.number)">
                    <text>+</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 底部统计栏 -->
      <view class="statistics-box-fixed">
        <view class="statistics">
          <!-- 全选按钮 -->
          <view class="statistics-left" @tap="allCheck">
            <view class="checked-image">
              <uni-icons :type="statisticsIndex ? 'circlefilled' : 'circle'" size="24" color="#FF5722"></uni-icons>
            </view>
            <text>全选</text>
          </view>
          
          <!-- 结算/删除按钮 -->
          <view class="statistics-right" @tap="isCut ? accounts : delect">
            <text v-if="isCut">总计：</text>
            <text class="text-color" v-if="isCut">¥{{total}}</text>
            <view class="btn">
              <text>{{isCut ? '结算' : '删除'}}</text>
            </view>
          </view>
        </view>
        <view class="gap" :style="{ height: iPhoneX ? '100rpx' : '40rpx' }"></view>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "shopCar",
  data() {
    return {
      iPhoneX: false,
      datas: [],
      statisticsIndex: false,
      total: 0,
      isCut: true
    };
  },
  props: {
    cartData: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isEmpty() {
      return (
        this.datas.length === 0 || 
        this.datas.every(shop => shop.goods.length === 0)
      );
    }
  },
  watch: {
    cartData: {
      handler(newVal) {
        this.updateCartData(newVal);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateCartData(newVal) {
      if (!newVal || newVal.length === 0) {
        this.datas = [];
        this.statisticsIndex = false;
        this.statistics();
        return;
      }
      this.datas = JSON.parse(JSON.stringify(newVal));
      this.datas.forEach(shop => {
        shop.checked = shop.checked === 2 ? 2 : 1;
        shop.goods.forEach(good => {
          good.checked = good.checked === 2 ? 2 : 1;
        });
      });
      this.updateAllCheckStatus();
      this.statistics();
    },
    goodsCheck(storeIndex, goodsIndex, goodsChecked) {
      const newChecked = goodsChecked === 1 ? 2 : 1;
      this.datas[storeIndex].goods[goodsIndex].checked = newChecked;
      const storeChecked = this.datas[storeIndex].goods.every(item => item.checked === 2);
      this.datas[storeIndex].checked = storeChecked ? 2 : 1;
      this.updateAllCheckStatus();
      this.statistics();
      this.$emit('updateCart', this.datas);
    },
    storeCheck(storeIndex, storeCheck) {
      const newChecked = storeCheck === 1 ? 2 : 1;
      this.datas[storeIndex].checked = newChecked;
      this.datas[storeIndex].goods.forEach(item => {
        item.checked = newChecked;
      });
      this.updateAllCheckStatus();
      this.statistics();
      this.$emit('updateCart', this.datas);
    },
    sub(storeIndex, goodsIndex, goodsnum) {
      if (goodsnum <= 1) return;
      this.datas[storeIndex].goods[goodsIndex].number--;
      this.statistics();
      this.$emit('updateCart', this.datas);
    },
    add(storeIndex, goodsIndex, goodsnum) {
      this.datas[storeIndex].goods[goodsIndex].number++;
      this.statistics();
      this.$emit('updateCart', this.datas);
    },
    allCheck() {
      const newChecked = this.statisticsIndex ? 1 : 2;
      this.datas.forEach(item => {
        item.checked = newChecked;
        item.goods.forEach(itemq => {
          itemq.checked = newChecked;
        });
      });
      this.statisticsIndex = !this.statisticsIndex;
      this.statistics();
      this.$emit('updateCart', this.datas);
    },
    updateAllCheckStatus() {
      this.statisticsIndex = this.datas.length > 0 && this.datas.every(shop => shop.checked === 2 && shop.goods.length > 0);
    },
    statistics() {
      let total = 0;
      this.datas.forEach(shop => {
        shop.goods.forEach(good => {
          if (good.checked === 2) {
            total += parseFloat(good.price) * good.number;
          }
        });
      });
      this.total = total.toFixed(2);
      this.$emit('updateTotal', total);
    },
    cut() {
      this.isCut = !this.isCut;
      this.statisticsIndex = true;
      this.allCheck();
    },
    accounts() {
      const selectedGoods = this.getSelectedGoods();
      if (selectedGoods.length > 0) {
        uni.showToast({
          title: `结算${selectedGoods.length}件商品，共${this.total}元`,
          icon: 'none'
        });
      } else {
        uni.showToast({
          title: '请选择要结算的商品',
          icon: 'none'
        });
      }
    },
    delect() {
      const selectedGoods = this.getSelectedGoods();
      if (selectedGoods.length > 0) {
        uni.showModal({
          title: '确认删除',
          content: `确定要删除选中的${selectedGoods.length}件商品吗？`,
          success: (res) => {
            if (res.confirm) {
              this.deleteSelectedGoods();
            }
          }
        });
      } else {
        uni.showToast({
          title: '请选择要删除的商品',
          icon: 'none'
        });
      }
    },
    getSelectedGoods() {
      const selectedGoods = [];
      this.datas.forEach((shop, shopIndex) => {
        shop.goods.forEach((good, goodIndex) => {
          if (good.checked === 2) {
            selectedGoods.push({
              shopIndex,
              goodIndex,
              good
            });
          }
        });
      });
      return selectedGoods;
    },
    deleteSelectedGoods() {
      const selectedGoods = this.getSelectedGoods();
      selectedGoods.reverse().forEach(({ shopIndex, goodIndex }) => {
        this.datas[shopIndex].goods.splice(goodIndex, 1);
      });
      
      this.datas = this.datas.filter(shop => shop.goods.length > 0);
      
      this.statistics();
      this.$emit('updateCart', this.datas);
      
      uni.showToast({
        title: '删除成功',
        icon: 'success'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-car {
  width: 750rpx;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F5F5F5;
}

.empty-shop-car {
  width: 750rpx;
  min-height: 680rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty-shop-car-image {
    width: 340rpx;
    height: 278rpx;
    margin-top: 102rpx;
  }

  text {
    margin-top: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
  }

  .empty-shop-car-btn {
    width: 240rpx;
    height: 90rpx;
    background: #FBBC02;
    border-radius: 200rpx;
    margin-top: 40rpx;
    text-align: center;
    line-height: 90rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #313133;
  }
}

.shop-car {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shop-car-header {
  width: 690rpx;
  height: 80rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  text {
    font-size: 28rpx;
    font-weight: 400;
    color: #313133;
  }
}

.store-box {
  width: 750rpx;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFFF;
}

.store-header {
  width: 690rpx;
  height: 78rpx;
  padding: 0 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28rpx;
  font-weight: 400;
  color: #313133;

  .checked-image {
    width: 36rpx;
    height: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  text {
    font-size: 28rpx;
    font-weight: 400;
    color: #313133;
    margin-left: 20rpx;
  }

  .label {
    width: 14rpx;
    height: 24rpx;
    margin-left: 10rpx;
    margin-top: 5rpx;
  }
}

.goodsInfo {
  width: 690rpx;
  height: 246rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2rpx solid #EDEDED;

  &:nth-last-child(1) {
    border: none;
  }

  .checked-image {
    width: 36rpx;
    height: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .goodsInfo-right {
    width: 634rpx;
    height: 246rpx;
    margin-left: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;

    .goods-image {
      width: 180rpx;
      height: 180rpx;
    }

    .goodsInfo-box {
      width: 428rpx;
      margin-left: 24rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .goods-name {
        width: 428rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #313133;
      }

      .spe {
        width: 428rpx;
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #919298;
      }

      .goods-box {
        width: 428rpx;
        margin-top: 18rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .goods-price {
          font-size: 32rpx;
          font-weight: 400;
          color: #313133;
        }

        .goods-num-box {
          width: 168rpx;
          height: 46rpx;
          display: flex;
          flex-direction: row;
          align-items: center;

          .goods-btn {
            width: 46rpx;
            height: 44rpx;
            text-align: center;
            line-height: 44rpx;
            border: 1rpx solid #CFCFCF;
            font-size: 38rpx;
            background-color: #f5f5f5;
            cursor: pointer;
          }

          .goods-num {
            width: 76rpx;
            height: 44rpx;
            text-align: center;
            line-height: 44rpx;
            font-size: 33rpx;
            font-weight: 400;
            color: #666666;
            border-top: 1px solid #CFCFCF;
            border-bottom: 1px solid #CFCFCF;
          }
        }
      }
    }
  }
}

.statistics-box-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 100rpx;
  background: #fff;
  z-index: 1001;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.04);
}

.statistics {
  width: 720rpx;
  padding: 0 0 0 30rpx;
  height: 98rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.statistics-left {
  width: 120rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .checked-image {
    width: 36rpx;
    height: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  text {
    font-size: 30rpx;
    font-weight: 400;
    color: #313133;
  }
}

.statistics-right {
  width: 600rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  .btn {
    width: 218rpx;
    height: 98rpx;
    background: #FBBC02;
    text-align: center;
    line-height: 98rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #313133;
    margin-left: 40rpx;
  }

  text {
    font-size: 30rpx;
    font-weight: 400;
    color: #313133;
  }

  .text-color {
    color: #FF5722;
  }
}

.gap {
  width: 750rpx;
  height: 40rpx;
}
</style>