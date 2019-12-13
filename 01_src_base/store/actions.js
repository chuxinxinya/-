//默认暴露一个包含n个用于间接更新状态数据的方法的对象模块
//可以包含异步操作和逻辑性代码

import axios from "axios";
import {REQUESTING,REQ_SUCCESS,REQ_ERROR} from "./mutation-type";

export default {

  async search({commit},searchName){
    //处理请求中
    commit(REQUESTING)

    try {
      //发异步ajax请求获取用户列表数据
      const response = await axios('/api/search/users',{params:{q:searchName}})
      //如果成功,更新状态数据(成功)
      const result = response.data
      const users = result.items.map(item => ({
        username:item.login,
        url:item.html_url,
        avatar_url:item.avatar_url
      }))
      commit(REQ_SUCCESS,{users})
    } catch (error){
      commit(REQ_ERROR,{errorMsg:error.message})
    }
 }
}