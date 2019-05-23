<template>
  <!-- 卡片小容器 -->
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="query-row">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="user-input" clearable @clear="getUserList()">
          <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisibleAdd = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户表格 -->
    <el-table :data="userlist" stripe style="width: 100%" height="450px">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column label="创建时间">
        <!-- scope接收子组件向上传递的对象,通过.row.属性调用 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | dateformat }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <!-- 用户接收对象的标签可以是其它标签,但必须是根标签接收 -->
        <el-switch slot-scope="scope" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="dialogFormVisibleEdit = true"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleteMsgBox(scope.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      class="pagination">
    </el-pagination>
    <!-- 对话框 -->
    <!-- 1.添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleUserAdd()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 2.编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleUserEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      userlist: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      form: {}
    }
  },
  methods: {
    handleUserEdit () {
      this.dialogFormVisibleEdit = false
    },
    showDeleteMsgBox (userId) {
      this.$confirm('确定删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const result = await this.$http.delete(`users/${userId}`)
        if (result.data.meta.status === 200) {
          this.pagenum = 1
          this.getUserList()
          this.$message({
            type: 'success',
            message: result.data.meta.msg
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleUserAdd () {
      //  username 用户名称 不能为空
      // password 用户密码 不能为空
      // email 邮箱 可以为空
      // mobile 手机号 可以为空
      this.dialogFormVisibleAdd = false
      const result = await this.$http.post('users', this.form)
      const {data, meta: {msg, status}} = result.data
      if (status === 201) {
        console.log(data)
        this.$message.success(msg)
        this.getUserList()
        this.form = {}
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取用户列表
    async getUserList () {
      // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      const AUTH_TOKEN = localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      // query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      console.log(res)
      const {
        data: {
          total,
          users
        },
        meta: {
          msg,
          status
        }
      } = res.data
      console.log(total, users, status, msg)
      if (status === 200) {
        this.userlist = users
        this.total = total
        // this.$message.success(msg)
      } else {
        // this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }

  .user-input {
    width: 300px;
  }

  .query-row {
    margin-top: 20px;
  }

  .pagination {
    margin-top: 20px;
  }
</style>
