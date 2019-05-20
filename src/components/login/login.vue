<template>
  <div class="login-wrap">
    <el-form class="login-form" :label-position="labelPosition" label-width="80px">
      <h2>用户登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="dataFormat.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="dataFormat.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" @click="handleLogin()" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      dataFormat: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login', this.dataFormat)
        .then((result) => {
          // 解构赋值
          const {
            data,
            meta: {
              msg,
              status
            }
          } = result.data
          if (status === 200) {
            this.$message.success(msg)
            console.log(data, msg)
          } else {
            this.$message.error(msg)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
  .login-wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
  }

  .login-wrap .login-btn {
    width: 100%;
  }
</style>
