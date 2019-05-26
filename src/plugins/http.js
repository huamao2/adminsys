// 自定义axios插件,方便入口文件导入
import axios from 'axios'

// 官方写法,要求先定义一个对象,然后全局对象属性赋值
const HttpAxios = {}
HttpAxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 拦截器,在请求或响应被 then 或 catch 处理前拦截它们。
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求添加token头部信息,这里的url是基于baseURL的
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }

    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })
  // Vue实例添加http属性,以后就可以通过this.$http调用axios模块
  Vue.prototype.$http = axios
}

export default HttpAxios
