<template>
  <div class="box">
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="直接分销"
        name="first"
      >
        <br>
        <br>
        <el-col
          :span="23"
          :offset="1"
        >
          <el-table
            :data="tableData1"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="日期"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.time.join("-") }}
              </template>
            </el-table-column>
            <el-table-column
              prop="xuanZhangReward"
              label="玄奘"
              align="center"
            />
            <el-table-column
              prop="wuKongReward"
              label="悟空"
              align="center"
            />
            <el-table-column
              prop="wuNengReward"
              label="悟能"
              align="center"
            />
            <el-table-column
              prop="wuJingReward"
              label="悟净"
              align="center"
            />
            <el-table-column
              prop="totalReward"
              label="总奖励"
              align="center"
            />
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
      <el-tab-pane
        label="间接分销"
        name="second"
      >
        <br>
        <br>
        <el-col
          :span="23"
          :offset="1"
        >
          <el-table
            :data="tableData2"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="日期"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.time.join("-") }}
              </template>
            </el-table-column>
            <el-table-column
              prop="xuanZhangReward"
              label="玄奘"
              align="center"
            />
            <el-table-column
              prop="wuKongReward"
              label="悟空"
              align="center"
            />
            <el-table-column
              prop="wuNengReward"
              label="悟能"
              align="center"
            />
            <el-table-column
              prop="wuJingReward"
              label="悟净"
              align="center"
            />
            <el-table-column
              prop="totalReward"
              label="总奖励"
              align="center"
            />
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
        
        const url = '/api/bg/memberDist/1/' + this.pageParams1.current + '/' + this.pageParams1.size
        this.$get(url).then(res => {
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
        const url = '/api/bg/memberDist/2/' + this.pageParams2.current + '/' + this.pageParams2.size
        this.$get(url).then(res => {
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