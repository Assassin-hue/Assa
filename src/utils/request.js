import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 99999 // 请求超时
})


// let isRefresh = false;
request.interceptors.request.use(config => {
    console.log(config);
    if (config.url.indexOf("/user/login") != -1) {
        config.headers['Content-Type'] = 'multipart/form-data'
    } else {
        config.headers['x-token'] = sessionStorage.getItem('token')
    }
    return config;
})
request.interceptors.response.use(
    response => {
        if (response.status === 200) {
            //等于600说明token过期或者token认证失败，需要从新登陆
            if (response.data.code == 600) {
                sessionStorage.clear();
                window.location.href = "/login";
                return response;
            } else {
                return response;
            }
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error)
    }
)

export default request // 导出自定义创建 axios 对象