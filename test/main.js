import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import HeaderNav from '@/components/common/HeaderNav.vue'
import TabBar from '@/components/common/TabBar.vue'
import store from '@/utils/store.js'

export function createApp() {
  const app = createSSRApp(App)
  
  // 全局注册组件
  app.component('uni-icons', uniIcons)
  app.component('HeaderNav', HeaderNav)
  app.component('TabBar', TabBar)
  
  // 全局状态管理
  app.config.globalProperties.$store = store
  
  // 错误处理
  app.config.errorHandler = (err, vm, info) => {
    console.error('Vue Error:', err)
    console.error('Error Info:', info)
    // 避免错误导致应用崩溃
  }
  
  // 警告处理
  app.config.warnHandler = (msg, vm, trace) => {
    console.warn('Vue Warning:', msg)
    console.warn('Warning Trace:', trace)
    // 避免警告影响应用运行
  }
  
  return {
    app
  }
}
// #endif