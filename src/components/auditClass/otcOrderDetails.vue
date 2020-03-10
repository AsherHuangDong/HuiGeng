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
            <span style="margin-right:30px">手续费</span><span>{{ order.poundage }} 元</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">到账数量</span><span>{{ order.num }} {{ order.coinSymbol }}</span>
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
        <el-row v-if="bankAccount.payTypeName == '银行卡转账'">
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">支付方式</span><span>{{ bankAccount.payTypeName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">开户银行</span><span>{{ bankAccount.bankName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">银行卡号</span><span>{{ bankAccount.bankCode }}</span>
          </el-col>
          <el-col :span="11" :offset="1">
            <span style="margin-right:20px">开户姓名</span><span>{{ bankAccount.accountName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">开户银行支行</span><span>{{ bankAccount.bankBranch }}</span>
            <br>
            <br>
            <span style="margin-right:20px">联系电话</span><span>{{ bankAccount.phone }}</span>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-col :span="11" :offset="1">
            <!-- <span style="margin-right:20px">支付方式</span><span>{{ order.payType == 1 ? '支付宝转账': order.payType == 2 ? '微信转账': order.payType == 3 ? '银行卡转账' : '' }}</span> -->
            <span style="margin-right:20px">支付方式</span><span>{{ payAccount.payTypeName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">收款人姓名</span><span>{{ payAccount.accountName }}</span>
            <br>
            <br>
            <span style="margin-right:20px">联系电话</span><span>{{ payAccount.phone }}</span>
            <br>
            <br>
          </el-col>
          <el-col :span="11" :offset="1">
            <img :src="payAccount.qcodeUrl" alt="" width="100" height="100">
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
        <el-button v-if="order.status == 6" type="primary" @click="closeOrder(2)">卖家已发货</el-button>
        <el-button v-if="order.status == 6" @click="closeOrder(3)">关闭订单</el-button>
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
        payTypeName:'',
        accountName: '',
        bankName: '',
        bankBranch: '',
        bankCode: '',
        phone: ''
      },
      order: {
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
      payAccount: {
        payTypeName:'',
        payName: '',
        qcodeUrl: '',
        phone: ''
      },
      type:'',
      ischeck: false,
      formLabelWidth: '120px',
      activities: []
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.getPayOrderDetails()
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    getPayOrderDetails() {
        const url = '/api/bg/otcComplaint/info/' + this.row.id
        this.$get(url).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            if(Object.keys(res.data).length!=0) {
              this.order = res.data.info.otcComplaintLogOrder
              if (res.data.info.otcComplaintLogPayAccount.payTypeName == '银行卡转账') {
                this.bankAccount = res.data.info.otcComplaintLogPayAccount
              } else {
                this.payAccount = res.data.info.otcComplaintLogPayAccount
              }
              if (res.data.info.otcOrderComList !== undefined) {
                for (let i in res.data.info.otcOrderComList) {
                  res.data.info.otcOrderComList[i].createTime = this.$moment(res.data.info.otcOrderComList[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                }
                this.activities = res.data.info.otcOrderComList
              }
            }
          }
        })
    },
    closeOrder(val) {
        let obj = {
          id:this.row.id,
          status:val
        }
        const url = '/api/bg/otcComplaint'
        this.$put(url,obj).then(res => {
          console.log(url, res)
          if (res.code === 100) {
            this.$message('修改成功');
            this.cancel()
          }
        })
    },
    cancel() {
      this.$router.push({ name: '/auditClass/OTC' })
    }
  }
}
</script>

<style scoped>

</style>
