//所有请求函数
import axios from "./ajax";

//获取地址的请求
export const reqAddress = (longitude,latitude) => axios(`/position/${latitude},${longitude}`)

//获取商品分类列表的请求
export const reqCategorys = () => axios('/index_category')

//获取商铺列表的请求
export const reqShops = ({longitude,latitude}) => axios('/shops',{params:{latitude,longitude}})

