<template>
	<view class="profile-container">
		<!-- 顶部导航栏 -->
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#333"></uni-icons>
				<text class="back-text">返回</text>
			</view>
			<text class="page-title">个人信息</text>
			<view class="placeholder"></view>
		</view>
		
		<view class="profile-header">
			<view class="avatar-section">
				<image class="avatar" src="/static/default-avatar.png" mode="aspectFill"></image>
				<view class="change-avatar">
					<text>更换头像</text>
				</view>
			</view>
		</view>
		
		<view class="profile-form">
			<view class="form-item" v-for="(item, index) in formItems" :key="index">
				<view class="form-label">
					<text>{{item.label}}</text>
				</view>
				<view class="form-input">
					<input 
						:placeholder="item.placeholder" 
						:value="item.value"
						@input="handleInput(index, $event)"
						:type="item.type || 'text'"
					/>
				</view>
			</view>
		</view>
		
		<view class="save-button">
			<button @click="saveProfile" type="primary">保存修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formItems: [
					{
						label: '用户名',
						placeholder: '请输入用户名',
						value: '用户名',
						type: 'text'
					},
					{
						label: '手机号',
						placeholder: '请输入手机号',
						value: '138****8888',
						type: 'number'
					},
					{
						label: '邮箱',
						placeholder: '请输入邮箱',
						value: 'user@example.com',
						type: 'text'
					},
					{
						label: '个人简介',
						placeholder: '请输入个人简介',
						value: '这个人很懒，什么都没写~',
						type: 'text'
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
			handleInput(index, event) {
				this.formItems[index].value = event.detail.value;
			},
			saveProfile() {
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				});
			}
		}
	}
</script>

<style>
	.profile-container {
		background-color: #f5f5f5;
		min-height: 100vh;
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
	
	.profile-header {
		background-color: white;
		padding: 40rpx;
		text-align: center;
		margin-bottom: 20rpx;
	}
	
	.avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.avatar {
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
		margin-bottom: 20rpx;
	}
	
	.change-avatar {
		color: #007AFF;
		font-size: 28rpx;
	}
	
	.profile-form {
		background-color: white;
		margin-bottom: 40rpx;
	}
	
	.form-item {
		display: flex;
		align-items: center;
		padding: 30rpx 40rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.form-label {
		width: 200rpx;
		font-size: 30rpx;
		color: #333;
	}
	
	.form-input {
		flex: 1;
	}
	
	.form-input input {
		font-size: 30rpx;
		color: #666;
	}
	
	.save-button {
		padding: 40rpx;
	}
	
	.save-button button {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
	}
</style> 