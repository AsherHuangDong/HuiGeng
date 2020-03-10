<template>
  <div class="box">
    <el-col :span="13" :offset="1">
      <div class="grid-content bg-purple-dark" />用户
      <el-input v-model="queryParams.userSearch" placeholder="请输入用户ID/用户姓名/手机号" class="input-with-select" style="width:300px">
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
    </el-col>
    <el-col :span="5" :offset="5">
      申诉状态
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
          prop="orderId"
          label="订单编号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="userId"
          label="用户ID"
          width="180"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户姓名"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="coinNum"
          label="买币数量"
          width="180"
          align="center"
        />
        <el-table-column
          prop="price"
          label="应付金额"
          width="180"
          align="center"
        ><template slot-scope="scope">
          <span>{{ scope.row.price }} 元</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="提交申诉时间"
          width="200"
          align="center"
        ><template slot-scope="scope">
          <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="vstatus"
          label="申诉状态"
          align="center"
        />
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="ispass(scope.row)">查看详情</el-button>
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
import { getOTCList } from '../../service/bg'
export default {
  name: 'OTC',
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
        { label: '申诉中', value: 1 },
        { label: '卖方已发货', value: 2 },
        { label: '已关闭订单', value: 3 }
      ]
    }
  },
  mounted() {
    this.getOTCList()
  },
  methods: {
    handleCurrentChange(value) {
      this.pageParams.current = value
      this.getOTCList()
    },
    ispass(row) {
      const self = this
      this.$router.push({ name: '/auditClass/otcOrderDetails', params: { row: row, self: self }})
    },
    search() {
      const url = '/api/bg/otcComplaint/all/' + this.pageParams.current + '/' + this.pageParams.size
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
    getOTCList() {
      getOTCList(this)
    }
  }
}
</script>

<style scoped>

</style>
