<template>
	<view class="help-container">
		<view class="nav-header">
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="20" color="#fff"></uni-icons>
				<text class="back-text">返回</text>
			</view>
		</view>
		<view class="search-section">
			<view class="search-box">
				<text class="search-icon">🔍</text>
				<input 
					class="search-input" 
					placeholder="搜索问题" 
					v-model="searchKeyword"
					@input="handleSearch"
				/>
			</view>
		</view>
		
		<view class="help-categories">
			<view class="category-item" v-for="(category, index) in categories" :key="index" @click="selectCategory(index)">
				<view class="category-icon">{{category.icon}}</view>
				<text class="category-name">{{category.name}}</text>
				<text class="category-count">{{category.count}}个问题</text>
			</view>
		</view>
		
		<view class="faq-section">
			<view class="section-title">常见问题</view>
			<view class="faq-list">
				<view class="faq-item" v-for="(faq, index) in filteredFaqs" :key="index" @click="toggleFaq(index)">
					<view class="faq-question">
						<text class="question-text">{{faq.question}}</text>
						<text class="expand-icon" :class="{ expanded: faq.expanded }">{{faq.expanded ? '−' : '+'}}</text>
					</view>
					<view class="faq-answer" v-if="faq.expanded">
						<text class="answer-text">{{faq.answer}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="contact-section">
			<view class="section-title">联系我们</view>
			<view class="contact-list">
				<view class="contact-item" v-for="(contact, index) in contacts" :key="index" @click="handleContact(contact)">
					<text class="contact-icon">{{contact.icon}}</text>
					<view class="contact-info">
						<text class="contact-title">{{contact.title}}</text>
						<text class="contact-desc">{{contact.desc}}</text>
					</view>
					<text class="contact-arrow">></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				selectedCategory: -1,
				categories: [
					{ name: '账户问题', icon: '👤', count: 5 },
					{ name: '订单问题', icon: '📦', count: 8 },
					{ name: '支付问题', icon: '💳', count: 3 },
					{ name: '技术问题', icon: '🔧', count: 6 }
				],
				faqs: [
					{
						question: '如何修改密码？',
						answer: '进入"我的"页面，点击"设置"，选择"修改密码"，按照提示操作即可。',
						category: 0,
						expanded: false
					},
					{
						question: '忘记密码怎么办？',
						answer: '可以通过绑定的手机号或邮箱进行密码重置，或联系客服协助处理。',
						category: 0,
						expanded: false
					},
					{
						question: '如何查看订单状态？',
						answer: '进入"我的订单"页面，可以查看所有订单的状态，包括待付款、待发货、已完成等。',
						category: 1,
						expanded: false
					},
					{
						question: '订单可以取消吗？',
						answer: '在订单未发货前可以申请取消，已发货的订单需要联系客服处理。',
						category: 1,
						expanded: false
					},
					{
						question: '支持哪些支付方式？',
						answer: '目前支持微信支付、支付宝、银行卡等多种支付方式。',
						category: 2,
						expanded: false
					},
					{
						question: '支付失败怎么办？',
						answer: '请检查网络连接和账户余额，如仍有问题请联系客服。',
						category: 2,
						expanded: false
					},
					{
						question: '如何清除缓存？',
						answer: '进入"设置"页面，选择"清除缓存"即可清理应用缓存数据。',
						category: 3,
						expanded: false
					},
					{
						question: '应用闪退怎么办？',
						answer: '请尝试重启应用或重新安装，如问题持续请联系技术支持。',
						category: 3,
						expanded: false
					}
				],
				contacts: [
					{
						title: '在线客服',
						desc: '工作时间：9:00-18:00',
						icon: '💬'
					},
					{
						title: '客服电话',
						desc: '400-123-4567',
						icon: '📞'
					},
					{
						title: '邮箱支持',
						desc: 'support@example.com',
						icon: '📧'
					}
				]
			}
		},
		computed: {
			filteredFaqs() {
				let filtered = this.faqs;
				
				// 按分类筛选
				if (this.selectedCategory >= 0) {
					filtered = filtered.filter(faq => faq.category === this.selectedCategory);
				}
				
				// 按关键词搜索
				if (this.searchKeyword) {
					filtered = filtered.filter(faq => 
						faq.question.includes(this.searchKeyword) || 
						faq.answer.includes(this.searchKeyword)
					);
				}
				
				return filtered;
			}
		},
		methods: {
			handleSearch() {
				// 搜索逻辑已在computed中处理
			},
			selectCategory(index) {
				this.selectedCategory = this.selectedCategory === index ? -1 : index;
			},
			toggleFaq(index) {
				this.faqs[index].expanded = !this.faqs[index].expanded;
			},
			handleContact(contact) {
				uni.showToast({
					title: `联系${contact.title}`,
					icon: 'none'
				});
			},
			goBack() {
				uni.navigateBack({ delta: 1 });
			}
		}
	}
</script>

<style>
	.help-container {
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.nav-header {
		background-color: #007AFF;
		padding: 20rpx 40rpx;
		margin-bottom: 20rpx;
	}
	
	.back-btn {
		display: flex;
		align-items: center;
	}
	
	.back-text {
		font-size: 28rpx;
		color: #fff;
		margin-left: 20rpx;
	}
	
	.search-section {
		background-color: white;
		padding: 30rpx 40rpx;
		margin-bottom: 20rpx;
	}
	
	.search-box {
		display: flex;
		align-items: center;
		background-color: #f8f9fa;
		border-radius: 25rpx;
		padding: 20rpx 30rpx;
	}
	
	.search-icon {
		font-size: 32rpx;
		margin-right: 20rpx;
	}
	
	.search-input {
		flex: 1;
		font-size: 28rpx;
	}
	
	.help-categories {
		background-color: white;
		padding: 30rpx 40rpx;
		margin-bottom: 20rpx;
	}
	
	.category-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.category-item:last-child {
		border-bottom: none;
	}
	
	.category-icon {
		font-size: 40rpx;
		margin-right: 30rpx;
	}
	
	.category-name {
		flex: 1;
		font-size: 30rpx;
		color: #333;
	}
	
	.category-count {
		font-size: 26rpx;
		color: #999;
	}
	
	.faq-section {
		background-color: white;
		margin-bottom: 20rpx;
	}
	
	.section-title {
		padding: 30rpx 40rpx 20rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
	
	.faq-list {
		padding: 0 40rpx;
	}
	
	.faq-item {
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.faq-item:last-child {
		border-bottom: none;
	}
	
	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 0;
	}
	
	.question-text {
		flex: 1;
		font-size: 28rpx;
		color: #333;
		line-height: 1.5;
	}
	
	.expand-icon {
		font-size: 32rpx;
		color: #007AFF;
		font-weight: bold;
	}
	
	.faq-answer {
		padding-bottom: 30rpx;
	}
	
	.answer-text {
		font-size: 26rpx;
		color: #666;
		line-height: 1.6;
	}
	
	.contact-section {
		background-color: white;
	}
	
	.contact-list {
		padding: 0 40rpx;
	}
	
	.contact-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.contact-item:last-child {
		border-bottom: none;
	}
	
	.contact-icon {
		font-size: 40rpx;
		margin-right: 30rpx;
	}
	
	.contact-info {
		flex: 1;
	}
	
	.contact-title {
		font-size: 30rpx;
		color: #333;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.contact-desc {
		font-size: 26rpx;
		color: #999;
	}
	
	.contact-arrow {
		font-size: 28rpx;
		color: #ccc;
	}
</style> 