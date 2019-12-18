//一个包含n个间接操作状态的属性方法的对象
//可以包含异步或逻辑性代码

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from "@/api";

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from "./mutation-types";

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
  },
  
  //发送同步保存数据的请求
  saveUser({commit},user){
    //从user中取出token
    const token = user.token
    //将token保存进localstorage
    localStorage.setItem('token_key',token)
    //删除user中的token
    delete user.token
    //将token和user保存进状态中
    commit(RECEIVE_USER,user)
    commit(RECEIVE_TOKEN,token)
  },

  //发送异步自动登录的请求
  async autoLogin({commit,state}){
    //判断有token,且没有user才可以发送请求
    if(state.token && !state.user._id){
      const result = await reqAutoLogin()
      //判断返回的结果
      if(result.code === 0){
        //请求成功
        const user = result.data  //此时返回的数据中没有token
        commit(RECEIVE_USER,user)
      }
    }
  },

  //退出登录
  logout({commit}){
    //从local中删除数据
    localStorage.removeItem('token_key')
    //通知mutation删除state中的数据
    commit(RESET_USER)
    commit(RESET_TOKEN)
  },

  //异步获取商家商品列表
  async getShopGoods({commit},cb){
    const result = await reqShopGoods()
    if(result.code === 0){
      //数据获取成功
      const goods = result.data
      commit(RECEIVE_GOODS,goods)
      //判断cb的类型并执行
      typeof cb === 'function' && cb()
    }
  },

  //异步获取评价列表
  async getShopRatings({commit},cb){
    const result = await reqShopRatings()
    if(result.code === 0){
      //数据获取成功
      const ratings = result.data
      commit(RECEIVE_RATINGS,ratings)
      //判断cb的类型并执行
      typeof cb === 'function' && cb()
    }
  },

  //异步获取商家详细信息的列表
  async getShopInfo({commit},cb){
    const result = await reqShopInfo()
    if(result.code === 0){
      //数据获取成功
      const info = result.data
      commit(RECEIVE_INFO,info)
      //判断cb的类型并执行
      typeof cb === 'function' && cb()
    }
  }
  
}
