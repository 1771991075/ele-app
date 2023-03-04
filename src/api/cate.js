import sendHttp from '../utils/http'

//获取分类页面中的商家
let getCateShop = (latitude,longitude,restaurant_category_id,order_by=null) =>sendHttp(`/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&restaurant_category_id=${restaurant_category_id}&order_by=${order_by}`,'get')

//获取分类页面中的详情分类
let getCateInfo = (latitude,longitude) =>sendHttp(`/shopping/v2/restaurant/category?latitude=${latitude}&longitude=${longitude}`,'get')

//选择分类列表获取商家信息
let getCateSubInfo = (latitude,longitude,restaurant_category_id,ids,sub_id,order_by=null) =>sendHttp(`/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&restaurant_category_id=${restaurant_category_id}&restaurant_category_ids%5B%5D=${ids}&restaurant_category_ids%5B%5D=${sub_id}&order_by=${order_by}`,'get')

//配送类型请求
let sendType = (latitude,longitude) => sendHttp(`/shopping/v1/restaurants/delivery_modes?latitude=${latitude}&longitude=${longitude}`,'get')

//获取商家属性
let getShopsx = (latitude,longitude) =>sendHttp(`/shopping/v1/restaurants/activity_attributes?latitude=${latitude}&longitude=${longitude}`,'get')

export {
    getCateShop,
    getCateInfo,
    getCateSubInfo,
    sendType,
    getShopsx
}