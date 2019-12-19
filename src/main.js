import Vue from 'vue'
import 'lib-flexible'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {Button} from "mint-ui";
import VueLazyload from 'vue-lazyload'

import App from '@/App' // 引入自定义组件
import router from './router'
import store from './store/store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import ShopHeader from './components/ShopHeader/ShopHeader.vue'
import CartControl from './components/CartControl/CartControl.vue'
import './validate'
import * as API from '@/api'
import i18n from './i18n'
import './mock/mockServer'
import loading from './common/images/loading.gif'

//将所有api挂载到vue原型上
Vue.prototype.$API = API

//声明使用插件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('ShopHeader',ShopHeader)
Vue.component('CartControl',CartControl)
Vue.component(Button.name,Button)
Vue.use(VeeValidate)
Vue.use(VueLazyload, {
  loading
})

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
  i18n,
  store
}).$mount('#app')