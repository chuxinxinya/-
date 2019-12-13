import Vue from 'vue'
import 'lib-flexible'

import App from '@/App' // 引入自定义组件
import router from './router'

new Vue({
  render:h => h(App),
  router
}).$mount('#app')