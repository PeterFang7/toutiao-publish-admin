// 导入axios模块
import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建一个axios实例
const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn' // 请求基础地址
  baseURL: 'http://api-toutiao-web.itheima.net', // 请求基础地址
  // 对后端返回的原始数据进行处理
  transformResponse: [function (data) {
    // 将后端返回的原始数据转换成JSONbig格式并返回
    try {
      // 如果后端返回的数据是Json数据则经过这里返回
      return JSONbig.parse(data)
    } catch (error) {
      // 如果后端返回的数据不是Json数据则经过这里返回
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求成功会经过这里
  // 设置统一token数据
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 经过这里数据请求数据才会真的发送出去
  return config
}, function (error) {
  // 请求失败会经过这里
  return Promise.reject(error)
})

export default request
