//vuex最核心的管理对象store

import Vue from 'vue'
import Vuex from 'vuex';

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import msite from './module/msite'
import profile from './module/profile'
import shop from './module/shop'

//声明使用插件
Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules: {
    msite,
    profile,
    shop
  }
})
