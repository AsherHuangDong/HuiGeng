<template>
  <div class="box">
    <el-col
      :span="12"
      :offset="1"
    >
      <div class="grid-content bg-purple-dark" />
      用户名
      <el-input
        v-model="queryParams.userName"
        placeholder="请输入用户名"
        class="input-with-select"
        style="width:200px"
      />
      &nbsp;&nbsp;
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </el-col>
    <el-col :span="5">
      币种
      <el-select
        v-model="queryParams.symbol"
        placeholder="请选择"
        style="width:150px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          align="center"
        />
      </el-select>
    </el-col>
    <el-col :span="6">
      充提类型
      <el-select
        v-model="queryParams.type"
        placeholder="请选择"
        style="width:150px"
      >
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
    <el-col
      :span="23"
      :offset="1"
    >
      转入地址
      <el-input
        v-model="queryParams.toAddress"
        placeholder="请输入转入地址"
        class="input-with-select"
        style="width:300px"
      />
      &nbsp;&nbsp;
      转出地址
      <el-input
        v-model="queryParams.fromAddress"
        placeholder="请输入转出地址"
        class="input-with-select"
        style="width:300px"
      />
    </el-col>
    <br>
    <br>
    <br>
    <br>
    <el-col
      :span="23"
      :offset="1"
    >
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          width="150"
          align="center"
        >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="时间"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <span>
              {{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="symbol"
          label="币种"
          align="center"
        />
        <el-table-column
          prop="type"
          label="充提类型"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.type == 1 ? '充币' : scope.row.type == 2 ? '提币' : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额"
          align="center"
        />
        <el-table-column
          prop="fromAddress"
          label="转出地址"
          align="center"
        />
        <el-table-column
          prop="toAddress"
          label="转入地址"
          align="center"
        />
        <el-table-column
          prop="remark"
          label="备注"
          align="center"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.remark }} <i class="el-icon-edit-outline" @click="changeRemark(scope.row)" />
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :size="10"
        :total="total"
        style="margin-top:20px;text-align:center"
        @current-change="handleCurrentChange"
      />
    </el-col>
    <router-view />
  </div>
</template>

<script>
import { getWithdrawRw } from '../../service/bg'
export default {
  name: "KYC",
  data() {
    return {
      total:'',
      tableData: [],
      pageParams: {
        current: 1,
        size: 10
      },
      queryParams: {
        userName:'',
        symbol:'',
        type:'',
        fromAddress:'',
        toAddress:''
      },
      options: [
        { label: "全部", value: "全部" },
        { label: "BTC", value: "BTC" },
        { label: "ETH", value: "ETH" },
        { label: "USDT", value: "USDT" },
        { label: "JFC", value: "JFC" }
      ],
      orderOptions: [
        { label: "全部", value: -1 },
        { label: "充币", value: 1 },
        { label: "提币", value: 2 }
      ]
    };
  },
  mounted() {
    this.KYCList();
  },
  methods: {
    handleCurrentChange(value) {
      this.pageParams.current = value;
      this.KYCList();
    },
    reset() {
      this.queryParams.userName = ''
      this.queryParams.symbol = ''
      this.queryParams.type = ''
      this.queryParams.fromAddress = ''
      this.queryParams.toAddress = ''
      this.search()
    },
    search() {
      if (this.queryParams.userName == '') {
        delete this.queryParams.userName
      }
      if (this.queryParams.fromAddress == '') {
        delete this.queryParams.fromAddress
      }
      if (this.queryParams.toAddress == '') {
        delete this.queryParams.toAddress
      }
      if (this.queryParams.type == '' || this.queryParams.symbol == "全部") {
        delete this.queryParams.symbol
      }
      if (this.queryParams.type == '' || this.queryParams.type == -1) {
        delete this.queryParams.type
      }
      const url =
        "/api/bg/withdrawRw/all/" +
        this.pageParams.current +
        "/" +
        this.pageParams.size;
      this.$post(url, this.queryParams).then(res => {
        console.log(url, res);
        if (res.msg === "未查询到数据") {
          this.$message(res.msg);
          this.tableData = null;
        } else {
          this.tableData = res.data.info.records;
          this.total = res.data.info.total;
        }
      });
    },
    KYCList() {
      getWithdrawRw(this)
    },
    changeRemark(row, ispass) {
      const self = this;
      this.$router.push({
        name: "/assetManagementClass/flowingWaterViewRemark",
        params: { row: row, self: self }
      });
    }
  }
};
</script>

<style scoped>
</style>
