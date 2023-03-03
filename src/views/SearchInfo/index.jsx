import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from 'react-vant';
import './index.less'

export default function SearchInfo() {
  let navigate = useNavigate()

  return (
    <div className='searchInfo'>
      <NavBar
        className='searchInfo_nav'
        title="搜索"
        onClickLeft={() => navigate(-1)}
      />
      <div className='searchInfobtn'>
        <Button type='info'>拍照</Button>
        <Button type='info'>相册</Button>
        <Button type='info'>预览图片</Button>
        <Button type='info'>系统分享</Button>
      </div>
    </div>
  )
}
