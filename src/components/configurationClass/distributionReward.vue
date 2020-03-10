<template>
  <div class="box">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="180"
        align="center"
      >
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        prop="memberName"
        label="会员等级"
        width="180"
        align="center"
      />
      <el-table-column
        prop="rewardBum1"
        label="直接推荐奖励"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rewardBum1 }} JFC</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rewardBum2"
        label="间接推荐奖励"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rewardBum2 }} JFC</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">修改奖励数量</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view />
  </div>
</template>

<script>
import { DistributionList } from '../../service/bg'
export default {
  name: 'DistributionReward',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.DistributionList()
  },
  methods: {
    edit(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/distributionRewardEdit', params: { row: row, self: self }})
    },
    DistributionList() {
      DistributionList(this)
    }
  }
}
</script>

<style scoped>
.box{
  width: 1000px;
  margin: 0 auto;
}
</style>
