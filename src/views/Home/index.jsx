import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getHeohash, getHomeCate, getShop } from '../../api/home'
import { getNowCity } from '../../api/index'
import { Search, ShopO } from '@react-vant/icons';
import { Rate } from 'react-vant';
import HomeSwiper from "../../component/Home/Swiper";
import './index.less'

export default function Home() {
    let [search] = useSearchParams()
    let navigate = useNavigate()
    let geohash = search.get('geohash')

    let [cityInfo, setCityInfo] = useState({})
    let [homeCateList, setHomeCateList] = useState([])
    let [shopList, setShopList] = useState([])
    console.log(shopList);

    useEffect(() => {
        //获取地区详细信息
        if (!search.get('geohash')) {
            getNowCity().then(res => {
                getHeohash(res.data.latitude+','+res.data.longitude).then(res => setCityInfo(res.data))
            })
        } else {
            getHeohash(geohash).then(res => setCityInfo(res.data))
        }
        //获取home分类列表
        getHomeCate().then(res => setHomeCateList(res.data))
        //获取附近商家
        getShop(cityInfo.latitude, cityInfo.longitude).then(res => setShopList(res.data))

    }, [geohash, cityInfo.latitude, cityInfo.longitude])

    return (
        <div className="home">
            <div className="home_nav">
                <div className="home_search">
                    <Search fontSize={25} />
                </div>
                <div className="home_title" onClick={() => navigate('/selectCity')}>
                    <p>{cityInfo.name}</p>
                </div>
                <div>
                    <span>登录</span>|<span>注册</span>
                </div>
            </div>
            <div className="home_swiper">
                <HomeSwiper homeCateList={homeCateList} latitude={cityInfo.latitude} longitude={cityInfo.longitude}></HomeSwiper>
            </div>
            <div className="home_mid">
                <p className="fjsj"><ShopO fontSize={18} /> 附近商家</p>
                {
                    shopList.length !== 0 && (shopList.map((item, index) => {
                        return (
                            <div className="shopitem" key={index}>
                                <div className="shopitemleft">
                                    <img src={`https://elm.cangdu.org/img/${item.image_path}`} alt="" />
                                </div>
                                <div className="shopitemright">
                                    <div className="item_top">
                                        <div className="mid_top"><span className="pinpai">品牌</span><span className="mid_name">{item.name}</span></div>
                                        <div className="right_top"><span className="bzp">保</span><span className="bzp">准</span><span className="bzp">票</span></div>
                                    </div>
                                    <div className="item_mid">
                                        <div className="mid_mid"><Rate value={item.rating} size={12} gutter={1} color={'rgb(255, 210, 30)'} /><span className="star"> {item.rating}</span><span className="yuexiao"> 月销{item.recent_order_num}单</span></div>
                                        <div className="right_mid"><span className="fnzs">{item.delivery_mode.text}</span><span className="zsd">准时达</span></div>
                                    </div>
                                    <div className="item_btm">
                                        <div className="mid_btm">￥{item.float_minimum_order_amount}起送/{item.piecewise_agent_fee.tips}</div>
                                        <div className="right_btm">{item.distance} / <span className="pssj">{item.order_lead_time}</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    )
                }
            </div>
        </div>
    )
}
