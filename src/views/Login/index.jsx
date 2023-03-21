import React, { useEffect, useState } from 'react'
import './index.less'
import { NavBar, Button, Input, Cell } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import {getCaptchas} from '../../api/login';

export default function Login() {
    let navigate = useNavigate()
    let [username, setUsername] = useState('')
    let [password, setPossword] = useState('')
    let [captcha, setCaptcha] = useState('')
    let [captchasUrl,setCaptchasUrl] = useState('')
    //更换验证码


    useEffect(()=>{
        getCaptchas().then(res=>{
            console.log(res);
            setCaptchasUrl(res.data.code)
        })
    },[])

    return (
        <div className='login'>
            <NavBar
                title="密码登录"
                onClickLeft={() => navigate(-1)}
            />
            <div className='loginuser'>
                <Cell>
                    <Input
                        value={username}
                        onChange={(value) => { setUsername(value) }}
                        placeholder='账号'
                    />
                </Cell>
                <Cell>
                    <Input
                        value={password}
                        type='password'
                        onChange={(value) => { setPossword(value) }}
                        placeholder='密码'
                    />
                </Cell>
                <Cell className='yzm'>
                    <Input
                        className='yzmipt'
                        value={captcha}
                        onChange={(value) => { setCaptcha(value) }}
                        placeholder='验证码'
                    />
                    <div className='yzmimg'>
                        <img src={captchasUrl} alt="" className='yzmimgg'/>
                        <div>
                            <p>看不清</p>
                            <p className='hzy' onClick={()=>{}}>换一张</p>
                        </div>
                    </div>
                </Cell>
                <p className='wxts'>温馨提示:未注册过的账号，登录时将自动注册</p>
                <p className='wxts'>注册过的用户可凭账号密码登录</p>
                <Button className='loginbtn'>登录</Button>
            </div>
        </div>
    )
}
