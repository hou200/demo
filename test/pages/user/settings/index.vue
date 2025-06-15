<template>
	<view class="settings-container">
		<!-- 顶部导航栏 -->
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#333"></uni-icons>
				<text class="back-text">返回</text>
			</view>
			<text class="page-title">设置</text>
			<view class="placeholder"></view>
		</view>
		
		<view class="settings-group" v-for="(group, groupIndex) in settingsGroups" :key="groupIndex">
			<view class="group-title" v-if="group.title">{{group.title}}</view>
			<view class="settings-list">
				<view class="setting-item" v-for="(item, index) in group.items" :key="index" @click="handleSettingClick(item)">
					<view class="setting-left">
						<text class="setting-icon">{{item.icon}}</text>
						<text class="setting-title">{{item.title}}</text>
					</view>
					<view class="setting-right">
						<text class="setting-value" v-if="item.value">{{item.value}}</text>
						<switch v-if="item.type === 'switch'" :checked="item.checked" @change="handleSwitchChange(item, $event)" />
						<text class="setting-arrow" v-else>></text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="logout-section">
			<button class="logout-btn" @click="handleLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				settingsGroups: [
					{
						title: '账户设置',
						items: [
							{
								title: '修改密码',
								icon: '🔒',
								type: 'navigate'
							},
							{
								title: '绑定手机',
								icon: '📱',
								value: '138****8888',
								type: 'navigate'
							},
							{
								title: '绑定邮箱',
								icon: '📧',
								value: 'user@example.com',
								type: 'navigate'
							}
						]
					},
					{
						title: '通知设置',
						items: [
							{
								title: '推送通知',
								icon: '🔔',
								type: 'switch',
								checked: true
							},
							{
								title: '声音提醒',
								icon: '🔊',
								type: 'switch',
								checked: false
							},
							{
								title: '震动提醒',
								icon: '📳',
								type: 'switch',
								checked: true
							}
						]
					},
					{
						title: '隐私设置',
						items: [
							{
								title: '隐私政策',
								icon: '🛡️',
								type: 'navigate'
							},
							{
								title: '用户协议',
								icon: '📄',
								type: 'navigate'
							},
							{
								title: '清除缓存',
								icon: '🗑️',
								value: '23.5MB',
								type: 'navigate'
							}
						]
					},
					{
						title: '关于',
						items: [
							{
								title: '版本信息',
								icon: 'ℹ️',
								value: 'v1.0.0',
								type: 'navigate'
							},
							{
								title: '检查更新',
								icon: '🔄',
								type: 'navigate'
							}
						]
					}
				]
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			handleSettingClick(item) {
				if (item.type === 'navigate') {
					uni.showToast({
						title: `点击了${item.title}`,
						icon: 'none'
					});
				}
			},
			handleSwitchChange(item, event) {
				item.checked = event.detail.value;
				uni.showToast({
					title: `${item.title}已${item.checked ? '开启' : '关闭'}`,
					icon: 'none'
				});
			},
			handleLogout() {
				uni.showModal({
					title: '确认退出',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 清除用户信息
							uni.removeStorageSync('userInfo');
							
							uni.showToast({
								title: '已退出登录',
								icon: 'success',
								duration: 2000,
								success: () => {
									// 延迟跳转，让用户看到提示
									setTimeout(() => {
										uni.reLaunch({
											url: '/pages/login/login'
										});
									}, 2000);
								}
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.settings-container {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 40rpx;
	}
	
	.nav-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		background-color: white;
		border-bottom: 1rpx solid #f0f0f0;
		position: sticky;
		top: 0;
		z-index: 100;
	}
	
	.back-btn {
		display: flex;
		align-items: center;
		padding: 10rpx;
	}
	
	.back-text {
		margin-left: 10rpx;
		font-size: 28rpx;
		color: #333;
	}
	
	.page-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}
	
	.placeholder {
		width: 80rpx;
	}
	
	.settings-group {
		margin-bottom: 20rpx;
	}
	
	.group-title {
		padding: 20rpx 40rpx 10rpx;
		font-size: 26rpx;
		color: #999;
	}
	
	.settings-list {
		background-color: white;
	}
	
	.setting-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 40rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.setting-item:last-child {
		border-bottom: none;
	}
	
	.setting-left {
		display: flex;
		align-items: center;
	}
	
	.setting-icon {
		font-size: 36rpx;
		margin-right: 20rpx;
	}
	
	.setting-title {
		font-size: 30rpx;
		color: #333;
	}
	
	.setting-right {
		display: flex;
		align-items: center;
	}
	
	.setting-value {
		font-size: 26rpx;
		color: #999;
		margin-right: 10rpx;
	}
	
	.setting-arrow {
		font-size: 24rpx;
		color: #ccc;
	}
	
	.logout-section {
		padding: 40rpx;
	}
	
	.logout-btn {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FF5722;
		color: white;
		border: none;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
</style> 