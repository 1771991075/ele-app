import axios from 'axios';
axios.defaults.baseURL = "https://elm.cangdu.org";
axios.defaults.timeout = 6000;

let sendHttp = (url,method,data=null,header=null)=>{
    return axios({
        url,
        method,
        params:method==='get'? data : null,
        data:method==='post'? data : null,
        headers:header
    })
} 

export default sendHttp;