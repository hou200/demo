<template>
	<view class="orders-container">
		<!-- 顶部导航栏 -->
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#333"></uni-icons>
				<text class="back-text">返回</text>
			</view>
			<text class="page-title">我的订单</text>
			<view class="placeholder"></view>
		</view>
		
		<view class="order-tabs">
			<view 
				class="tab-item" 
				v-for="(tab, index) in tabs" 
				:key="index"
				:class="{ active: currentTab === index }"
				@click="switchTab(index)"
			>
				<text>{{tab.name}}</text>
			</view>
		</view>
		
		<view class="order-list">
			<view class="order-item" v-for="(order, index) in currentOrders" :key="index">
				<view class="order-header">
					<text class="order-number">订单号：{{order.orderNo}}</text>
					<text class="order-status" :class="order.status">{{order.statusText}}</text>
				</view>
				<view class="order-content">
					<view class="product-info">
						<image class="product-image" :src="order.productImage" mode="aspectFill"></image>
						<view class="product-details">
							<text class="product-name">{{order.productName}}</text>
							<text class="product-price">¥{{order.price}}</text>
						</view>
					</view>
				</view>
				<view class="order-footer">
					<text class="order-time">{{order.createTime}}</text>
					<view class="order-actions">
						<button class="action-btn" v-if="order.status === 'pending'">取消订单</button>
						<button class="action-btn primary" v-if="order.status === 'pending'">立即支付</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty-state" v-if="currentOrders.length === 0">
			<text class="empty-text">暂无订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				tabs: [
					{ name: '全部', status: 'all' },
					{ name: '待付款', status: 'pending' },
					{ name: '待发货', status: 'paid' },
					{ name: '已完成', status: 'completed' }
				],
				allOrders: [
					{
						orderNo: 'ORD20231201001',
						status: 'pending',
						statusText: '待付款',
						productName: '商品名称1',
						productImage: '/static/product1.jpg',
						price: '99.00',
						createTime: '2023-12-01 10:30:00'
					},
					{
						orderNo: 'ORD20231130001',
						status: 'paid',
						statusText: '待发货',
						productName: '商品名称2',
						productImage: '/static/product2.jpg',
						price: '199.00',
						createTime: '2023-11-30 15:20:00'
					},
					{
						orderNo: 'ORD20231129001',
						status: 'completed',
						statusText: '已完成',
						productName: '商品名称3',
						productImage: '/static/product3.jpg',
						price: '299.00',
						createTime: '2023-11-29 09:15:00'
					}
				]
			}
		},
		computed: {
			currentOrders() {
				if (this.currentTab === 0) {
					return this.allOrders;
				}
				const status = this.tabs[this.currentTab].status;
				return this.allOrders.filter(order => order.status === status);
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			switchTab(index) {
				this.currentTab = index;
			}
		}
	}
</script>

<style>
	.orders-container {
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
	
	.order-tabs {
		display: flex;
		background-color: white;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}
	
	.tab-item {
		flex: 1;
		text-align: center;
		padding: 20rpx 0;
		font-size: 28rpx;
		color: #666;
		position: relative;
	}
	
	.tab-item.active {
		color: #007AFF;
	}
	
	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60rpx;
		height: 4rpx;
		background-color: #007AFF;
		border-radius: 2rpx;
	}
	
	.order-list {
		padding: 0 20rpx;
	}
	
	.order-item {
		background-color: white;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
	}
	
	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.order-number {
		font-size: 26rpx;
		color: #666;
	}
	
	.order-status {
		font-size: 26rpx;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
	}
	
	.order-status.pending {
		background-color: #fff3cd;
		color: #856404;
	}
	
	.order-status.paid {
		background-color: #d1ecf1;
		color: #0c5460;
	}
	
	.order-status.completed {
		background-color: #d4edda;
		color: #155724;
	}
	
	.order-content {
		margin-bottom: 20rpx;
	}
	
	.product-info {
		display: flex;
		align-items: center;
	}
	
	.product-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}
	
	.product-details {
		flex: 1;
	}
	
	.product-name {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.product-price {
		font-size: 30rpx;
		color: #FF5722;
		font-weight: 600;
	}
	
	.order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.order-time {
		font-size: 24rpx;
		color: #999;
	}
	
	.order-actions {
		display: flex;
		gap: 20rpx;
	}
	
	.action-btn {
		padding: 10rpx 20rpx;
		border: 1rpx solid #ddd;
		border-radius: 20rpx;
		font-size: 24rpx;
		background-color: white;
		color: #666;
	}
	
	.action-btn.primary {
		background-color: #007AFF;
		color: white;
		border-color: #007AFF;
	}
	
	.empty-state {
		text-align: center;
		padding: 100rpx 0;
	}
	
	.empty-text {
		font-size: 28rpx;
		color: #999;
	}
</style> 