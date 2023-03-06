import React, { useState } from 'react'
import './index.less'
import { NavBar, Form ,Button,Input,NoticeBar} from 'react-vant';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate()
    let [username, setUsername] = useState('')
    let [password, setPossword] = useState('')
    const [form] = Form.useForm()

    const onFinish = values => {
        console.log(values)
    }
    return (
        <div className='login'>
            <NavBar
                title="密码登录"
                onClickLeft={() => navigate(-1)}
            />
            <div className='loginuser'>
                <Form
                    form={form}
                    onFinish={onFinish}
                    footer={
                        <div style={{ margin: '5px 0px 0' }}>
                            <NoticeBar>
                                <p>温馨提示:未注册过的账号，登录时将自动注册</p>
                                <p>注册过的用户可凭账号密码登录</p>
                            </NoticeBar>
                            <Button round nativeType='submit' type='primary' block>
                                提交
                            </Button>
                        </div>
                    }
                >
                    <Form.Item
                        rules={[{ required: true, message: '请填写用户名' }]}
                        name='username'
                        label='账号'
                    >
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写密码' }]}
                        name='password'
                        label='密码'
                    >
                        <Input placeholder='请输入密码' />
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
