import axios from 'axios';


const hslApi = axios.create({
  baseURL: 'https://www.hsl.wiki/admin/'
})
// https://www.hsl.wiki/admin/

// 添加请求拦截器
axios.interceptors.request.use(function (config) {


  return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  
  
  return response;
});


export default hslApi