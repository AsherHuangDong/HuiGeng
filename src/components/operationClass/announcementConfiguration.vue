<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-button type="primary" @click="strategyAdd">新增</el-button><br><br>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              align="center"
            />
            <el-table-column
              prop="vstatus"
              label="状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.vstatus"
                  @change="changeStatus(scope.row, scope.row.status)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.createTime?$moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss"):'' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button v-show="scope.row.status==2" type="text" size="small" @click="changeStatus(scope.row, 1)">上架</el-button>
                <el-button v-show="scope.row.status==1" type="text" size="small" @click="changeStatus(scope.row, 2)">下架</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="strategyEdit(scope.row)">修改</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="strategyDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <!-- <el-row :gutter="12">
            <el-col :span="14" :offset="10">
              <el-pagination
                background
                :current-page="getAllStrategyParams.current"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
              /></el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script>
import { allAnnouncement } from '../../service/bg'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.allAnnouncement()
    console.log('this.tableData', this.tableData)
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.allAnnouncement()
    },
    allAnnouncement() {
      allAnnouncement(this)
    },
    strategyEdit(row) {
      const self = this
      this.$router.push({ name: '/operationClass/announcementConfigurationEdit', params: { row: row, self: self }})
    },
    strategyAdd() {
      this.$router.push({ name: '/operationClass/announcementConfigurationAdd' })
    },
    changeStatus(row, status) {
      const self = this
      this.$router.push({ name: '/operationClass/announcementConfigurationStop', params: { row: row, self: self, status: status }})
    },
    strategyDelete(row) {
      const self = this
      this.$router.push({ name: '/operationClass/announcementConfigurationDelete', params: { row: row, self: self }})
    }
  }
}
</script>

<style scoped>

</style>