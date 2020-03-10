
<template>
  <div id="UserReconciliation">
    <Tabs v-model="name" type="card" @on-click="change">
      <TabPane
        v-for="item in tableData"
        :key="item.id"
        :label="item.coinSymbol"
        :name="item.coinSymbol"
      >
        <span class="title">对账详情</span>
        <br>
        <br>
        <Table :columns="columns1" :data="data1" :loading="loading" />
        <br>
        <div style="text-align:center">
          <Page
            :total="40"
            size="small"
            show-elevator
            show-sizer
            :current="getSearch.current"
            :page-size="getSearch.size"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { withDrawAll, globalConfigList } from "../../service/bg";
export default {
  name: "UserReconciliation",
  data() {
    return {
      data1: [],
      loading:false,
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "日期",
          key: "reconTime",
          align: "center"
        },
        {
          title: "充值总额",
          key: "depositTotal",
          align: "center"
        },
        {
          title: "提现总额",
          key: "withdrawTotal",
          align: "center"
        },
        {
          title: "OTC购买总额",
          key: "otcBuyTotal",
          align: "center"
        },
        {
          title: "OTC卖出总额",
          key: "otcSellTotal",
          align: "center"
        },
        {
          title: "用户总余额",
          key: "userTotal",
          align: "center"
        },
        {
          title: "误差增量",
          key: "errorIncr",
          align: "center"
        },
        {
          title: "累积误差",
          key: "errorTotal",
          align: "center"
        },
        {
          title: "对账结果",
          key: "reconResult",
          align: "center",
          render(h, param) {
            if (param.row.reconResult == 1) {
              return h("span", {}, "正确");
            }
            if (param.row.reconResult == 2) {
              return h("span", {}, "有误");
            }
          }
        }
      ],
      getSearch: {
        symbol: "",
        current: 1,
        size: 10
      },
      reconciliation: {
        symbol: "",
        beginTime: "",
        endTime: ""
      },
      otcListParams: {
        current: 1,
        size: 10,
        total: 0
      },
      globalConfigParams: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      name: ""
    };
  },
  mounted() {
    this.getSymbol();
  },
  methods: {
     getData() {
       this.loading = true;
      this.getSearch.symbol = this.name;
      let obj = {};
      obj.symbol = this.getSearch.symbol;
      obj.current = String(this.getSearch.current);
      obj.size = String(this.getSearch.size);
      this.$post("/api/reconUser/info", obj).then(res => {
        console.log(res);
        this.loading = false;
        if (res.code == 100) {
          this.data1 = res.data.info.records;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getSymbol() {
      let self = this;
      self
        .$get("/api/bg/globalConfig/all", {
          params: {
            current: self.otcListParams.current,
            size: self.otcListParams.size
          }
        })
        .then(res => {
          self.globalConfigParams.current = res.data.info.current;
          self.globalConfigParams.size = res.data.info.size;
          self.globalConfigParams.total = res.data.info.total;
          self.tableData = [];
          res.data.info.forEach(element => {
            element.vstatus = element.status == 2 ? true : false;
            self.tableData.push(element);
          });
          self.name = self.tableData[0].coinSymbol;
          self.getData();
        });
    },
    changePage(page) {
      this.getSearch.current = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.getSearch.size = pageSize;
      this.getData();
    },
    change(name) {
      console.log("name", name);
      this.getData();
    }
  }
};
</script>

<style scoped>
#dayReconciliation .title {
  font-family: "PingFangSC-Semibold", "PingFang SC Semibold", "PingFang SC";
  font-weight: 650;
  font-style: normal;
  font-size: 18px;
  color: #596597;
}
</style>

