<template>
  <div id="dayReconciliation">
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
        <Table :columns="columns1" :data="data1" />
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
        <br>
        <br>
        <span class="title">对账统计</span>
        <br>
        <br>
        <div>
          <DatePicker
            v-model="dateSelect"
            type="daterange"
            placeholder="Select date"
            style="width: 200px"
            @on-change="changeDate"
          />
        </div>
        <br>
      </TabPane>
    </Tabs>
    <div id="lineDay" style="width:100%;height:400px" />
  </div>
</template>

<script>
import { withDrawAll, globalConfigList } from "../../service/bg";
export default {
  name: "DayReconciliation",
  data() {
    return {
      list: [],
      data1: [],
      data2: [],
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
          title: "系统总余额",
          key: "systemTotal",
          align: "center"
        },
        {
          title: "链上资产总额",
          key: "chainAssetsTotal",
          align: "center"
        },
        {
          title: "链上用户资产总额",
          key: "chainUserTotal",
          align: "center"
        },
        {
          title: "链上冷钱包资产总额",
          key: "chainColdWalletTotal",
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
  computed: {
    dateSelect() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  mounted() {
    //this.getSymbol();
    this.getSymbol();
  },
  methods: {
    getData() {
      this.getSearch.symbol = this.name;
      let obj = {};
      obj.symbol = this.getSearch.symbol;
      obj.current = String(this.getSearch.current);
      obj.size = String(this.getSearch.size);
      this.$post("/api/recon/info", obj).then(res => {
        if (res.code == 100) {
          this.data1 = res.data.info;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    getReconciliation() {
      this.reconciliation.symbol = this.name;
      console.log(this.dateSelect);
      let obj = {};
      obj.symbol = this.reconciliation.symbol;
      obj.beginTime = this.DateTool.format(this.dateSelect[0], "yyyy-MM-dd");
      obj.endTime = this.DateTool.format(this.dateSelect[1], "yyyy-MM-dd");
      // if (obj.beginTime) {
      //   obj.beginTime = this.DateTool.format(obj.beginTime, "yyyy-MM-dd");
      // }
      // if (obj.endTime) {
      //   obj.endTime = this.DateTool.format(obj.endTime, "yyyy-MM-dd");
      // }
      console.log(obj);
      if (obj.beginTime && obj.endTime) {
        this.$post("/api/recon/info", obj).then(res => {
          if (res.code == 100) {
            this.data2 = res.data.info;
            console.log(this.data2);
            //if(this.data2.length){
            this.getLine();
            //}
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
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
          self.getReconciliation();
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
      this.getReconciliation();
    },
    changeDate(date) {
      console.log(date);
      console.log(this.dateSelect);
      this.getReconciliation();
    },
    //画图
    getLine() {
      let self = this;
      let dom = document.getElementById("lineDay");
      console.log("dom", dom);
      var myChart = this.$echarts.init(document.getElementById("lineDay"));
      myChart.clear();
      console.log("this.data2", this.data2);
      // 指定图表的配置项和数据
      console.log("myChart", myChart);
      //x坐标
      let x = this.data2.map(function(item) {
        return self.DateTool.format(new Date(item.reconTime), "yyyy-MM-dd");
      });
      console.log("x", x);
      //充值总额
      let depositTotal = this.data2.map(function(item) {
        return item.depositTotal;
      });
      //提现总额
      let withdrawTotal = this.data2.map(function(item) {
        return item.withdrawTotal;
      });
      //系统总余额
      let systemTotal = this.data2.map(function(item) {
        return item.systemTotal;
      });
      //链上资产总额
      let chainAssetsTotal = this.data2.map(function(item) {
        return item.chainAssetsTotal;
      });
      //链上用户资产总额
      let chainUserTotal = this.data2.map(function(item) {
        return item.chainUserTotal;
      });
      //链上冷钱包资产总额
      let chainColdWalletTotal = this.data2.map(function(item) {
        return item.chainColdWalletTotal;
      });
      //误差增量
      let errorIncr = this.data2.map(function(item) {
        return item.errorIncr;
      });
      //累积误差
      let errorTotal = this.data2.map(function(item) {
        return item.errorTotal;
      });
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            "充值总额",
            "提现总额",
            "系统总余额",
            "链上资产总额",
            "链上用户资产总额",
            "链上冷钱包资产总额",
            "误差增量",
            "累积误差"
          ],
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "充值总额",
            type: "line",
            data: depositTotal
          },
          {
            name: "提现总额",
            type: "line",
            data: withdrawTotal
          },
          {
            name: "系统总余额",
            type: "line",
            data: systemTotal
          },
          {
            name: "链上资产总额",
            type: "line",
            data: chainAssetsTotal
          },
          {
            name: "链上用户资产总额",
            type: "line",
            data: chainUserTotal
          },
          {
            name: "链上冷钱包资产总额",
            type: "line",
            data: chainColdWalletTotal
          },
          {
            name: "误差增量",
            type: "line",
            data: errorIncr
          },
          {
            name: "累积误差",
            type: "line",
            data: errorTotal
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
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
