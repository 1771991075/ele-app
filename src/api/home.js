import sendHttp from '../utils/http'

//根据经纬度精确查找
let getHeohash = (geohash) =>sendHttp(`/v2/pois/${geohash}`,'get')

//获取home分类列表
let getHomeCate = () =>sendHttp(`/v2/index_entry`,'get')

//获取附近商家
let getShop = (latitude,longitude) => sendHttp(`/shopping/restaurants?latitude=34.71803&longitude=113.642996`,'get')

export {
    getHeohash,
    getHomeCate,
    getShop
}