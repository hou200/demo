<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	
	/* uni-icons 字体定义 */
	@font-face {
		font-family: 'uniicons';
		src: url('./static/uniicons.ttf') format('truetype');
		font-weight: normal;
		font-style: normal;
	}

	.uni-icons {
		font-family: 'uniicons' !important;
		text-decoration: none;
		text-align: center;
	}

	/* 搜索图标 */
	.uniui-search:before { content: "\e654"; }

	/* 定位图标 */
	.uniui-location:before { content: "\e6ae"; }

	/* 用户图标 */
	.uniui-person:before { content: "\e662"; }

	/* 主页图标 */
	.uniui-home:before { content: "\e662"; }

	/* 分类图标 */
	.uniui-apps:before { content: "\e6b2"; }

	/* 购物车图标 */
	.uniui-cart:before { content: "\e631"; }
	.uniui-shoppingcart:before { content: "\e631"; }

	/* 箭头图标 */
	.uniui-arrowdown:before { content: "\e6be"; }

	/* 全选图标 */
	.uniui-circle:before { content: "\e65b"; }
	.uniui-circlefilled:before { content: "\e65e"; }
</style>
