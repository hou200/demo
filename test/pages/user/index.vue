<template>
	<view class="user-container">
		<!-- 顶部返回栏 -->
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#fff"></uni-icons>
				<text class="back-text">返回</text>
			</view>
		</view>
		<view class="user-header">
			<view class="avatar-section">
				<image class="avatar" :src="avatarSrc" mode="aspectFill" @error="onAvatarError"></image>
				<view class="user-info">
					<text class="username">Hou</text>
					<text class="user-desc">15555555555</text>
				</view>
			</view>
		</view>
		
		<view class="user-menu">
			<view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
				<view class="menu-icon">
					<text class="icon">{{item.icon}}</text>
				</view>
				<view class="menu-content">
					<text class="menu-title">{{item.title}}</text>
					<text class="menu-desc">{{item.desc}}</text>
				</view>
				<view class="menu-arrow">
					<text class="arrow">></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarSrc: '/static/logo.jpg',
				menuItems: [
					{
						title: '个人信息',
						desc: '查看和编辑个人资料',
						icon: '👤',
						url: '/pages/user/profile/index'
					},
					{
						title: '我的订单',
						desc: '查看订单历史',
						icon: '📦',
						url: '/pages/user/orders/index'
					},
					{
						title: '设置',
						desc: '应用设置和偏好',
						icon: '⚙️',
						url: '/pages/user/settings/index'
					},
					{
						title: '帮助中心',
						desc: '常见问题和帮助',
						icon: '❓',
						url: '/pages/user/help/index'
					}
				]
			}
		},
		onShow() {
			this.syncUserInfo();
		},
		methods: {
			syncUserInfo() {
				let userInfo = uni.getStorageSync('userInfo');
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
					// 没有缓存则写入默认
					this.userInfo = {
						avatar: '/static/logo.jpg',
						nickname: 'Hou',
						phone: '15555555555'
					};
					uni.setStorageSync('userInfo', JSON.stringify(this.userInfo));
				}
			},
			handleMenuClick(item) {
				if (item.url) {
					uni.navigateTo({ url: item.url });
				}
			},
			goBack() {
				uni.navigateBack({ delta: 1 });
			},
			onAvatarError(e) {
				this.avatarSrc = '/static/logo.jpg';
			}
		}
	}
</script>

<style>
	.user-container {
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	/* 顶部返回栏 */
	.nav-header {
		display: flex;
		align-items: center;
		height: 90rpx;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding-left: 20rpx;
	}
	.back-btn {
		display: flex;
		align-items: center;
		padding: 10rpx;
	}
	.back-text {
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #fff;
	}
	
	.user-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 60rpx 40rpx 40rpx;
		color: white;
	}
	
	.avatar-section {
		display: flex;
		align-items: center;
	}
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		margin-right: 30rpx;
		border: 4rpx solid rgba(255,255,255,0.3);
	}
	
	.user-info {
		flex: 1;
	}
	
	.username {
		font-size: 36rpx;
		font-weight: bold;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.user-desc {
		font-size: 28rpx;
		opacity: 0.8;
	}
	
	.user-menu {
		padding: 20rpx;
	}
	
	.menu-item {
		background-color: white;
		margin-bottom: 20rpx;
		border-radius: 15rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
	}
	
	.menu-icon {
		margin-right: 30rpx;
	}
	
	.icon {
		font-size: 40rpx;
	}
	
	.menu-content {
		flex: 1;
	}
	
	.menu-title {
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.menu-desc {
		font-size: 26rpx;
		color: #999;
	}
	
	.menu-arrow {
		color: #ccc;
	}
	
	.arrow {
		font-size: 32rpx;
	}
</style> 