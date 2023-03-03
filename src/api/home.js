import sendHttp from '../utils/http'

//根据经纬度精确查找
let getHeohash = (geohash) =>sendHttp(`/v2/pois/${geohash}`,'get')

export {
    getHeohash
}