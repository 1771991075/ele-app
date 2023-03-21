import sendHttp from '../utils/http'
//获取验证码
let getCaptchas = () =>sendHttp(`/v1/captchas`,'post')


export {
    getCaptchas
}