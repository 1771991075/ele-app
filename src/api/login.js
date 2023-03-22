import sendHttp from '../utils/http'
//获取验证码
let getCaptchas = () =>sendHttp(`/v1/captchas`,'post')
//用户登录
let userLogin = (data) =>sendHttp(`/v2/login`,'post',data)


export {
    getCaptchas,
    userLogin
}