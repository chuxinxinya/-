//所有请求函数
import axios from "./ajax";

//获取地址的请求
export const reqAddress = (longitude,latitude) => axios(`/position/${latitude},${longitude}`)

//获取商品分类列表的请求
export const reqCategorys = () => axios('/index_category')

//获取商铺列表的请求
export const reqShops = ({longitude,latitude}) => axios('/shops',{params:{latitude,longitude}})

//用户名密码登录的请求
export const reqPwdLogin = ({user,pwd,captcha}) => axios.post('/login_pwd',{name:user,pwd,captcha})

//手机号验证码登录的请求
export const reqSmsLogin = ({phone,code}) => axios.post('/login_sms',{phone,code})

//发送短信验证码的请求
export const reqSendCode = (phone) => axios.get('/sendcode',{params:{phone}})

//自动登录的请求
export const reqAutoLogin = () => axios.get('/auto_login')

//获取商店商品的列表
export const reqShopGoods = () => axios('/goods')

//获取评价列表
export const reqShopRatings = () => axios('/ratings')

//获取商品商铺的列表
export const reqShopInfo = () => axios('/info')
