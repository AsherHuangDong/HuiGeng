<template>
  <div>
    <el-table :data="strategyList" style="width: 100%" align="center">
      <el-table-column label="序号" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        prop="strategyName"
        label="策略名"
        align="center"
      />
      <el-table-column
        prop="buyNum"
        label="购买数"
        align="center"
      />
      <el-table-column
        prop="useNum"
        label="使用数"
        align="center"
      />
      <el-table-column label="最大资金承载上限" align="center">
        <el-table-column
          prop="maxBearingCapital.BTC"
          label="BTC"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.maxBearingCapital.BTC == undefined ? '不支持' : scope.row.maxBearingCapital.BTC }}
        </template>
        </el-table-column>
        <el-table-column
          prop="maxBearingCapital.ETH"
          label="ETH"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.maxBearingCapital.ETH == undefined ? '不支持' : scope.row.maxBearingCapital.ETH }}
        </template>
        </el-table-column>
        <el-table-column
          prop="maxBearingCapital.EOS"
          label="EOS"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.maxBearingCapital.EOS == undefined ? '不支持' : scope.row.maxBearingCapital.EOS }}
        </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="实际运行资金" align="center">
        <el-table-column
          prop="useCapital.BTC"
          label="BTC"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.useCapital.BTC == undefined ? '不支持' : scope.row.useCapital.BTC }}
        </template>
        </el-table-column>
        <el-table-column
          prop="useCapital.ETH"
          label="ETH"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.useCapital.ETH == undefined ? '不支持' : scope.row.useCapital.ETH }}
        </template>
        </el-table-column>
        <el-table-column
          prop="useCapital.EOS"
          label="EOS"
          align="center"
        ><template slot-scope="scope">
          {{ scope.row.useCapital.EOS == undefined ? '不支持' : scope.row.useCapital.EOS }}
        </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="disUserNum"
        label="失效用户数"
        align="center"
      />
    </el-table>
    <br>
    <!-- <el-row :gutter="12">
            <el-col :span="20" :offset="6">
              <el-pagination
                background
                :current-page="currentPage4"
                :page-sizes="10"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              /></el-col>
      </el-row>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "StrategyUsageProfile",
  data() {
    return {
      strategyList: [],
      getAllStrategyParams: {
        current: 1,
        size: 10
      }
    };
  },
  mounted() {
    this.getAllStrategy();
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value;
      this.getAllStrategy();
    },
    getAllStrategy() {
      const url = "/api/bg/strategy/strategyUseInfo";
      this.$get(url).then(res => {
        console.log(url, res);
        this.strategyList = res.data.info;
      });
    }
  }
};
</script>

<style scoped>

</style>
