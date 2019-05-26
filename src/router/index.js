import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/user.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import '@/assets/css/reset.css'

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    // 一级组件path注意要以/开头
    path: '/login',
    // 显示一级组件,即app.vue的router-view视图
    component: Login
  },
  {
    name: 'home',
    path: '/',
    component: Home,
    // 显示二级组件,即home组件里的router-view视图
    children: [{
      name: 'users',
      path: 'users',
      component: Users
    },
    {
      name: 'rights',
      path: 'rights',
      component: Right
    },
    {
      name: 'roles',
      path: 'roles',
      component: Role
    }]
  }
  ]
})

// router为创建的实例,next()为必须的,否则不能跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'login'})
      return
    }
    next()
  }
})

export default router
