/*
对axios的二次封装
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
5. 通过请求头携带token数据
*/

/*
在请求需要授权检查的接口前(在请求拦截器做)
  如果token不存在, 不发请求, 直接进行错误流程(响应拦截器的错误处理): throw error对象(status: 401)
  如果token存在, 将token添加到请求头中: config.headers.Authorization = token
在响应拦截器中处理错误
  1). 如果error中没有response
      如果当前没有在登陆页面, 跳转到登陆页面
  2). 如果error中有response, 取出response中的status
      status为: 401: token过期了, 退出登陆(清除local中的token和state中user与token), 并跳转到登陆页面
      status为: 404: 提示访问的资源不存在
 */
import axios from 'axios'
import qs from 'qs'
import { Indicator,Toast,MessageBox } from 'mint-ui';

import store from '@/store/store.js'
import router from "@/router";

const instance = axios.create({
  baseURL:'/api',
  timeout:15000
})

//请求拦截器
instance.interceptors.request.use((config) => {
  //请求的loading效果
  Indicator.open({
    spinnerType: 'fading-circle'
  });
  
  console.log('req intercepter')
  //请求参数默认类型为json格式,转换成urlencorded
  const data = config.data
  if(data instanceof Object){
    config.data = qs.stringify(data)
  }

  //5. 通过请求头携带token数据
  //获取token 
  const token = store.state.token
  //判断token是否存在
  if(token){
    //发送请求时以请求体的形式携带
    config.headers['Authorization'] = token
  }else{
    //判断当前接口是否需要token,如果需要但是还没有token,就不发请求
    const needCheck = config.headers.needCheck
    //判断如果需要
    if(needCheck){
      //抛一个异常,直接进入响应拦截器的失败的回调
      throw new Error('没有登录,不能发请求')
    }
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  response =>  {
    //关闭请求loading效果
    Indicator.close();

    console.log('response interceptor')
    return response.data
  },
  error => {
    //关闭请求loading效果
    Indicator.close();
    //判断错误里有没有response
    if(!error.response){
      //获取当前路径
      const path = router.currentRoute.path
      //判断当前页面是不是login
      if(path !== '/login'){
        //如果不是,跳转login页面
        router.replace('/login')
        //提示
        Toast(error.message)
      } 
    }else{
      //error中有response
      //判断请求的状态码如果为401,且不再login页面,删除local和state数据,并跳转login页面
      if(error.response.status===401){
        //token过期
        //判断当前是否在login页面
        const path = router.currentRoute.path
        if(path !== 'login'){
          //退出登录.将local和state中的数据删除
          store.dispatch('logout')
          //跳转到登录页面
          router.replace('/login')
        } 
      }else if(error.response.status===404){
        MessageBox('提示','请求资源不存在')
      }else{
        MessageBox('提示','请求出错'+error.message)
      }
    }
    return new Promise(() => {})
  }
)


export default instance