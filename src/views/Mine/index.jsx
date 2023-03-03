import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar} from 'react-vant';
import { PhoneO ,Arrow} from '@react-vant/icons';
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
          <PhoneO  />
        </div>
        <div className='mineright'>
          <Arrow fontSize={20}/>
        </div>
      </div>
    </div>
  )
}
