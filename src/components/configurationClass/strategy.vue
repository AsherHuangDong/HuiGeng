<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-button type="primary" @click="strategyAdd">新增策略</el-button><br><br>
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
              prop="strategyName"
              label="策略名称"
              width="150"
              align="center"
            />
            <el-table-column
              prop="strategyDetail"
              label="文字介绍"
              width="320"
              align="center"
            />
            <el-table-column
              prop="estimateBenefit"
              label="历史收益率"
              width="150"
              align="center"
            />
            <el-table-column
              prop="exchangeIds"
              label="适用交易所"
              width="150"
              align="center"
            />
            <el-table-column
              prop="transactionPairArr"
              label="适用品种"
              width="150"
              align="center"
            />
            <!-- <el-table-column
              prop="address"
              label="允许最大亏损率"
              width="120"
            /> -->
            <el-table-column
              prop="startCost"
              label="策略启动费用"
              width="150"
              align="center"
            />
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="180"
              align="center"
            ><template slot-scope="scope">
              <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template></el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="strategyEdit(scope.row)">修改</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="strategyDelete(scope.row)">删除</el-button>
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
import { getAllStrategy } from '../../service/bg'
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
    this.getAllStrategy()
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.getAllStrategy()
    },
    getAllStrategy() {
      // const url = '/api/bg/strategy/all/?current=' + this.getAllStrategyParams.current +
      //         '&size=' + this.getAllStrategyParams.size
      getAllStrategy(this)
    },
    strategyEdit(row) {
      console.log('changeQuota')
      const self = this
      this.$router.push({ name: '/configurationClass/strategyEdit', params: { row: row, self: self }})
    },
    strategyDelete(row) {
      console.log('stopMention')
      const self = this
      this.$router.push({ name: '/configurationClass/strategyDelete', params: { row: row, self: self }})
    },
    strategyAdd() {
      console.log('changeRate')
      this.$router.push({ name: '/configurationClass/strategyAdd' })
    }
  }
}
</script>

<style scoped>

</style>
