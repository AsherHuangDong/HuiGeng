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
              prop="phone"
              label="手机号"
              width="150"
              align="center"
            />
            <el-table-column
              prop="memberName"
              label="开通会员等级"
              width="150"
              align="center"
            />
            <el-table-column
              prop="rewardNum"
              label="现金钱包奖励"
              width="150"
              align="center"
            ><template slot-scope="scope">
              <span>{{ scope.row.rewardNum }} USDT</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="rewardNum2"
              label="奖励钱包奖励"
              width="120"
            ><template slot-scope="scope">
              <span>{{ scope.row.rewardNum }} JFC</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="startCost"
              label="每日解锁比例"
              width="150"
              align="center"
            ><template slot-scope="scope">
              <span>{{ scope.row.rewardDayMole }}</span>/<span>{{ scope.row.rewardDayDeno }}</span>
            </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="会员有效期"
              width="180"
              align="center"
            ><template slot-scope="scope">
              <span>{{ $moment(scope.row.memberStartTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
              <br>
              -
              <br>
              <span>{{ $moment(scope.row.memberEndTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template></el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="strategyEdit(scope.row)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
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
export default {
  name: 'Strategy',
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
    this.getAllStrategy()
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.getAllStrategy()
    },
    getAllStrategy() {
      const url = '/api/bg/memberQuali/user/all/' + this.getAllStrategyParams.current +
          '/' + this.getAllStrategyParams.size
        this.$get(url).then(res => {
          console.log(url, res)
          if(res.msg == '未查询到数据') {
            this.tableData = null
          } else {
            this.tableData = res.data.info.records
          }
      })
    },
    strategyAdd() {
      this.$router.push({ name: '/operationClass/openMembershipAdd' })
    },
    strategyEdit(row) {
      const self = this
      this.$router.push({ name: '/operationClass/openMembershipEdit', params: { row: row, self: self }})
    },
  }
}
</script>

<style scoped>

</style>
