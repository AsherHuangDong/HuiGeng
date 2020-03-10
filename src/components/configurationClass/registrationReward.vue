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
        prop="recoType"
        label="推荐类型"
        width="180"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.recoType === 1?'直接推荐':'间接推荐' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rewardNum"
        label="奖励数量"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rewardNum }}LB</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
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
import { RegistrationList } from '../../service/bg'
export default {
  name: 'RegistrationReward',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.RegistrationList()
  },
  methods: {
    edit(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/registrationRewardEdit', params: { row: row, self: self }})
    },
    RegistrationList() {
      RegistrationList(this)
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
