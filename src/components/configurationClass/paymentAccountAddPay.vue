<template>
  <div>
    <el-dialog title="新增支付宝/微信支付" :visible.sync="dialogFormVisible" :before-close="cancel" width="500px">
      <el-form :model="form">
        <el-form-item label="收款人姓名" label-width="100px">
          <el-input v-model="form.payName" style="width:300px" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="form.phone" style="width:300px" />
        </el-form-item>
        <el-form-item label="收款二维码" label-width="100px">
          <input type="file" @change="tirggerFile($event)">
        </el-form-item>
        <el-form-item label="收款状态" label-width="100px">
          <el-switch
            v-model="tmpstatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getPayZAccountAll, getPayWAccountAll } from '../../service/bg'
export default {
  name: 'PaymentAccountAddPay',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      dialogFormVisible: false,
      tmpstatus: false,
      form: {
        payName: '',
        payType: '',
        status: '',
        file: '',
        phone:''
      },
      file: '',
      row: {},
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.payType = this.$route.params.payMethod
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    tirggerFile(event) {
      this.file = event.target.files[0]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    confirm() {
      this.form.status = this.tmpstatus ? '1' : '2'
      this.form.file = this.file
      const formData = new FormData()
      formData.append('payName', this.form.payName)
      formData.append('payType', this.form.payType)
      formData.append('phone', this.form.phone)
      formData.append('status', this.form.status)
      formData.append('file', this.form.file)
      console.log('this.form', this.form)
      this.$post('/api/bg/payAccount', formData).then(res => {
        console.log('/api/bg/payAccount', res)
        getPayZAccountAll(this.$route.params.self)
        getPayWAccountAll(this.$route.params.self)
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
