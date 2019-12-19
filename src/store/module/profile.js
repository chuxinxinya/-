/* 
个人模块相关数据管理
*/

import {
  reqAutoLogin
} from "@/api";

import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN
} from "../mutation-types";

export default {
  state: {
    user:{},
    token:localStorage.getItem('token_key') || '',
  },
  mutations: {
    [RECEIVE_USER](state,user){
      state.user = user
    },
  
    [RECEIVE_TOKEN](state,token){
      state.token = token
    },
  
    [RESET_USER](state){
      state.user = {}
    },
  
    [RESET_TOKEN](state){
      state.token = ''
    }
  },
  actions: {
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
    }
  },
  getters: {

  }
}