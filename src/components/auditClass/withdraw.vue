<template>
  <div class="box">
    <el-col :span="13" :offset="1">
      <div class="grid-content bg-purple-dark" />用户
      <el-input v-model="queryParams.userSearch" placeholder="请输入用户ID/用户姓名/手机号" class="input-with-select" style="width:300px">
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
    </el-col>
    <el-col :span="5" :offset="5">
      审核状态
      <el-select v-model="queryParams.status" placeholder="请选择" @change="search">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          align="center"
        />
      </el-select>
    </el-col>
    <br>
    <br>
    <br>
    <br>
    <el-col :span="23" :offset="1">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          width="80"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="180"
          align="center"
        />
        <el-table-column
          prop="userName"
          label="用户姓名"
          align="center"
        />
        <el-table-column
          prop="coinSymbol"
          label="提币币种"
          width="180"
          align="center"
        />
        <el-table-column
          prop="num"
          label="提币数量"
          width="180"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="提交时间"
          align="center"
        ><template slot-scope="scope">
          <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="vstatus"
          label="审核状态"
          align="center"
        />
        <el-table-column
          prop="address"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="ispass(scope.row,1)">通过</el-button>
            <el-button type="text" size="small" @click="ispass(scope.row,2)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :size="10"
        style="margin-top:20px;text-align:center"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <router-view />
  </div>
</template>

<script>
import { withDrawList } from '../../service/bg'
export default {
  name: 'Withdraw',
  data() {
    return {
      tableData: [],
      pageParams: {
        current: 1,
        size: 10
      },
      queryParams: {
        userSearch: '',
        status: ''
      },
      options: [
        { label: '全部', value: -1 },
        { label: '待审核', value: 0 },
        { label: '通过', value: 1 },
        { label: '不通过', value: 2 }
      ]
    }
  },
  mounted() {
    this.withDraw()
  },
  methods: {
    handleCurrentChange(value) {
      this.pageParams.current = value
      this.withDraw()
    },
    ispass(row, ispass) {
      const self = this
      this.$router.push({ name: '/auditClass/withdrawAudit', params: { row: row, self: self, ispass: ispass }})
    },
    search() {
      const url = '/api/bg/mentmoney/all/' + this.pageParams.current + '/' + this.pageParams.size
      const params = new FormData()
      if (this.queryParams.userSearch !== '') {
        params.append('userSearch', this.queryParams.userSearch)
      }
      if (this.queryParams.status !== -1) {
        params.append('status', this.queryParams.status)
      }
      this.$post(url, params).then(res => {
        console.log(url, res)
        if (res.msg === '未查询到数据') {
          this.$message(res.msg)
          this.tableData = null
        } else {
          this.tableData = res.data.info.records
        }
      })
    },
    withDraw() {
      withDrawList(this)
    }
  }
}
</script>

<style scoped>

</style>
