// 导入axios模块
import axios from 'axios'

// 创建一个axios实例
const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn' // 请求基础地址
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求基础地址
})

export default request
