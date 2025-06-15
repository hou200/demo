// 全局状态管理
class Store {
  constructor() {
    this.state = {
      currentTab: 0, // 当前选中的tab
      cartCount: 0,  // 购物车商品数量
      cartItems: []  // 购物车商品列表
    };
    this.listeners = [];
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 设置状态
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  // 订阅状态变化
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // 通知所有监听器
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // 设置当前tab
  setCurrentTab(tabIndex) {
    this.setState({ currentTab: tabIndex });
  }

  // 更新购物车数量（始终根据cartItems自动统计）
  updateCartCount() {
    const count = this.state.cartItems.reduce((total, shop) => {
      return total + shop.goods.reduce((shopTotal, good) => {
        return shopTotal + good.number;
      }, 0);
    }, 0);
    this.setState({ cartCount: count });
  }

  // 更新购物车商品
  updateCartItems(items) {
    this.state.cartItems = items;
    this.updateCartCount();
    this.notify();
  }
}

// 创建全局store实例
const store = new Store();

export default store; 