<template>
  <div>
    <el-row>
      <el-button type="primary" @click="add">新增角色</el-button>
    </el-row>
    <br>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="序号"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="角色名称"
          prop="name"
          width="180"
        />
        <el-table-column
          prop="address"
          label="说明"
        />
        <el-table-column
          prop="address"
          label="创建时间"
        />
        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PermissionsRole',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.listRole()
  },
  methods: {
    listRole() {
      this.$post('/api/role/listRole')
        .then(res => {
          console.log('/api/role/listRole', res)
          this.tableData = res.data
        })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({ name: '/configurationClass/permissionsRoleEdit', params: { row: row }})
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$router.push({ name: '/configurationClass/permissionsRoleDelete', params: { row: row }})
    },
    add() {
      this.$router.push('/configurationClass/permissionsRoleAdd')
    }
  }
}
</script>

<style scoped>

</style>
