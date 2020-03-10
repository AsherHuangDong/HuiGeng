<template>
  <div>
    <el-dialog title="新增银行卡账号" :visible.sync="dialogFormVisible" :before-close="cancel" :close-on-click-modal="false" @close="cancel">
      <el-form :model="form" label-position="top">
        <el-row>
          <el-col :span="11">
            <el-form-item label="开户银行" :label-width="formLabelWidth">
              <el-input v-model="form.bankName" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="开户支行(选填)" :label-width="formLabelWidth">
              <el-input v-model="form.bankBranch" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="银行卡号" :label-width="formLabelWidth">
              <el-input v-model="form.bankCode" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="开户姓名" :label-width="formLabelWidth">
              <el-input v-model="form.accountName" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="form.phone" style="width: 90%" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="收款状态" :label-width="formLabelWidth">
              <el-switch
                v-model="ischeck"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
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
      form: {
        bankName: '',
        bankBranch: '',
        bankCode: '',
        accountName: '',
        status: 1,
        phone: ''
      },
      ischeck: false,
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.row = this.$route.params.row
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    confirm() {
      this.form.status = this.ischeck ? 1 : 2
      console.log('this.form', this.form)
      this.$post('/api/bg/bankAccount', this.form).then(res => {
        console.log('/api/bg/bankAccount', res)
        getBankCountAll(this.$route.params.self)
        this.cancel()
      }).finally(() => {
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/paymentAccount')
    }
  }
}
</script>

<style scoped>

</style>
