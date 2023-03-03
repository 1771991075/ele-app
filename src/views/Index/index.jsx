import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tabbar } from 'react-vant';
import { HomeO, GuideO, OrdersO, UserO } from '@react-vant/icons';

export default function Index() {
    let [active, setActive] = useState(0)
    let navigate = useNavigate()
    let location = useLocation()
    let path = location.pathname;

    useEffect(() => {
        switch (path) {
            case '/index/home':
                setActive(0)
                break
            case '/index/search':
                setActive(1)
                break
            case '/index/order':
                setActive(2)
                break
            case '/index/mine':
                setActive(3)
                break
            default:
                setActive(0)
                break
        }
    }, [path])

    let goPage = (active) => {
        switch (active) {
            case 0:
                navigate('home');
                break;
            case 1:
                navigate('search');
                break;
            case 2:
                navigate('order');
                break;
            default:
                navigate('mine');
        }
    }
    return (
        <div className='index1'>
            <Tabbar onChange={(active) => goPage(active)} value={active}>
                <Tabbar.Item icon={<HomeO />}>外卖</Tabbar.Item>
                <Tabbar.Item icon={<GuideO />}>搜索</Tabbar.Item>
                <Tabbar.Item icon={<OrdersO />}>订单</Tabbar.Item>
                <Tabbar.Item icon={<UserO />}>我的</Tabbar.Item>
            </Tabbar>
            <Outlet />
        </div>
    )
}
