//一个包含n个间接操作状态的属性方法的对象
//可以包含异步或逻辑性代码

import {reqAddress,reqCategorys,reqShops} from "@/api";

import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS} from "./mutation-types";

export default {

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
  

  
}
