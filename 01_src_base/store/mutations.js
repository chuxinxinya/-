//默认暴露一个包含n个用于直接更新数据的方法的对象模块

//引入定义的变量
import {REQUESTING,REQ_SUCCESS,REQ_ERROR} from "./mutation-type";

export default {
  //直接更新状态的有三种情况

  //第一种,请求中
  [REQUESTING](state){
    state.firstView = false,
    state.loading = true
  },

  //第二种,请求成功
  [REQ_SUCCESS](state,{users}){
    state.loading = false,
    // state.errorMsg=false,
    state.users = users
  },

  //第三种,请求失败
  [REQ_ERROR](state,{errorMsg}){
    state.loading = false
    state.errorMsg = errorMsg
  }
}