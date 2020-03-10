import axios from 'axios'
import ElementUI from 'element-ui';

// import qs from 'qs'

axios.defaults.baseURL = '/'; // 自己访问自己的8090端口，由vue.config做重定向到后台
// axios.defaults.baseURL = 'http://localhost:8020'; // 自己访问自己的8090端口，由vue.config做重定向到后台
// axios.defaults.baseURL = 'http://admin.huigen.talkingcake.cn'; // 自己访问自己的8090端口，由vue.config做重定向到后台
// axios.defaults.baseURL = 'http://app-bg.justfollow.vip'; // 自己访问自己的8090端口，由vue.config做重定向到后台
axios.interceptors.request.use(config => {
  // 如果有token 那么我们要带上token请求
  if (localStorage.token) {
    config.headers.token = localStorage.getItem('token')
    config.headers.permValue = localStorage.getItem('permValue')
  }
  // if (config.method !== 'get') {
  //   config.data = qs.stringify(config.data)
  // }
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => Promise.reject(error))

// 响应拦截器
// axios.interceptors.response.use(
//   response => {
//     return response.data // 只保留后台返回的数据，其他数据不要
//   }
// )

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    if (response.data.code == 600) {
      ElementUI.Message({
        message: '签名过期，请重新登录',
        type: 'error'
    });
    setTimeout(() => {
      window.location.href = 'http://app-bg.justfollow.vip/#/login'
    }, 2000)
    }
    return response.data
  }
);

// 简化请求写法
export const $post = async(path, data) => await axios.post(path, data)
export const $get = async(path, params = {}) => await axios.get(path, { params })
export const $put = async(path, data) => await axios.put(path, data)
export const $delete = async(path, params = {}) => await axios.delete(path, { params })
