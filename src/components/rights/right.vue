<template>
  <el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-table height="400px" :data="rightlist" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="160">
      </el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180">
      </el-table-column>
      <el-table-column prop="path" label="路径">
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  created () {
    this.getRightList()
  },
  data () {
    return {
      rightlist: []
    }
  },
  methods: {
    async getRightList () {
      const result = await this.$http.get('rights/list')
      this.rightlist = result.data.data
      console.log(result)
    }
  }
}
</script>

<style>

</style>
