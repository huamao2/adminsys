// 自定义axios插件,方便入口文件导入
import axios from 'axios'

// 官方写法,要求先定义一个对象,然后全局对象属性赋值
const HttpAxios = {}
HttpAxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

export default HttpAxios
