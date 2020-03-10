<template>
  <div class="box">
    <el-col
      :span="19"
      :offset="1"
    >
      <div class="grid-content bg-purple-dark" />
      用户
      <el-input
        v-model="queryParams.userSearch"
        placeholder="请输入用户ID/用户姓名/手机号"
        class="input-with-select"
        style="width:300px"
      />
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="search">搜索</el-button>
      <el-button @click="reset">重置</el-button>
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
          prop="userId"
          label="用户ID"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        />
        <el-table-column
          prop="exchangeAsset"
          label="交易所资产"
          align="center"
        ><template slot-scope="scope">
          <span @click="ExchangeView(scope.row)"> {{ scope.row.exchangeAsset }} 元 </span>
        </template>
        </el-table-column>
        <el-table-column
          prop="cashAsset"
          label="现金资产"
          align="center"
        ><template slot-scope="scope">
          <span @click="CashView(scope.row)"> {{ scope.row.cashAsset }} 元 </span>
        </template>
        </el-table-column>
        <el-table-column
          prop="rewardAsset"
          label="奖励钱包"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.rewardAsset }} 元
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
        userSearch:'',
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
      this.queryParams.userSearch = ''
      this.search()
    },
    search() {
      const params = new FormData()
      if (this.queryParams.userSearch != '') {
        params.append('userSearch', this.queryParams.userSearch)
      }
      const url =
        "/api/bg/userAssetsCat/all/" +
        this.pageParams.current +
        "/" +
        this.pageParams.size;
      this.$post(url, params).then(res => {
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
      const url =
        "/api/bg/userAssetsCat/all/" +
        this.pageParams.current +
        "/" +
        this.pageParams.size;
      this.$post(url).then(res => {
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
    CashView(row) {
      const self = this;
      this.$router.push({
        name: "/assetManagementClass/assetViewCash",
        params: { row: row, self: self }
      });
    },
    ExchangeView(row) {
      const self = this;
      this.$router.push({
        name: "/assetManagementClass/assetViewExchange",
        params: { row: row, self: self }
      });
    }
  }
};
</script>

<style scoped>
</style>
