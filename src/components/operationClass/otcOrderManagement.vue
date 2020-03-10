<template>
  <div class="box">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="买单" name="first">
        <el-col :span="18" :offset="1">
          <div class="grid-content bg-purple-dark" />用户
          <el-input v-model="queryParams1.userId" placeholder="请输入用户ID" class="input-with-select" style="width:200px" />
          <el-button type="primary" @click="getList1">搜索</el-button>
        </el-col>
        <el-col :span="5">
          订单状态
          <el-select v-model="queryParams1.status" placeholder="请选择" @change="getList1">
            <el-option
              label="全部"
              value="-1"
              align="center"
            />
            <el-option
              v-for="item in options1"
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
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单编号" align="center" />
            <el-table-column prop="userId" label="用户ID" align="center" />
            <el-table-column prop="coinSymbol" label="交易币种" align="center" />
            <el-table-column prop="num" label="交易数量" align="center" />
            <el-table-column prop="sum" label="订单金额" align="center" />
            <el-table-column prop="vstatus" label="订单状态" align="center" />
            <el-table-column prop="createTime" label="挂单时间" align="center">
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD") }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerTime" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="sellOrderDetails(scope.row, 1)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageParams1.total"
            style="margin-top:20px;text-align:center"
            @current-change="handleCurrentChange1"
          />
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="卖单" name="second">
        <el-col :span="18" :offset="1">
          <div class="grid-content bg-purple-dark" />用户
          <el-input v-model="queryParams2.userId" placeholder="请输入用户ID" class="input-with-select" style="width:200px" />
          <el-button type="primary" @click="getList2">搜索</el-button>
        </el-col>
        <el-col :span="5">
          订单状态
          <el-select v-model="queryParams2.status" placeholder="请选择" @change="getList2">
            <el-option
              label="全部"
              value="-1"
              align="center"
            />
            <el-option
              v-for="item in options2"
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
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="订单编号" align="center" />
            <el-table-column prop="userId" label="用户ID" align="center" />
            <el-table-column prop="coinSymbol" label="交易币种" align="center" />
            <el-table-column prop="num" label="交易数量" align="center" />
            <el-table-column prop="sum" label="订单金额" align="center" />
            <el-table-column prop="vstatus" label="订单状态" align="center" />
            <el-table-column prop="createTime" label="挂单时间" align="center">
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD") }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="registerTime" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="sellOrderDetails(scope.row, 2)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pageParams2.total"
            style="margin-top:20px;text-align:center"
            @current-change="handleCurrentChange2"
          />
        </el-col>
      </el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options1: [{
          value: '1',
          label: '待付款'
        }, {
          value: '5',
          label: '待收货'
        }, {
          value: '3',
          label: '已完成'
        }, {
          value: '4',
          label: '已取消'
        }, {
          value: '6',
          label: '申诉中'
        }],
        options2: [{
          value: '1',
          label: '待付款'
        }, {
          value: '5',
          label: '已付款'
        }, {
          value: '3',
          label: '已完成'
        }, {
          value: '4',
          label: '已取消'
        }, {
          value: '7',
          label: '申请取消'
        }
        ],
        activeName: 'first',
        tableData1: [],
        tableData2: [],
        queryParams1: {
          userId: '',
          orderType: '',
          status: '-1'
        },
        queryParams2: {
          userId: '',
          orderType: '',
          status: '-1'
        },
        pageParams1: {
          current: 1,
          size: 10,
          total:'',
        },
        pageParams2: {
          current: 1,
          size: 10,
          total:'',
        }
      };
    },
    mounted() {
      if(this.$route.params.type == 1) {
        this.activeName = 'first'
      }
      if(this.$route.params.type == 2) {
        this.activeName = 'second'
      }
      this.getList1()
      this.getList2()
    },
    methods: {
      sellOrderDetails(row, type) {
        const self = this
        this.$router.push({ name: '/operationClass/sellOrderDetails', params: { row: row, self: self, type:type }})
      },
      handleCurrentChange1(value) {
        this.pageParams1.current = value
        this.getList1()
      },
      handleCurrentChange2(value) {
        this.pageParams2.current = value
        this.getList2()
      },
      getList1() {
        const url = '/api/bg/order/all/' + this.pageParams1.current + '/' + this.pageParams1.size
        const p = new FormData()
        p.append('orderType', '1')
        if (this.queryParams1.userId != '') {
          p.append('userId', this.queryParams1.userId)
        }
        if (this.queryParams1.status != '-1') {
          p.append('status', this.queryParams1.status)
        }
        this.$post(url, p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            
            if(Object.keys(res.data).length!=0) {
              this.tableData1 = res.data.info.records
              this.pageParams1.total = res.data.info.total
            } else {
              this.tableData1 = null
            }
          }
        })
      },
      getList2() {
        const url = '/api/bg/order/all/' + this.pageParams2.current + '/' + this.pageParams2.size
        const p = new FormData()
        p.append('orderType', '2')
        if (this.queryParams2.userId != '') {
          p.append('userId', this.queryParams2.userId)
        }
        if (this.queryParams2.status != '-1') {
          p.append('status', this.queryParams2.status)
        }
        this.$post(url, p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            
            if(Object.keys(res.data).length!=0) {
              this.tableData2 = res.data.info.records
              this.pageParams2.total = res.data.info.total
            } else {
              this.tableData2 = null
            }
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>