<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-button type="primary" @click="strategyAdd">新增</el-button><br><br>
          <el-table
            :data="strategyList"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="150"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="userId"
              label="用户ID"
              width="150"
              align="center"
            />
            <el-table-column
              prop="userName"
              label="用户名"
              width="320"
              align="center"
            />
            <el-table-column
              prop="userPhone"
              label="手机号"
              width="150"
              align="center"
            />
            <el-table-column
              prop="toPrice"
              label="转入金额"
              width="150"
              align="center"
            ><template slot-scope="scope">
              <span>{{ scope.row.toPrice }} USDT</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="rewardNum"
              label="奖励数量"
              width="150"
              align="center"
            ><template slot-scope="scope">
              <span>{{ scope.row.rewardNum }} {{ scope.row.coinSymbol }}</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="充值时间"
              width="180"
              align="center"
            ><template slot-scope="scope">
              <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template></el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="strategyEdit(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <el-row :gutter="12">
            <el-col :span="14" :offset="10">
              <el-pagination
                background
                :current-page="currentPage4"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
              /></el-col>
          </el-row></el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script>
import { getRechargeRecord } from '../../service/bg'
export default {
  name: 'Strategy',
  data() {
    return {
      strategyList: [],
      getAllStrategyParams: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.getRechargeRecord()
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.getRechargeRecord()
    },
    getRechargeRecord() {
      // const url = '/api/bg/strategy/all/?current=' + this.getAllStrategyParams.current +
      //         '&size=' + this.getAllStrategyParams.size
      getRechargeRecord(this)
    },
    strategyEdit(row) {
      console.log('changeQuota')
      const self = this
      this.$router.push({ name: '/operationClass/specifyUserRechargeEdit', params: { row: row, self: self }})
    },
    strategyAdd() {
      this.$router.push({ name: '/operationClass/specifyUserRechargeAdd' })
    }
  }
}
</script>

<style scoped>

</style>
