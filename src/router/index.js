//路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from'./routes'

//声明使用插件
Vue.use(VueRouter)

//默认暴露
export default new VueRouter({
  mode:'history',
  routes
})
