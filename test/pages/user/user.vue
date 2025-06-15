<template>
  <view class="mine-page">
    <!-- 顶部用户信息卡片 -->
    <div class="user-card">
      <div class="user-info">
        <image class="avatar" :src="userInfo.avatar" mode="aspectFill" />
        <div class="info-right">
          <div class="name">{{ userInfo.nickname || '立即登录' }}</div>
          <div class="member-tag">
            <uni-icons type="vip" size="14" color="#FFD700"></uni-icons>
            <text>普通会员</text>
          </div>
        </div>
        <div class="setting-icon" @click="navigateTo('/pages/user/settings/index')">
          <uni-icons type="gear" size="20" color="#fff"></uni-icons>
        </div>
      </div>
      
      <!-- 用户数据概览 -->
      <div class="user-stats">
        <div class="stat-item">
          <div class="num">0</div>
          <div class="label">收藏</div>
        </div>
        <div class="stat-item">
          <div class="num">0</div>
          <div class="label">足迹</div>
        </div>
        <div class="stat-item">
          <div class="num">0</div>
          <div class="label">优惠券</div>
        </div>
      </div>
    </div>

    <!-- 订单区域 -->
    <div class="section-card order-section">
      <div class="section-header">
        <text class="title">我的订单</text>
        <div class="more" @click="navigateTo('/pages/user/orders/index')">
          <text>全部订单</text>
          <uni-icons type="right" size="14" color="#999"></uni-icons>
        </div>
      </div>
      <div class="order-types">
        <div 
          class="type-item" 
          v-for="(item, index) in orderTypes" 
          :key="index"
          @click="navigateTo(item.path)"
        >
          <div class="icon-wrap">
            <img class="order-icon" :src="item.icon" mode="aspectFit" />
            <text v-if="item.count" class="badge">{{ item.count }}</text>
          </div>
          <text>{{ item.name }}</text>
        </div>
      </div>
    </div>

    <!-- 常用功能 -->
    <div class="section-card">
      <div class="grid-menu">
        <div 
          class="grid-item" 
          v-for="(item, index) in menuItems" 
          :key="index"
          @click="navigateTo(item.path)"
        >
          <div class="icon-box">
            <uni-icons :type="item.icon" size="24" color="#333"></uni-icons>
          </div>
          <text>{{ item.name }}</text>
        </div>
      </div>
      
      <!-- 测试按钮 -->
      
    </div>

    <!-- 底部导航栏 -->
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
  name: 'profileA',
  data() {
    return {
      userInfo: {
        avatar: '/static/logo.jpg',
        nickname: 'Hou',
        phone: '15555555555'
      },
      orderTypes: [
        { name: '待付款', icon: '/static/images/my/payment.png', path: '/pages/user/orders/index?type=1', count: 0 },
        { name: '待发货', icon: '/static/images/my/delivery.png', path: '/pages/user/orders/index?type=2', count: 2 },
        { name: '待收货', icon: '/static/images/my/shipping.png', path: '/pages/user/orders/index?type=3', count: 0 },
        { name: '待评价', icon: '/static/images/my/review.png', path: '/pages/user/orders/index?type=4', count: 0 }
      ],
      menuItems: [
        { name: '个人信息', icon: 'person', path: '/pages/user/profile/index' },
        { name: '我的订单', icon: 'list', path: '/pages/user/orders/index' },
        { name: '设置', icon: 'gear', path: '/pages/user/settings/index' },
        { name: '帮助中心', icon: 'help', path: '/pages/user/help/index' }
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
    this.syncUserInfoFromStorage();
  },
  onShow() {
    this.syncUserInfoFromStorage();
    // 设置当前页面为用户页（tab 3）
    store.setCurrentTab(3);
  },
  methods: {
    syncUserInfoFromStorage() {
      // 优先从本地缓存读取
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        try {
          this.userInfo = JSON.parse(userInfo);
        } catch(e) {
          this.userInfo = {
            avatar: '/static/logo.jpg',
            nickname: 'Hou',
            phone: '15555555555'
          };
        }
      } else {
        // 没有缓存则用默认
        this.userInfo = {
          avatar: '/static/logo.jpg',
          nickname: 'Hou',
          phone: '15555555555'
        };
      }
      // 强制同步到缓存，保证index.vue能读到
      uni.setStorageSync('userInfo', JSON.stringify(this.userInfo));
    },
    // 你可以在登录、编辑资料等地方调用这个方法来更新userInfo
    updateUserInfo(newInfo) {
      this.userInfo = Object.assign({}, this.userInfo, newInfo);
      uni.setStorageSync('userInfo', JSON.stringify(this.userInfo));
    },
    navigateTo(path) {
      console.log('尝试跳转到:', path);
      uni.navigateTo({
        url: path,
        success: () => {
          console.log('跳转成功:', path);
        },
        fail: (err) => {
          console.error('跳转失败:', err);
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      })
    },
    handleTabChange(index) {
      store.setCurrentTab(index);
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-page {
  min-height: 100vh;
  background-color: #f8f8f8;
  padding: 30rpx;
  padding-bottom: 130rpx; /* 为底部导航栏留空间 */
  
  .user-card {
    background: linear-gradient(135deg, #8E2DE2, #4A00E0);
    border-radius: 30rpx;
    padding: 40rpx;
    color: #fff;
    
    .user-info {
      display: flex;
      align-items: center;
      
      .avatar {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        border: 4rpx solid rgba(255,255,255,0.3);
      }
      
      .info-right {
        flex: 1;
        margin-left: 30rpx;
        
        .name {
          font-size: 40rpx;
          font-weight: 600;
          margin-bottom: 16rpx;
        }
        
        .member-tag {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.2);
          padding: 4rpx 16rpx;
          border-radius: 24rpx;
          width: fit-content;
          
          text {
            font-size: 24rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
    
    .user-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 40rpx;
      
      .stat-item {
        text-align: center;
        
        .num {
          font-size: 40rpx;
          font-weight: 600;
          margin-bottom: 8rpx;
        }
        
        .label {
          font-size: 24rpx;
          opacity: 0.8;
        }
      }
    }
  }

  .section-card {
    background-color: #fff;
    border-radius: 24rpx;
    margin-top: 30rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: 600;
      }
      
      .more {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 26rpx;
      }
    }
  }

  .order-types {
    display: flex;
    justify-content: space-between;
    
    .type-item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .icon-wrap {
        position: relative;
        display: inline-block;
        margin-bottom: 16rpx;
        
        .order-icon {
          width: 56rpx;
          height: 56rpx;
        }
        
        .badge {
          position: absolute;
          top: -12rpx;
          right: -20rpx;
          background-color: #ff4444;
          color: #fff;
          font-size: 24rpx;
          padding: 0 8rpx;
          border-radius: 20rpx;
          min-width: 28rpx;
          height: 28rpx;
          line-height: 28rpx;
          text-align: center;
          transform: scale(0.9);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      
      text {
        font-size: 26rpx;
        color: #333;
      }
    }
  }

  .grid-menu {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30rpx;
    
    .grid-item {
      text-align: center;
      
      .icon-box {
        width: 90rpx;
        height: 90rpx;
        margin: 0 auto 0;
        background: #f7f7f7;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      text {
        font-size: 26rpx;
        color: #333;
      }
    }
  }
}
</style>