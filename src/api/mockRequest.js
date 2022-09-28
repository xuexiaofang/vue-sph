import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
//对axios进行二次封装
//利用axios对象的方法create，去创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径中会出现api字样，
    baseURL: "/mock",
    timeout:5000
})
//请求拦截器，在发请求前，请求拦截器会检测到，可以在发送请求前做一些事情
requests.interceptors.request.use((config) => {
    nProgress.start()
    //config：配置对象，对象里的一个属性很重要，header请求头
    return config
})
 //响应拦截器
requests.interceptors.response.use((res) => {
    nProgress.done()
    //成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (error) => {
    console.log(error);
    return Promise.reject(new Error('从mock回来的响应拦截器'))
 
    
})

export default requests