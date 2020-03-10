<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-row>
            <el-button type="primary" @click="add">新增人员</el-button>
          </el-row><br>
          <el-table
            :data="tableData"
            :loading="loading.tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="180"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="昵称(系统名)"
              width="180"
            />
            <el-table-column
              prop="address"
              label="角色"
            />
            <el-table-column
              prop="address"
              label="说明"
            />
            <el-table-column
              prop="address"
              label="状态"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.value"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="创建时间"
            />
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="freeze(scope.row)">冻结</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="freeze(scope.row)">解冻</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="d(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PermissionsStaff',
  data() {
    return {
      loading: {
        tableData: false
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value: false
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        value: true
      }]
    }
  },
  mounted() {
    this.listAdmin()
  },
  methods: {
    listAdmin() {
      this.loading.tableData = true
      this.$post('/api/admin/listAdmin')
        .then(res => {
          console.log('/api/admin/listAdmin', res)
        }).finally(() => {
          this.loading.tableData = false
        })
    },
    add() {
      this.$router.push({ name: '/configurationClass/permissionsStaffAdd' })
    },
    edit(row) {
      this.$router.push({ name: '/configurationClass/permissionsStaffEdit', params: { row: row }})
    },
    freeze(row) {
      this.$router.push({ name: '/configurationClass/permissionsStaffDisable', params: { row: row }})
    },
    d(row) {
      this.$router.push({ name: '/configurationClass/permissionsStaffDelete', params: { row: row }})
    }
  }
}
</script>

<style scoped>

</style>
