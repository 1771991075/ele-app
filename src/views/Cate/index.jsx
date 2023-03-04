import React, { createRef, useEffect, useState } from 'react';
import './index.less';
import { NavBar, DropdownMenu, Rate, Sidebar ,Cell, Toast ,Button} from 'react-vant';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCateShop, getCateInfo ,getCateSubInfo ,sendType,getShopsx} from '../../api/cate';
import { Arrow,GoldCoinO,ClockO ,StarO,Exchange,FireO,Success,BrowsingHistoryO} from '@react-vant/icons';

export default function Cate() {
    //获取传递过来的参数
    let [search] = useSearchParams()
    let title = search.get('title')
    let latitude = search.get('latitude')
    let longitude = search.get('longitude')
    let restaurant_category_id = search.get('restaurant_category_id')
    let navigate = useNavigate()
    //顶部下拉菜单
    let [value, setValue] = useState('')
    //商家店铺列表
    let [cateList, setCateList] = useState([])
    //所有类别
    let [cateInfo, setCateInfo] = useState([])
    //子页面索引
    let [active, setActive] = useState(0)
    //排序索引
    let [sortType,setSortType] = useState(1)
    //配送方式
    let [songType,setSongType] = useState('')
    //商家属性
    let [shopSx,setShopSx] = useState([])
    //下拉菜单状态
    let isShowRef = createRef()

    //按类型排序商家列表
    let changeShopList = (index) =>{
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        setSortType(index)
        getCateShop(latitude, longitude, restaurant_category_id,index).then(res => {
            setCateList(res.data)
        })
        isShowRef.current.close()
        Toast.clear()
    }
    //选择类别
    let selectCate = (ids,sub_id) =>{
        getCateSubInfo(latitude, longitude, restaurant_category_id,ids,sub_id,sortType).then(res=>{
            setCateList(res.data)
        })
        isShowRef.current.close()
    }

    //点击筛选
    let openSx = () =>{
        sendType(latitude, longitude).then(res=>{
            setSongType(res.data[0].text)
        })
        getShopsx(latitude, longitude).then(res=>{
            setShopSx(res.data)
        })
    }

    useEffect(() => {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        })
        getCateShop(latitude, longitude, restaurant_category_id).then(res => {
            setCateList(res.data)
        })
        getCateInfo(latitude, longitude).then(res => {
            setCateInfo(res.data)
            Toast.clear()
        })
    }, [])

    return (
        <div className='cate'>
            <NavBar
                title={title}
                onClickLeft={() => navigate(-1)}
            />
            <div className='cate_header'>
                <DropdownMenu value={value} onChange={v => setValue(v)} activeColor={'#3190e8'} ref={isShowRef}>
                    <DropdownMenu.Item name='value1' title={title} key={11}>
                        <Sidebar
                            value={active}
                            onChange={(v) => setActive(v)}
                        >
                            {
                                cateInfo.length !== 0 && cateInfo.map((item, index) => {
                                    return (
                                        <Sidebar.Item contentStyle={{ backgroundColor: '#fff', padding: '18px 10px' }} title={<div className='subtitle'>{item.name}<Arrow /></div>} key={index} badge={item.count} >
                                            {
                                                item.sub_categories.map((i, idx) => {
                                                    return <div key={idx} className='itemitem' onClick={()=>selectCate(item.ids[0],i.id)}><span>{i.name}</span><span>{i.count}</span></div>
                                                })
                                            }
                                        </Sidebar.Item>
                                    )
                                })
                            }
                        </Sidebar>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item name='value2' title={'排序'} key={22} >
                        <Cell title='起送价最低' icon={<GoldCoinO color='#e6b61a' />} onClick={()=>changeShopList(1)}><div>{sortType===1&&<Success/>}</div></Cell>
                        <Cell title='配送速度' icon={<ClockO color='#38c7b6' />} onClick={()=>changeShopList(2)}><div>{sortType===2&&<Success/>}</div></Cell>
                        <Cell title='评分' icon={<StarO color='#e6b61a' />} onClick={()=>changeShopList(3)}><div>{sortType===3&&<Success/>}</div></Cell>
                        <Cell title='智能排序' icon={<GoldCoinO color='#3190e8' />} onClick={()=>changeShopList(4)}><div>{sortType===4&&<Success/>}</div></Cell>
                        <Cell title='距离最近' icon={<Exchange rotate={90} color='#5fb4de' />} onClick={()=>changeShopList(5)}><div>{sortType===5&&<Success/>}</div></Cell>
                        <Cell title='销量最高' icon={<FireO color='red' />} onClick={()=>changeShopList(6)}><div>{sortType===6&&<Success/>}</div></Cell>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item name='value2' title={'筛选'} key={33} onOpen={openSx}>
                        <div className='shaixuan'>
                            <div className='peisongtype'>配送方式</div>
                            <div className='peisongtext'><BrowsingHistoryO  />{songType}</div>
                            <div className='peisongtype'>商家属性（可以多选）</div>
                            <div className='sjsx'>
                                {
                                    shopSx.length!==0 && shopSx.map((item,index)=>{
                                        return (
                                            <div key={index}>
                                                <div className='peisongtext'><span className='paizi' style={{borderColor:`#${item.icon_color}`,color:`#${item.icon_color}`}}>{item.icon_name}</span>{item.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='sxbtn'>
                                <Button type='default'>清空</Button>
                                <Button type='info'>确定</Button>
                            </div>
                        </div>
                    </DropdownMenu.Item>
                </DropdownMenu>
            </div>
            <div className='catemid'>
                {
                    cateList.length !== 0 && (cateList.map((item, index) => {
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
                                        <div className="right_mid"><span className="fnzs">蜂鸟专送</span><span className="zsd">准时达</span></div>
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
