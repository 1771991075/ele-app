import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Cell } from 'react-vant';
import { PhoneO, Arrow, BalanceListO, GoodsCollectO, FireO, PhoneCircleO, LocationO, UserO } from '@react-vant/icons';
import './index.less'

export default function Mine() {
  let navigate = useNavigate()
  return (
    <div className='mine'>
      <NavBar
        className='mine_nav'
        title="我的"
        onClickLeft={() => navigate(-1)}
      />
      <div className='mineInfo'>
        <div className='mineimg'>
          <img src="" alt="" />
        </div>
        <div>
          <span>登录</span>|<span>注册</span>
          <PhoneO />
        </div>
        <div className='mineright'>
          <Arrow fontSize={20} />
        </div>
      </div>
      <div>
        <Cell title='我的订单' icon={<BalanceListO />} isLink></Cell>
        <Cell title='积分商城' icon={<GoodsCollectO />} isLink></Cell>
        <Cell title='饿了么会员卡' icon={<FireO />} isLink></Cell>
        <Cell title='服务中心' icon={<PhoneCircleO />} isLink></Cell>
        <Cell title='下载饿了么app' icon={<LocationO />} isLink></Cell>
        <Cell title='联系客服' icon={<UserO />} isLink></Cell>
      </div>
    </div>
  )
}
