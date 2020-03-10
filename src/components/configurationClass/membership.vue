<template>
  <div>
    <el-table
      :data="tableData"
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
        prop="memberName"
        label="会员等级"
        width="180"
      />
      <el-table-column
        prop="strategies"
        label="可用策略"
      >
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.strategies" :key="index">{{ item.strategyName }}{{ scope.row.strategies.length-1>index?",":"" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view />
  </div>
</template>

<script>
import { getAllMember } from '../../service/bg'
export default {
  name: 'Membership',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getAllMember()
  },
  methods: {
    edit(row) {
      const self = this
      this.$router.push({ path: '/configurationClass/membershipConfig', query: { row: row, self: self }})
    },
    getAllMember() {
      getAllMember(this)
    }
  }
}
</script>

<style scoped>

</style>
