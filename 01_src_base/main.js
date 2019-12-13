import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  //vue的包是不需要带编译器的,整体的打包文件更小
  //创建app的组件对象返回,最终会被渲染到页面
  render: h => h(App),
}).$mount('#app')
