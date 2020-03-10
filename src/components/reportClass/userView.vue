<template>
  <div class="box">
    <el-col :span="8" :offset="1">
      <div class="grid-content bg-purple-dark" />用户
      <el-input v-model="queryParams.userSearch" placeholder="请输入内容" class="input-with-select" style="width:200px" />
    </el-col>
    <el-col :span="10">
      注册时间
      <el-date-picker
        v-model="shijianduan"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width:300px"
      />
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-col>
    <br>
    <br>
    <br>
    <br>
    <el-col :span="23" :offset="1">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户ID" align="center" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="phone" width="150px" label="手机号" align="center" />
        <el-table-column prop="vmemberLevel" label="会员等级" align="center" />
        <el-table-column prop="expirationTime" label="会员到期时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.expirationTime?$moment(scope.row.expirationTime).format("YYYY-MM-DD"):'' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="directIncome" label="直接分销总额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.directIncome }}{{ scope.row.directIncome != null && scope.row.directIncome != 0 ? 'LB' : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="indirectIncome" label="间接分销总额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.indirectIncome }}{{ scope.row.indirectIncome != null && scope.row.indirectIncome != 0 ? 'LB' : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="inviterPhone" width="150px" label="推荐人" align="center" />
        <el-table-column prop="directInviterCount" label="直接推荐人数" align="center" />
        <el-table-column prop="indirectInviterCount" label="间接推荐人数" align="center" />
        <el-table-column prop="registerTime" width="200px" label="注册时间" align="center">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.registerTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        style="margin-top:20px;text-align:center"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'UserView',
  data() {
    return {
      shijianduan: '',
      tableData: [],
      queryParams: {
        userSearch: '',
        beginTime: '',
        endTime: ''
      },
      total:'',
      pageParams: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.userView()
  },
  methods: {
    handleCurrentChange(value) {
      this.pageParams.current = value;
      this.userView();
    },
    reset() {
      this.shijianduan = ''
      this.queryParams.userSearch = ''
      this.userView();
    },
    search() {
      const p = new FormData()
      if (this.shijianduan !== '' && this.shijianduan[0] != null && this.shijianduan[1] != null) {
        this.queryParams.beginTime = this.$moment(this.shijianduan[0]).format('YYYY-MM-DD HH:mm:ss')
        this.queryParams.endTime = this.$moment(this.shijianduan[1]).format('YYYY-MM-DD HH:mm:ss')
        p.append('beginTime', this.queryParams.beginTime)
        p.append('endTime', this.queryParams.endTime)
      }
      if (this.queryParams.userSearch !== '') {
        p.append('userSearch', this.queryParams.userSearch)
      }
      const url = '/api/bg/user/all/' + this.pageParams.current + '/' + this.pageParams.size
      this.$post(url, p).then(res => {
        console.log(url, res)
        if (res.code === 100) {
          if(res.msg === "未查询到数据") {
            this.$message(res.msg)
            this.tableData = null
            this.total = '0'
          } else {
            this.tableData = res.data.info.records
            this.total = res.data.info.total
          }
        }
      })
    },
    userView() {
      const url = '/api/bg/user/all/' + this.pageParams.current + '/' + this.pageParams.size
      this.$post(url).then(res => {
        console.log(url, res)
        this.tableData = res.data.info.records
        this.total = res.data.info.total
      })
    }
  }
}
</script>

<style scoped>
.box{
  margin: 0 50px
}
</style>
