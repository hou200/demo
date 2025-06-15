<template>
  <view class="container">
    <!-- 顶部导航栏（复用首页的顶部，包含搜索、定位、用户） -->
    <view class="header">
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

    <!-- 原分类页核心内容，保持你想要的样式 -->
    <view class="page-body" :style="'height:'+height+'px'">
      <scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop"
        scroll-with-animation>
        <view class="nav-left-item" @click="categoryClickMain(index)" :key="index"
          :class="index==categoryActive?'active':''" v-for="(item,index) in classifyData">
          {{item.name}}
        </view>
      </scroll-view>
      <scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
        scroll-with-animation>
        <view v-for="(foods,index) in classifyData" :key="index" class="box">
          <view class="nav-right-item" v-for="(item,i) in foods.foods" :key="i" @click="cart(item.name)">
            <image :src="item.icon" mode="aspectFit" @error="handleImageError(item)" alt="商品图片: {{item.name}}" />
            <view>{{item.name}}</view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部导航栏（复用首页的底部，包含主页、分类、购物车、我的） -->
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
        <uni-icons type="shoppingcart" size="24" :color="currentTab === 2 ? '#FF5722' : '#999'"></uni-icons>
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
import classifyData from '@/components/common/classify.data.js';
export default {
  data() {
    return {
      // 底部导航当前选中项，分类页默认选中“分类”（索引1）
      currentTab: 1, 
      height: 0,
      categoryActive: 0,
      scrollTop: 0,
      scrollLeftTop: 0,
      classifyData: classifyData,
      arr: [], 
      boxHeights: [], 
      leftItemHeight: 0,
      navLeftHeight: 0,
      diff: 0,
      tabBarHeight: 0, 
      isCalculating: false,
      scrollTimeout: null,
      resizeTimeout: null
    }
  },
  created() {
    // 监听窗口变化重新计算高度
    uni.onWindowResize(() => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.getHeightList();
      }, 300);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.getHeightList();
    });
  },
  onLoad() {
    this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight;
  },
  methods: {
    // 底部导航切换
    switchTab(index) {
      this.currentTab = index;
      const tabUrls = [
        '/pages/shop/shop',        // 主页
        '/pages/category/category',   // 分类（当前页，也可保留跳转逻辑）
        '/pages/shopcar/shopcar',  // 购物车 
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
    // 顶部搜索跳转
    openSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      });
    },
    // 顶部定位逻辑（可按需完善）
    openLocation() {
      uni.showActionSheet({
        itemList: ['北京市', '上海市', '广州市', '深圳市', '杭州市'],
        success: (res) => {
          // 这里可加定位选择后的逻辑，比如更新城市数据
        }
      });
    },
    // 顶部用户中心跳转
    openUserCenter() {
      uni.navigateTo({
        url: '/pages/user/index'
      });
    },
    // 原分类页高度计算等方法，保持不变
    async getHeightList() {
      if (this.isCalculating) return;
      this.isCalculating = true;
      this.arr = [0];
      this.boxHeights = [];
      const query = uni.createSelectorQuery();
      // 获取左侧导航项高度
      let leftHeight = 0;
      await new Promise(resolve => {
        query.selectAll('.nav-left-item').boundingClientRect(rects => {
          if (rects && rects.length) {
            leftHeight = rects[0].height || 0;
          } else {
            console.warn('未找到左侧导航项元素');
          }
          resolve();
        }).exec();
      });
      // 获取右侧每个分类容器的高度
      let heights = [];
      await new Promise(resolve => {
        query.selectAll('.box').boundingClientRect(rects => {
          if (rects && rects.length) {
            heights = rects.map(rect => rect.height || 0);
          } else {
            console.warn('未找到任何分类容器元素');
          }
          resolve();
        }).exec();
      });
      // 计算累计高度
      const accumulated = [0];
      let total = 0;
      heights.forEach(height => {
        total += height;
        accumulated.push(total);
      });
      // 更新数据
      this.leftItemHeight = leftHeight;
      this.navLeftHeight = leftHeight * this.classifyData.length;
      this.diff = Math.max(0, this.navLeftHeight - this.height);
      this.boxHeights = heights;
      this.arr = accumulated;
      this.isCalculating = false;
    },
    scroll(e) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        const scrollTop = e.detail.scrollTop;
        for (let i = this.arr.length - 1; i >= 0; i--) {
          if (scrollTop >= this.arr[i] - 10) { 
            if (this.categoryActive !== i) {
              this.categoryActive = i;
              this.updateLeftScrollPosition();
            }
            break;
          }
        }
      }, 30); 
    },
    updateLeftScrollPosition() {
      if (this.diff > 0) {
        const maxScrollTop = this.diff;
        const targetScrollTop = Math.round((this.categoryActive * maxScrollTop) / (this.classifyData.length - 1));
        this.scrollLeftTop = Math.min(targetScrollTop, maxScrollTop);
      }
    },
    categoryClickMain(index) {
      if (index === this.categoryActive) return;
      this.categoryActive = index;
      this.scrollTop = this.arr[index] || 0;
      this.updateLeftScrollPosition();
    },
    cart(text) {
      uni.showToast({
        title: text,
        icon: "none"
      });
    },
    handleImageError(item) {
      const category = item.cat || 0;
      item.icon = `https://picsum.photos/200/200?random=${category + Math.random()}`;
      console.log(`图片加载失败，已替换为默认图片: ${item.name}`);
    }
  },
  beforeDestroy() {
    uni.offWindowResize();
    clearTimeout(this.scrollTimeout);
    clearTimeout(this.resizeTimeout);
  }
}
</script>

<style>
/* 保留你原本分类页的样式，以下是关键结构的样式，和你提供的视觉保持一致，可根据实际文件调整路径或细节 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
/* 顶部导航栏样式（从首页搬过来，保证样式一致） */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx; 
  background-color: #FF5722;
  height: 140rpx; 
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

/* 原分类页的样式，保持你想要的布局 */
.page-body {
  display: flex;
  background: #fff;
  overflow: hidden;
}
.nav-left {
  width: 25%;
  background: #fafafa;
}
.nav-left-item {
  height: 100upx;
  border-right: solid 1px #f1f1f1;
  border-bottom: solid 1px #f1f1f1;
  font-size: 30upx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-left-item:last-child {
  border-bottom: none;
}
.active {
  color: #FF80AB;
  background: #fff;
  border-right: 0;
}
.nav-right {
  width: 75%;
}
.box {
  display: block;
  overflow: hidden;
  border-bottom: 20upx solid #f3f3f3;
}
.box:last-child {
  border: none;
}
.nav-right-item {
  width: 28%;
  height: 220upx;
  float: left;
  text-align: center;
  padding: 11upx;
  font-size: 28upx;
  background: #fff;
}
.nav-right-item image {
  width: 150upx;
  height: 150upx;
  object-fit: contain;
}

/* 底部导航栏样式（从首页搬过来，保证样式一致） */
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

/* 隐藏滚动条，保持原有视觉 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>