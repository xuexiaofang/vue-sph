import axios from 'axios'
import nProgress from 'nprogress'
import { Promise } from 'core-js'
import 'nprogress/nprogress.css'
import store from '@/store'

//对axios进行二次封装
//利用axios对象的方法create，去创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径中会出现api字样，
    baseURL: "/api",
    timeout:5000
})
//请求拦截器，在发请求前，请求拦截器会检测到，可以在发送请求前做一些事情
requests.interceptors.request.use(
  (config) => {
    
    if (store.state.detail.uuid) {
      config.headers.userTempId = store.state.detail.uuid;
    }
    if (store.state.user.token) {
      config.headers.token = store.state.user.token;
    }
    nProgress.start();
    //config：配置对象，对象里的一个属性很重要，header请求头
    return config;
  },(error)=>{
    console.log(error);
    return Promise.reject(error);
  }
);
 //响应拦截器
requests.interceptors.response.use((res) => {
  // console.log(res);
    nProgress.done()
  //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (err) => {           
    return Promise.reject(err)  
})

export default requests