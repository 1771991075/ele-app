import sendHttp from '../utils/http'

//获取定位城市
let getNowCity = () =>sendHttp(`/v1/cities?type=guess`,'get')

//获取热门城市
let getHotCity = () =>sendHttp(`/v1/cities?type=hot`,'get')

//获取所有城市
let getAllCity = () =>sendHttp(`/v1/cities?type=group`,'get')

//获取所选城市信息
let getCityInfo = (id) =>sendHttp(`/v1/cities/${id}`,'get')

//获取城市详细信息
let getCityMsg = (id,keyword) =>sendHttp(`/v1/pois?city_id=${id}&keyword=${keyword}&type=search`)

export {
    getNowCity,
    getHotCity,
    getAllCity,
    getCityInfo,
    getCityMsg
}