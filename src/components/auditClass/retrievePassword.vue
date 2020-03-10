<template>
  <div class="box">
    <el-col :span="9" :offset="1">
      <div class="grid-content bg-purple-dark" />用户
      <el-input v-model="queryParams.userSearch" placeholder="请输入用户ID/用户姓名/手机号" class="input-with-select" style="width:300px">
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
    </el-col>
    <el-col :span="7">
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
    <el-col :span="7">
      排序
      <el-select v-model="queryParams.orderBy" placeholder="请选择" @change="search">
        <el-option
          v-for="item in orderOptions"
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
        <el-table-column prop="paypwdImgUrl" label="图片" min-width="20%">
          <!-- 图片的显示 -->
          <template slot-scope="scope">
            <img :src="scope.row.paypwdImgUrl" min-width="70" height="70" alt="图片">
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
          prop="createTime"
          label="提交时间"
          align="center"
        ><template slot-scope="scope">
          <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </template></el-table-column>
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
            <i v-show="scope.row.status == 1" style="font-size:72px;color:green" class="el-icon-success" />
            <i v-show="scope.row.status == 2" style="font-size:72px;color:red" class="el-icon-error" />
            <el-button v-show="scope.row.status == 0" type="text" size="small" @click="ispass(scope.row,1)">通过</el-button>
            <el-button v-show="scope.row.status == 0" type="text" size="small" @click="ispass(scope.row,2)">不通过</el-button>
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
import { ResetList } from '../../service/bg'
export default {
  name: 'RetrievePassword',
  data() {
    return {
      tableData: [],
      pageParams: {
        current: 1,
        size: 10
      },
      queryParams: {
        userSearch: '',
        status: '',
        orderBy: ''
      },
      options: [
        { label: '全部', value: -1 },
        { label: '待审核', value: 0 },
        { label: '通过', value: 1 },
        { label: '不通过', value: 2 }
      ],
      orderOptions: [
        { label: '按提交时间排序', value: 1 },
        { label: '按审核时间排序', value: 2 }
      ]
    }
  },
  mounted() {
    this.ResetList()
  },
  methods: {
    handleCurrentChange(value) {
      this.pageParams.current = value
      this.ResetList()
    },
    search() {
      const p = new FormData()
      p.append('userSearch', this.queryParams.userSearch)
      p.append('orderBy', this.queryParams.orderBy)
      if (this.queryParams.status !== -1) {
        p.append('status', this.queryParams.status)
      }
      const url = '/api/bg/paypwd/all/' + this.pageParams.current + '/' + this.pageParams.size
      this.$post(url, p).then(res => {
        console.log(url, res)
        if (res.msg === '未查询到数据') {
          this.$message(res.msg)
          this.tableData = null
        } else {
          this.tableData = res.data.info.records
        }
      })
    },
    ResetList() {
      ResetList(this)
    },
    ispass(row, ispass) {
      const self = this
      this.$router.push({ name: '/auditClass/retrievePasswordAudit', params: { row: row, self: self, ispass: ispass }})
    }
  }
}
</script>

<style scoped>

</style>
