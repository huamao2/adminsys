// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import myBread from '@/components/custom/myBread.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HttpAxios from '@/plugins/http.js'
import moment from 'moment'

Vue.use(HttpAxios)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.component(myBread.name, myBread)

Vue.filter('dateformat', function (val) {
  return moment(val).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
Vue.component(myBread.name, myBread)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
