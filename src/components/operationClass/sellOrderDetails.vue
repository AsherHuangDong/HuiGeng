<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="500px" @close="cancel(type)">
      <el-form :model="form" label-position="left">
        <el-divider direction="vertical" />
        <span>订单信息</span>
        <br>
        <br>
        <el-row>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">订单编号</span><span>{{ order.orderId }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span style="margin-right:30px">用户ID</span><span>{{ order.userId }}</span>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">交易类型</span><span>{{ order.vorderType }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">交易币种</span><span>{{ order.coinSymbol }}</span>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">交易数量</span><span>{{ order.num }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">订单金额</span><span>{{ order.sum }} 元</span>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="11" :offset="1">
            <span style="margin-right:30px">手续费</span><span v-if="this.$route.params.type == 1">{{ order.poundage }} 元</span><span v-if="this.$route.params.type == 2">{{ order.poundage }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">到账数量</span><span v-if="this.$route.params.type == 1">{{ order.num }} {{ order.coinSymbol }}</span>
            <span v-if="this.$route.params.type == 2" style="margin-right:20px">到账金额</span><span v-if="this.$route.params.type == 2">{{ order.toAccount }} 元</span>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-row>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">订单状态</span><span>{{ order.vstatus }}</span>
          </el-col>
        </el-row>
        <br>
        <br>
        <el-divider direction="vertical" />
        <span>收款信息</span>
        <br>
        <br>
        <el-row v-if="order.payType == 3">
          <el-col :span="11" :offset="1">
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">支付方式</span><span v-if="this.$route.params.type == 1">{{ order.payType == 1 ? '支付宝转账': order.payType == 2 ? '微信转账': order.payType == 3 ? '银行卡转账' : '' }}</span>
            <span v-if="this.$route.params.type == 2" style="margin-right:20px">收款方式</span><span v-if="this.$route.params.type == 2">{{ order.payType == 1 ? '支付宝': order.payType == 2 ? '微信': order.payType == 3 ? '银行卡' : '' }}</span>
            <br>
            <br>
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">开户银行</span><span>{{ bankAccount.bankName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">银行卡号</span><span v-if="this.$route.params.type == 1">{{ bankAccount.bankCode }}</span><span v-if="this.$route.params.type == 2">{{ order.bankCode }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">开户姓名</span><span>{{ bankAccount.accountName }}</span>
            <br>
            <br>
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">开户银行支行</span><span>{{ bankAccount.bankBranch }}</span>
            <br>
            <br>
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">联系电话</span><span>{{ bankAccount.phone }}</span>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="11" :offset="1">
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">支付方式</span><span v-if="this.$route.params.type == 1">{{ order.payType == 1 ? '支付宝转账': order.payType == 2 ? '微信转账': order.payType == 3 ? '银行卡转账' : '' }}</span>
            <span v-if="this.$route.params.type == 2" style="margin-right:20px">收款方式</span><span v-if="this.$route.params.type == 2">{{ order.payType == 1 ? '支付宝': order.payType == 2 ? '微信': order.payType == 3 ? '银行卡' : '' }}</span>
            <br>
            <br>
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">收款人姓名</span><span>{{ payAccount.payName }}</span>
            <span v-if="this.$route.params.type == 2" style="margin-right:20px">收款姓名</span><span>{{ order.payName }}</span>
            <br>
            <br>
            <span v-if="this.$route.params.type == 1" style="margin-right:20px">联系电话</span><span>{{ payAccount.phone }}</span>
            <br>
            <br>
          </el-col>
          <el-col :span="11" :offset="1">
            <img v-if="this.$route.params.type == 1" :src="payAccount.qcodeUrl" alt="" width="100" height="100">
            <img v-if="this.$route.params.type == 2" :src="order.qcodeUrl" alt="" width="100" height="100">
          </el-col>
        </el-row>
        <div v-if="order.status == 6">
          <br>
          <br>
          <el-divider direction="vertical" />
          <span>用户申诉信息</span>
          <br>
          <br>
        </div>
        <el-row v-if="order.status == 6">
          <el-col :span="23" :offset="1">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.createTime"
              >
                <span>{{ activity.complaintDesc }} <span v-show="activity.qq!=null">(QQ:{{ activity.qq }})</span></span>
                <br>
                <br>
                <template v-for="(item,i) in activity.complaintMultArr">
                  <img :key="i" :src="activity.complaintMultArr[i]" alt="" width="50" height="50">&nbsp;&nbsp;
                </template>
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
        <br>
        <br>
      </el-form>
      <div slot="footer">
        <el-button v-if="this.$route.params.type == 1 && order.status == 5 || this.$route.params.type == 1 && order.status == 6" type="primary" @click="payOrder">发货</el-button>
        <el-button v-if="order.status == 6" @click="closeOrder">未收到打款</el-button>
        <el-button v-if="this.$route.params.type == 2 && order.status == 1" type="primary" @click="paySellOrder">已付款</el-button>
        <el-button v-if="this.$route.params.type == 1 && order.status == 5 || this.$route.params.type == 1 && order.status == 6 || this.$route.params.type == 2 && order.status == 1" @click="cancel(type)">关闭</el-button>
        <el-button v-if="order.status == 7" @click="paySellOrder">同意</el-button>
        <el-button v-if="order.status == 7" @click="closeSellOrder">不同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBankCountAll } from '../../service/bg'
export default {
  name: 'PaymentAccountAddBankCard',
  data() {
    return {
      row: {},
      dialogFormVisible: false,
      bankAccount:{
        accountName: '',
        bankName: '',
        bankBranch: '',
        bankCode: '',
        phone: ''
      },
      order: {
        payType:'',
        orderId: '',
        userId: '',
        vorderType: '',
        coinSymbol: '',
        num: '',
        sum: '',
        poundage: '',
        vstatus: '',
        payName: '',
        qcodeUrl: '',
        bankCode: ''
      },
      // sellOrder: {
      //   orderId: '',
      //   userId: '',
      //   vorderType: '',
      //   coinSymbol: '',
      //   num: '',
      //   sum: '',
      //   poundage: '',
      //   vstatus: ''
      // },
      payAccount: {
        payName: '',
        qcodeUrl: '',
        phone: ''
      },
      type:'',
      ischeck: false,
      formLabelWidth: '120px',
      activities: []
      // activities: [{
      //   content: '活动按期开始',
      //   timestamp: '2018-04-15'
      //   }, {
      //     content: '通过审核',
      //     timestamp: '2018-04-13'
      //   }, {
      //     content: '创建成功',
      //     timestamp: '2018-04-11'
      //   }]
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.type = this.$route.params.type
    if(this.type == 1) {
      this.getPayOrderDetails()
    }
    if(this.type == 2) {
      this.getSellOrderDetails()
    }
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
      getSellOrderDetails() {
        const url = '/api/bg/order/sell/' + this.row.orderId
        this.$get(url).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            if(Object.keys(res.data).length!=0) {
              this.order = res.data.info
              // if (res.data.info.payType == 3) {
              //   this.bankAccount = res.data.info.bankAccount
              // } else {
              //   this.payAccount = res.data.info.payAccount
              // }
            }
          }
        })
    },
    getPayOrderDetails() {
        const url = '/api/bg/order/buy/' + this.row.orderId
        this.$get(url).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            if(Object.keys(res.data).length!=0) {
              this.order = res.data.info.orderTable
              if (res.data.info.orderTable.payType == 3) {
                this.bankAccount = res.data.info.bankAccount
              } else {
                if(Object.keys(res.data.info.payAccount).length!=0) {
                  this.payAccount = res.data.info.payAccount
                }
              }
              if (res.data.info.orderComList !== undefined) {
                for (let i in res.data.info.orderComList) {
                  res.data.info.orderComList[i].createTime = this.$moment(res.data.info.orderComList[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                }
                this.activities = res.data.info.orderComList
              }
            }
          }
        })
    },
    closeSellOrder() {
        const p = new FormData()
        p.append('orderId', this.row.orderId)
        const url = '/api/bg/order/sell/close'
        this.$put(url,p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            this.$message('订单关闭成功');
            this.cancel()
          }
        })
    },
    paySellOrder() {
        const p = new FormData()
        p.append('orderId', this.row.orderId)
        const url = '/api/bg/order/sell'
        this.$put(url,p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            this.$message('订单关闭成功');
            this.cancel()
          }
        })
    },
    closeOrder() {
        const p = new FormData()
        p.append('orderId', this.row.orderId)
        const url = '/api/bg/order/buy/close'
        this.$put(url,p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            this.$message('订单关闭成功');
            this.cancel()
          }
        })
    },
    payOrder() {
        const p = new FormData()
        p.append('orderId', this.row.orderId)
        const url = '/api/bg/order/buy'
        this.$put(url,p).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            this.$message('订单发货成功');
            this.cancel()
          }
        })
    },
    confirm() {
      this.form.status = this.ischeck ? 1 : 2
      console.log('this.form', this.form)
      this.$get('/api/bg/order/buy/' + this.row.orderId).then(res => {
        console.log('/api/bg/bankAccount', res)
        getBankCountAll(this.$route.params.self)
        this.cancel()
      }).finally(() => {
        this.cancel()
      })
    },
    cancel(type) {
      this.$router.push({ name: '/operationClass/otcOrderManagement', params: { type:type }})
    }
  }
}
</script>

<style scoped>

</style>
