<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="button">
      <el-col>
        <el-button type="success">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 角色表格 -->
    <el-table height="450px" :data="rolelist" stripe style="width: 100%">
      <!-- 表格扩展 -->
      <el-table-column type="expand" width="60">
        <template slot-scope="scope">
          <el-row v-for="(item1, i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag @close="deleteRight(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, j) in item1.children" :key="j">
                <el-col :span="4">
                  <el-tag @close="deleteRight(scope.row, item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="16">
                  <el-tag @close="deleteRight(scope.row, item3.id)" v-for="(item3, k) in item2.children" :key="k"
                    type="warning" closable>
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="150">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="200">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200">
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="scope">
          <!-- 修改和删除和user功能重复,不写了 -->
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEditDialogForm(scope.row)">
          </el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle
            @click="showDeleteMsgBox(scope.row.id)"></el-button>
          <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetRightsDia(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRights">
      <!-- data:数据源.
           node-key 每个节点的唯一标识,通常是data数据源的key名
           default-expanded-keys : 默认展开的节点id
           default-checked-keys : 已选择的节点id
           props 配置项 {label, children}: label节点的文字标题和children节点的子节点的值都来源于data绑定数据源中该数据的key名label和children
       -->
      <el-tree ref="tree" :data="treelist" show-checkbox node-key="id" :default-expanded-keys="[]"
        :default-checked-keys="arrcheck" :props="defaultProps" default-expand-all>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRoleRights()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      rolelist: [],
      treelist: [],
      arrcheck: [],
      dialogFormVisibleRights: false,
      currentRole: -1,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    async handleSetRoleRights () {
      // api: roles/:roleId/rights
      // 该api的调用,roleId通过打开对话框时的User获取(即打开对放框的方法),rights是选中+半选中的节点数组,以,号分隔的字符串
      // el-tree的方法: getCheckedKeys返回选中节点的key组成的数组, getHalfCheckedKeys返回半选中节点的key组成数组
      // 通过ref获取组件的方法
      let arr1 = this.$refs.tree.getCheckedKeys()
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      let arr = [...arr1, ...arr2]
      await this.$http.post(`roles/${this.currentRole.id}/rights`, {rids: arr.join(',')})
      this.getRoleList()
      this.dialogFormVisibleRights = false
    },
    async showSetRightsDia (role) {
      this.currentRole = role
      this.dialogFormVisibleRights = true
      const result = await this.$http.get('rights/tree')
      // console.log(result.data.data)
      // console.log(role)
      this.treelist = result.data.data

      const temparrcheck = []
      // 当某一级有权限时,其图形界面根结点会选中
      // 当根结点在arrcheck里时,其下面的所有结点会选中
      role.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            temparrcheck.push(item3.id)
          })
        })
      })
      this.arrcheck = temparrcheck
    },
    async getRoleList () {
      const result = await this.$http.get('roles')
      this.rolelist = result.data.data
    },
    async deleteRight (role, rightId) {
      const result = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      // 返回的是剩余的角色权限,将其赋予角色,其页面动态刷新
      role.children = result.data.data
    }
  }
}
</script>

<style>
  .button {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
