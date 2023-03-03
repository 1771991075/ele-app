import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Cell, Grid } from 'react-vant';
import { getNowCity, getHotCity, getAllCity } from '../../api/index'
import './index.less'

export default function Index() {

    //定位当前城市
    let [nowCity, setNowCity] = useState({})
    //热门城市
    let [hotCity, setHotCity] = useState([])
    //所有城市
    let [allCity, setAllCity] = useState({})

    let navigate = useNavigate()
    let goCityInfo = (id) =>{
        navigate(`/city?id=${id}`)
    }

    useEffect(() => {
        getNowCity().then(res => {
            console.log(res)
            setNowCity(res.data)
        })
        getHotCity().then(res => {
            console.log(res);
            setHotCity(res.data)
        })
        getAllCity().then(res => {
            console.log(res);
            setAllCity(res.data)
        })
    }, [])

    return (
        <div className='index'>
            <div className='index_nav'>
                <div><p>ele.me</p></div>
                <div>
                    <span>登录</span>|<span>注册</span>
                </div>
            </div>
            <div className='index_header'>
                <Cell title='当前定位城市:' />
                <Cell title={nowCity.name} isLink onClick={()=>goCityInfo(nowCity.id)}/>
            </div>
            <div className='index_hotCity'>
                <Cell title='热门城市' />
                <div>
                    <Grid border={true} columnNum={4}>
                        {
                            hotCity.map((item, index) => {
                                return (
                                    <Grid.Item key={index} onClick={()=>goCityInfo(item.id)}>
                                        {item.name}
                                    </Grid.Item>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>
            <div className='index_allcity'>
                <Cell title='所有城市' />
                <div>
                    {
                        Object.keys(allCity).map((item, index) => {
                            return (
                                <div key={index}>
                                    <Cell title={item} className='szmcity'/>
                                    <Grid border={true} columnNum={4}>
                                        {
                                            allCity[item].map((i, idx) => {
                                                return (
                                                    <Grid.Item key={idx} onClick={()=>goCityInfo(i.id)}>
                                                        {i.name}
                                                    </Grid.Item>
                                                )
                                            })
                                        }
                                    </Grid>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
