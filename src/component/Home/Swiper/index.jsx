import React, { useEffect, useState } from 'react'
import { Swiper } from 'react-vant';
import './index.less'

export default function HomeSwiper(props) {

    let [list, setList] = useState([])

    useEffect(() => {
        let sum = props.homeCateList.length
        let num = Math.ceil(sum/8)
        let arr = []
        for(let i = 0; i<num ; i++){
            arr[i] = props.homeCateList.splice(0,8)
        }
        setList(arr)
        console.log(list);
    },[props.homeCateList])

    return (
        <div className='home_swiper1'>
            {
                list.length !== 0 && (
                    <Swiper autoplay={10000}>
                        {
                            list.map((item, index) => {
                                return (<Swiper.Item key={index} className='item'>
                                    {
                                        item.map((i,idx)=>{
                                            return <div key={idx} className='swiperitem'>
                                                <img src={`https://fuss10.elemecdn.com/${i.image_url}`} className='itemimg' alt="" />
                                                <p>{i.title}</p>
                                            </div>
                                        })
                                    }
                                </Swiper.Item>
                                )
                            })
                        }
                    </Swiper>
                )
            }
        </div>
    )
}
