import axios from 'axios';
import router from './router/index'

const hslApi = axios.create({
  baseURL: 'http://localhost:3389/admin/'
})
// https://www.hsl.wiki/admin/

// 添加请求拦截器
hslApi.interceptors.request.use(function (config) {

  //设置统一请求header
  if (localStorage.hslToken){
    config.headers['Authorization'] = localStorage.hslToken
  }  

  return config;
});

// 添加响应拦截器
hslApi.interceptors.response.use(function (response) {
  return response;
}, error => {

  const { status } = error.response
    if (status == 401) {
      alert('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('hslToken')

      // 页面跳转
      router.push('/login')
    }
});


export default hslApi