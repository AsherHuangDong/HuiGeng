<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-button type="primary" @click="strategyAdd">新增模拟账户</el-button><br><br>
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
              prop="id"
              label="模拟账户ID"
              align="center"
            />
            <el-table-column
              prop="strategyName"
              label="策略"
              align="center"
            />
            <el-table-column
              prop="profit"
              label="总收益率"
              align="center"
            />
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
              prop="address"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="strategyEdit(scope.row)">修改</el-button>&nbsp;&nbsp;
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
import { SimuaccList } from '../../service/bg'
export default {
  data() {
    return {
      tableData: [],
      getAllStrategyParams: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.SimuaccList()
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.SimuaccList()
    },
    SimuaccList() {
      // const url = '/api/bg/strategy/all/?current=' + this.getAllStrategyParams.current +
      //         '&size=' + this.getAllStrategyParams.size
      SimuaccList(this)
    },
    strategyEdit(row) {
      console.log('changeQuota')
      const self = this
      this.$router.push({ name: '/configurationClass/simulationAccountEdit', params: { row: row, self: self }})
    },
    strategyAdd() {
      console.log('changeRate')
      this.$router.push({ name: '/configurationClass/simulationAccountAdd' })
    }
  }
}
</script>

<style scoped>

</style>
