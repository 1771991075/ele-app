import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getShopInfo } from '../../api/home';
import './index.less';

export default function ShopInfo() {
    let [search] = useSearchParams()
    let [shopInfo, setShopInfo] = useState(null)
    //获取商家详情
    let getShopInfo1 = async (id) => {
        let res = await getShopInfo(id)
        console.log(res);
        setShopInfo(res.data)
    }

    useEffect(() => {
        let id = search.get('id')
        getShopInfo1(id)
    }, [])

    return (
        <div className='shopinfo'>
            {
                shopInfo && (
                    <div className='shopinfo_top'>
                        <div className='shopinfo_top1' style={{ backgroundImage: `url(https://elm.cangdu.org/img/${shopInfo.image_path})` }}></div>
                        <div className='shopinfo_top2'>
                            <div>
                                <img src={`https://elm.cangdu.org/img/${shopInfo.image_path}`} alt="" className='shoptx' />
                            </div>
                            <div className='shopinfo_info'>
                                <h3>{shopInfo.name}</h3>
                                <p>商家配送/分钟送达{shopInfo.piecewise_agent_fee.tips}</p>
                                <p>{shopInfo.promotion_info}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
