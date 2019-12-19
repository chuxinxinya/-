/* 
商店的模块相关数据管理
*/
import Vue from 'vue'

import {
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from "@/api";

import {
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_HASCOUNT,
  ADD_FOOD_NOCOUNT,
  REDUCE_FOOD_HASCOUNT,
  CLEAR_CART
} from "../mutation-types";

export default {
  state: {
    goods:[], //商品
    ratings:[], //评价
    info:{}, //详情
    cartFoods:[]
  },
  mutations: {
    [RECEIVE_GOODS](state,goods){
      state.goods = goods
    },
  
    [RECEIVE_RATINGS](state,ratings){
      state.ratings = ratings
    },
  
    [RECEIVE_INFO](state,info){
      state.info = info
    },
  
    [ADD_FOOD_HASCOUNT](state,{food}){
      food.count++
    },
  
    [ADD_FOOD_NOCOUNT](state,{food}){
      //使用vue.set方法为响应式对象添加属性
      //参数为target,key,value,注意key的类型为string
      Vue.set(food,'count',1)
      //当数量由0变为1的时候,手动向cartfood中添加当前food
      state.cartFoods.push(food)
    },
  
    [REDUCE_FOOD_HASCOUNT](state,{food}){
      food.count--
      //判断购物车中的数量是否为0,当为0时,将food从购物车中清除
      if(food.count === 0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    },

    [CLEAR_CART](state){
      //遍历所有food,将count置为0
      state.cartFoods.forEach(food => food.count=0);
      //将购物车置空
      state.cartFoods = []
    }
  },
  actions: {
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
    },

    //更新食物数量的同步请求
    updateFoodCount({commit},{isAdd,food}){
      if(isAdd){
        if(food.count){
          commit(ADD_FOOD_HASCOUNT,{food})
        }else{
          commit(ADD_FOOD_NOCOUNT,{food})
        }
      }else{
        if(food.count>0){
          commit(REDUCE_FOOD_HASCOUNT,{food})
        }
      }
    }
  },
  getters: {
    //getter方法,是基于当前state属性计算,所以将更新food的数据定义在getters中
    totalCount(state){
      return state.cartFoods.reduce((pre,food) => pre + food.count,0)
    },
    totalPrice(state){
      return state.cartFoods.reduce((pre,food) => pre + food.count*food.price,0)
    }
  }
}