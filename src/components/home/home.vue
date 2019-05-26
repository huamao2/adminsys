<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <img class="img" src="../../assets/images/logo.png" alt="无法显示图片">
        </el-col>
        <el-col :span="18" class="middle">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a class="loginout" @click.prevent="handleLoginOut()" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- unique-opened同时只保持一个菜单(取决于菜单的index值)的打开 router开启路由模式,index相当于router-link的to值-->
        <el-menu :unique-opened="true" :router="true">
          <!-- 1.用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <span>用户列表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
          <!-- 2.权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <span>角色列表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
            <el-menu-item index="right">
              <span>权限列表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
          <!-- 3.商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-cherry"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <span>商品列表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
            <el-menu-item index="3-2">
              <span>分类参数</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
            <el-menu-item index="3-3">
              <span>商品分类</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
          <!-- 4.订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <span>订单列表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
          <!-- 5.数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <span>数据报表</span>
              <i class="el-icon-arrow-right"></i>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    handleLoginOut () {
      localStorage.clear()
      this.$message.success('退出登录')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
  }

  .header .middle {
    line-height: 20px;
    text-align: center;
  }

  .header .loginout {
    line-height: 60px;
    text-decoration: none;
  }

  .aside {
    background-color: #d3dce6;
  }

  .main {
    background-color: #e9eef3;
    height: 100%;
  }
</style>
