import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tabbar } from 'react-vant';
import { HomeO, GuideO, OrdersO, UserO } from '@react-vant/icons';
import './index.less'

export default function Index() {
    let navigate = useNavigate()

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
            <Tabbar onChange={(active) => goPage(active)}>
                <Tabbar.Item icon={<HomeO />}>外卖</Tabbar.Item>
                <Tabbar.Item icon={<GuideO />}>搜索</Tabbar.Item>
                <Tabbar.Item icon={<OrdersO />}>订单</Tabbar.Item>
                <Tabbar.Item icon={<UserO />}>我的</Tabbar.Item>
            </Tabbar>
            <Outlet />
        </div>
    )
}
