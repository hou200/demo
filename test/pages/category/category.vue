<template>
  <view class="category-root">
    <!-- 顶部导航栏彻底fixed -->
    <view class="header-nav-fixed">
      <HeaderNav />
    </view>
    <view class="category-main">
      <view class="category-left">
        <scroll-view scroll-y class="category-left-scroll">
          <view v-for="(item, index) in classifyData" :key="index"
            :class="['category-left-item', categoryActive === index ? 'active' : '']"
            @click="onLeftClick(index)">
            {{ item.name }}
        </view>
      </scroll-view>
      </view>
      <view class="category-right">
        <scroll-view scroll-y class="category-right-scroll" :scroll-into-view="rightScrollInto" @scroll="onRightScroll">
          <view v-for="(foods, index) in classifyData" :key="index" :id="'cat-' + index" class="category-right-group">
            <view class="category-right-title">{{ foods.name }}</view>
            <view v-for="(item, i) in foods.foods" :key="i" class="category-right-item" @click="cart(item.name)">
              <image :src="item.icon" mode="aspectFit" @error="handleImageError(item)" class="category-img" />
              <view class="category-item-name">{{ item.name }}</view>
      </view>
      </view>
        </scroll-view>
      </view>
    </view>
    <TabBar :currentTab="currentTab" :cartCount="cartCount" @tabChange="handleTabChange" />
  </view>
</template>

<script>
import classifyData from '@/components/common/classify.data.js';
import store from '@/utils/store.js';

export default {
  data() {
    return {
      classifyData: classifyData,
      categoryActive: 0,
      rightScrollInto: '',
      groupTops: [], // 右侧每组顶部距离
      isLeftClick: false // 标记是否是左侧点击触发的滚动
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
    store.setCurrentTab(1);
    this.$nextTick(() => {
      this.calcGroupTops();
    });
  },
  methods: {
    handleTabChange(index) {
      store.setCurrentTab(index);
    },
    onLeftClick(index) {
      this.categoryActive = index;
      this.rightScrollInto = 'cat-' + index;
      this.isLeftClick = true;
      // 200ms后重置，避免右侧滚动时又触发高亮
      setTimeout(() => { this.isLeftClick = false; }, 300);
    },
    onRightScroll(e) {
      if (this.isLeftClick) return; // 左侧点击时不处理
        const scrollTop = e.detail.scrollTop;
      for (let i = this.groupTops.length - 1; i >= 0; i--) {
        if (scrollTop >= this.groupTops[i] - 10) {
              this.categoryActive = i;
            break;
          }
        }
    },
    async calcGroupTops() {
      // 计算右侧每组的offsetTop
      const query = uni.createSelectorQuery().in(this);
      query.selectAll('.category-right-group').boundingClientRect(rects => {
        this.groupTops = rects.map(r => r.top - rects[0].top);
      }).exec();
    },
    cart(name) {
      console.log('点击了商品:', name);
    },
    handleImageError(item) {
      item.icon = 'https://picsum.photos/100/100?random=' + Math.random();
    }
  },
  watch: {
    classifyData() {
      this.$nextTick(() => {
        this.calcGroupTops();
      });
    }
  }
}
</script>

<style scoped>
.category-root {
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}
.header-nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  /* background: #fff; */
}
.category-main {
  display: flex;
  flex: 1;
  margin-top: 140rpx;
  min-height: 0;
}
.category-left {
  width: 200rpx;
  background: #f8f8f8;
  height: calc(100vh - 140rpx - 100rpx);
  /* 140rpx header, 100rpx tabbar */
}
.category-left-scroll {
  height: 100%;
}
.category-left-item {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  border-bottom: 1rpx solid #eee;
  background: #f8f8f8;
  transition: background 0.2s, color 0.2s;
}
.category-left-item.active {
  background: #fff;
  color: #FF5722;
  border-left: 4rpx solid #FF5722;
}
.category-right {
  flex: 1;
  background: #fff;
  height: calc(100vh - 140rpx - 100rpx);
  overflow: hidden;
}
.category-right-scroll {
  height: 100%;
}
.category-right-group {
  padding: 0 20rpx 20rpx 20rpx;
}
.category-right-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #FF5722;
  margin: 30rpx 0 10rpx 0;
}
.category-right-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}
.category-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}
.category-item-name {
  font-size: 28rpx;
  color: #333;
}
</style>