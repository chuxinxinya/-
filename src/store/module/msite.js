/* 
首页模块相关数据管理
*/

import {
  reqAddress,
  reqCategorys,
  reqShops
} from "@/api";

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from "../mutation-types";

export default {
  state: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
  },
  mutations: {
    [RECEIVE_ADDRESS](state,address){
      state.address = address
    },
  
    [RECEIVE_CATEGORYS](state,categorys){
      state.categorys = categorys
    },
  
    [RECEIVE_SHOPS](state,shops){
      state.shops = shops
    }
  },
  actions: {
      //发送异步获取地址的请求
    async getAddress({commit,state}){
      const {longitude,latitude} = state
      //发送异步请求
      const result = await reqAddress(longitude,latitude)
      const address = result.data
      //请求成功后交给mutation
      if(result.code===0){
        commit(RECEIVE_ADDRESS,address)
      }
    },

    //发送异步获取商品分类列表的请求
    async getCategory({commit}){
      //发送异步请求
      const result = await reqCategorys()
      const categorys = result.data
      //请求成功后交给mutation
      if(result.code===0){
        commit(RECEIVE_CATEGORYS,categorys)
      }
    },

    //发送异步获取商铺的请求
    async getShops({commit,state}){
      const {longitude,latitude} = state
      //发送异步请求
      const result = await reqShops({longitude,latitude})
      const shops = result.data
      //请求成功后交给mutation
      if(result.code===0){
        commit(RECEIVE_SHOPS,shops)
      }
    }
  },
  getters: {

  }
}