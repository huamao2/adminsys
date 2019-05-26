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
          <el-submenu :index="''+item1.order" v-for="(item1, index1) in menus" :key="index1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2, index2) in item1.children" :key="index2">
              <span>{{item2.authName}}</span>
              <i class="el-icon-circle-check"></i>
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
  created () {
    this.getMenus()
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    async getMenus () {
      const result = await this.$http.get('menus')
      this.menus = result.data.data
    },
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
