import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCityInfo, getCityMsg } from '../../api/index'
import { Cell, Search, Toast, NavBar, Button } from 'react-vant';
import './index.less'

export default function City() {
    //获取传递过来的城市id
    let [search] = useSearchParams()
    let id = search.get('id')

    let [cityInfo, setCityInfo] = useState({})
    let [keyword, setKeyword] = useState('')
    let [cityInfoList, setCityInfoList] = useState([])
    let [historyList,setHistoryList] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        getCityInfo(id).then(res => {
            console.log(res)
            setCityInfo(res.data)
        })
        if(!localStorage.getItem('historyList')){
            localStorage.setItem('historyList',JSON.stringify([]))
        }else{
            setHistoryList(JSON.parse(localStorage.getItem('historyList')))
        }
    }, [id])

    let searchMsg = (id, keyword) => {
        if (keyword === '') {
            Toast.info('搜索内容不能为空')
        } else {
            getCityMsg(id, keyword).then(res => {
                console.log(res.data)
                setCityInfoList(res.data)
            })
        }
    }
    //跳转到具体地点
    let goInfo = (geohash)=>{
        //存储到本地历史搜索记录
        let idx = cityInfoList.findIndex(item=>{
            return item.geohash === geohash
        })
        if(idx!==-1){
            let oldSearch = JSON.parse(localStorage.getItem('historyList'))
            oldSearch.push(cityInfoList[idx])
            localStorage.setItem('historyList', JSON.stringify(oldSearch))
            navigate(`/index/home?geohash=${geohash}`)
        }
        navigate(`/index/home?geohash=${geohash}`)
    }

    //删除关键字清空列表
    let changeKeyword = (keyword) =>{
        setKeyword(keyword)
        if(!keyword){
            setCityInfoList([])
        }
    }

    return (
        <div className='city'>
            <div className='city_nav'>
                <NavBar
                    title={cityInfo.name}
                    rightText="切换城市"
                    onClickLeft={() => navigate(-1)}
                    onClickRight={() => navigate(-1)}
                />
            </div>
            <div>
                <Search value={keyword} onChange={(value)=>changeKeyword(value)} placeholder="输入学校、商务楼、地址" />
                <div className='btn1'>
                    <Button className='submitbtn' type='primary' size='small' onClick={() => searchMsg(id, keyword)}>提交</Button>
                </div>
                {
                    cityInfoList.length !== 0 && <div>
                        {
                            cityInfoList.map((item, index) => {
                                return <Cell key={index} center title={item.name} label={item.address} onClick={()=>goInfo(item.geohash)} />
                            })
                        }
                    </div>
                }
            </div>
            {
                cityInfoList.length === 0 && <div className='searchhistory'>
                    <p>搜索历史:</p>
                    {
                        historyList.map((item, index) => {
                            return <Cell key={index} center title={item.name} label={item.address} onClick={()=>goInfo(item.geohash)}/>
                        })
                    }
                    <Button className='clearbtn' type='default' onClick={()=>{
                        localStorage.setItem('historyList',JSON.stringify([]))
                    }}>清除全部</Button>
                </div>
            }
        </div>
    )
}
