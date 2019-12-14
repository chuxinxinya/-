import Vue from 'vue'
import 'lib-flexible'

import App from '@/App' // 引入自定义组件
import router from './router'
import store from './store/store'
import Header from './components/Header/Header.vue'
Vue.component('Header',Header)
new Vue({
  render:h => h(App),
  router,
  store
}).$mount('#app')