import Vue from 'vue'
import 'lib-flexible'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

import App from '@/App' // 引入自定义组件
import router from './router'
import store from './store/store'
import Header from './components/Header/Header.vue'

//声明使用插件
Vue.component('Header',Header)
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    phone: '手机号',
    code: '验证码'
  }
})

new Vue({
  render:h => h(App),
  router,
  store
}).$mount('#app')