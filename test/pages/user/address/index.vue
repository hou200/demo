<template>
	<view class="address-container">
		<!-- 顶部导航栏 -->
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#333"></uni-icons>
				<text class="back-text">返回</text>
			</view>
			<text class="page-title">收货地址</text>
			<view class="placeholder"></view>
		</view>
		
		<view class="address-list">
			<view class="address-item" v-for="(address, index) in addressList" :key="index">
				<view class="address-content" @click="selectAddress(address)">
					<view class="address-info">
						<view class="name-phone">
							<text class="name">{{address.name}}</text>
							<text class="phone">{{address.phone}}</text>
						</view>
						<view class="address-detail">
							<text class="tag" v-if="address.isDefault">默认</text>
							<text class="detail">{{address.province}}{{address.city}}{{address.district}}{{address.detail}}</text>
						</view>
					</view>
					<view class="address-actions">
						<view class="action-btn" @click.stop="editAddress(address)">
							<uni-icons type="compose" size="16" color="#666"></uni-icons>
							<text>编辑</text>
						</view>
						<view class="action-btn" @click.stop="deleteAddress(address, index)">
							<uni-icons type="trash" size="16" color="#666"></uni-icons>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-state" v-if="addressList.length === 0">
			<text class="empty-text">暂无收货地址</text>
		</view>
		
		<view class="add-address-btn">
			<button @click="addAddress" type="primary">+ 新增收货地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [
					{
						id: 1,
						name: '张三',
						phone: '138****8888',
						province: '北京市',
						city: '北京市',
						district: '朝阳区',
						detail: '三里屯街道工体北路8号',
						isDefault: true
					},
					{
						id: 2,
						name: '李四',
						phone: '139****9999',
						province: '上海市',
						city: '上海市',
						district: '浦东新区',
						detail: '陆家嘴街道世纪大道100号',
						isDefault: false
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
			selectAddress(address) {
				uni.showToast({
					title: `选择了${address.name}的地址`,
					icon: 'none'
				});
			},
			editAddress(address) {
				uni.showToast({
					title: `编辑${address.name}的地址`,
					icon: 'none'
				});
			},
			deleteAddress(address, index) {
				uni.showModal({
					title: '确认删除',
					content: `确定要删除${address.name}的收货地址吗？`,
					success: (res) => {
						if (res.confirm) {
							this.addressList.splice(index, 1);
							uni.showToast({
								title: '删除成功',
								icon: 'success'
							});
						}
					}
				});
			},
			addAddress() {
				uni.showToast({
					title: '跳转到新增地址页面',
					icon: 'none'
				});
			}
		}
	}
</script>

<style>
	.address-container {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 120rpx;
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
	
	.address-list {
		padding: 20rpx;
	}
	
	.address-item {
		background-color: white;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
	}
	
	.address-content {
		padding: 30rpx;
	}
	
	.address-info {
		margin-bottom: 20rpx;
	}
	
	.name-phone {
		display: flex;
		align-items: center;
		margin-bottom: 15rpx;
	}
	
	.name {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-right: 20rpx;
	}
	
	.phone {
		font-size: 28rpx;
		color: #666;
	}
	
	.address-detail {
		display: flex;
		align-items: flex-start;
	}
	
	.tag {
		background-color: #007AFF;
		color: white;
		font-size: 20rpx;
		padding: 4rpx 12rpx;
		border-radius: 10rpx;
		margin-right: 15rpx;
		margin-top: 4rpx;
	}
	
	.detail {
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
		flex: 1;
	}
	
	.address-actions {
		display: flex;
		justify-content: flex-end;
		gap: 30rpx;
		padding-top: 20rpx;
		border-top: 1rpx solid #f0f0f0;
	}
	
	.action-btn {
		display: flex;
		align-items: center;
		padding: 10rpx 15rpx;
		border: 1rpx solid #ddd;
		border-radius: 20rpx;
		background-color: white;
	}
	
	.action-btn text {
		font-size: 24rpx;
		color: #666;
		margin-left: 8rpx;
	}
	
	.empty-state {
		text-align: center;
		padding: 100rpx 0;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
	
	.add-address-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 40rpx;
		background-color: white;
		border-top: 1rpx solid #f0f0f0;
	}
	
	.add-address-btn button {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
	}
</style> 