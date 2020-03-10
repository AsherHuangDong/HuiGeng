<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">银行卡账号</span><br><br>
          <el-button type="primary" @click="addCard">新增</el-button>
          <br><br>
          <el-table
            :data="bankList"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="bankName"
              label="开户银行"
              width="180"
              align="center"
            />
            <el-table-column
              prop="bankBranch"
              label="开户银行支行"
              align="center"
            />
            <el-table-column
              prop="bankCode"
              label="银行卡号"
              align="center"
            />
            <el-table-column
              prop="accountName"
              label="开户姓名"
              align="center"
            />
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            ><template slot-scope="scope">
              <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
            </template></el-table-column>
            <el-table-column
              prop="status"
              label="收款状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.status==1?true:false"
                  @change="stop(scope.row, 0)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              width="280"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editCard(scope.row)">修改</el-button>&nbsp;&nbsp;
                <el-button v-show="scope.row.status==1" type="text" size="small" @click="stop(scope.row, 0)">暂停收款</el-button>
                <el-button v-show="scope.row.status==2" type="text" size="small" @click="stop(scope.row, 0)">恢复收款</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="d(scope.row, 0)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <!-- <el-row>
            <el-col :span="18" :offset="6">
              <el-pagination
                :current-page="getBankCountAllParams.current"
                :page-size="10"
                :total="getBankCountAllParams.total"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">支付宝支付</span><br><br>
          <el-button type="primary" @click="addPay(1)">新增</el-button>
          <br><br>
          <el-table
            :data="zhifubaoList"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="payName"
              label="收款人姓名"
              width="180"
              align="center"
            />
            <el-table-column
              prop="payTypeName"
              label="收款类型"
              align="center"
            />
            <el-table-column
              prop="address"
              label="收款二维码"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.qcodeUrl" alt="" width="50" height="50">
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="收款状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.status==1?true:false"
                  @change="stop(scope.row, 1)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row, 1)">修改</el-button>&nbsp;&nbsp;
                <el-button v-show="scope.row.status==1" type="text" size="small" @click="stop(scope.row, 1)">暂停收款</el-button>
                <el-button v-show="scope.row.status==2" type="text" size="small" @click="stop(scope.row, 1)">恢复收款</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="d(scope.row, 1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <!-- <el-row>
            <el-col :span="18" :offset="6">
              <el-pagination
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">微信支付</span><br><br>
          <el-button type="primary" @click="addPay(2)">新增</el-button>
          <br><br>
          <el-table
            :data="weixinList"
            border
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              prop="payName"
              label="收款人姓名"
              width="180"
              align="center"
            />
            <el-table-column
              prop="payTypeName"
              label="收款类型"
              align="center"
            />
            <el-table-column
              prop="address"
              label="收款二维码"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.qcodeUrl" alt="" width="50" height="50">
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="收款状态"
              align="center"
            >
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.status==1?true:false"
                  @change="stop(scope.row, 2)"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="edit(scope.row, 2)">修改</el-button>&nbsp;&nbsp;
                <el-button v-show="scope.row.status==1" type="text" size="small" @click="stop(scope.row, 2)">暂停收款</el-button>
                <el-button v-show="scope.row.status==2" type="text" size="small" @click="stop(scope.row, 2)">恢复收款</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="d(scope.row, 2)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <br>
          <!-- <el-row>
            <el-col :span="18" :offset="6">
              <el-pagination
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script>
import { getBankCountAll, getPayZAccountAll, getPayWAccountAll } from '../../service/bg'
export default {
  name: 'PaymentAccount',
  data() {
    return {
      getBankCountAllParams: {
        total: '',
        current: 1,
        size: 10
      },
      payAccountAllParams: {
        current: 1,
        size: 10,
        payType: '1' // 支付类型(1-支付宝支付,2-微信支付)
      },
      bankList: [],
      zhifubaoList: [],
      weixinList: []
    }
  },
  mounted() {
    this.getBankCountAll()
    this.getPayZAccountAll()
    this.getPayWAccountAll()
  },
  methods: {
    handleCurrentChange(value) {
      this.getBankCountAllParams.current = value
      this.getBankCountAll()
    },
    addPay(payMethod) {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountAddPay', params: { self: self, payMethod: payMethod }})
    },
    addCard() {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountAddBankCard', params: { self: self }})
    },
    getBankCountAll() {
      // const url = '/api/bg/bankAccount/all/?current=' + this.getBankCountAllParams.current +
      //         '&size=' + this.getBankCountAllParams.size
      getBankCountAll(this)
    },
    getPayZAccountAll() {
      getPayZAccountAll(this)
    },
    getPayWAccountAll() {
      getPayWAccountAll(this)
    },
    editCard(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountEditBankCard', params: { row: row, self: self }})
    },
    edit(row, payMethod) {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountEditPay', params: { row: row, self: self, payMethod: payMethod }})
    },
    stop(row, flag) {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountStop', params: { row: row, self: self, flag: flag }})
    },
    d(row, flag) {
      const self = this
      this.$router.push({ name: '/configurationClass/paymentAccountDelete', params: { row: row, self: self, flag: flag }})
    }
  }
}
</script>

<style scoped>

</style>
