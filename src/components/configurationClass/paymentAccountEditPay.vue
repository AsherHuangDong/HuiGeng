<template>
  <div>
    <el-dialog title="修改支付宝/微信支付" :visible.sync="dialogFormVisible" :before-close="cancel" width="500px">
      <el-form :model="form">
        <el-form-item label="收款人姓名" label-width="100px">
          <el-input v-model="form.payName" style="width:300px" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="form.phone" style="width:300px" />
        </el-form-item>
        <el-form-item label="收款二维码" label-width="100px">
          <div class="add">
            <!-- <input ref="photo" name="img" type="file" class="hide" accept="image/*" @change="tirggerFile($event)"> -->
            <input name="img" type="file" class="hide" accept="image/*" @change="tirggerFile($event)">
            <img v-show="file!=''" :src="file" class="img" height="100" width="100">
            <!-- <p v-show="file==''" class="text">未选择任何文件</p> -->
          </div>
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
  name: 'PaymentAccountEditPay',
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
        phone: ''
      },
      file: '',
      row: {},
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.payType = this.$route.params.payMethod
    this.form.payName = this.$route.params.row.payName
    this.file = this.$route.params.row.qcodeUrl
    this.form.phone = this.$route.params.row.phone
    console.log('this.$route.params.row', this.$route.params.row)
    this.tmpstatus = this.$route.params.row.status === 1
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    tirggerFile(event) {
      console.log('event.target.files[0]', event.target.files[0])
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = e => {
        this.file = e.target.result
      }
      this.form.file = event.target.files[0]
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
      const formData = new FormData()
      formData.append('id', this.row.id)
      formData.append('payName', this.form.payName)
      formData.append('phone', this.form.phone)
      formData.append('payType', this.form.payType)
      formData.append('status', this.form.status)
      formData.append('createTime', this.$moment(this.row.createTime).format('YYYY-MM-DD HH:mm:ss'))
      formData.append('file', this.form.file)
      console.log('this.form', this.form)
      this.$put('/api/bg/payAccount', formData).then(res => {
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
.add{
  height: 100px;
  position: relative;
}
.hide{
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 1;
  opacity: 0;
}
.img {
  position: absolute;
}
.text{
  position: absolute;
  z-index: 2;
  width:100px;
  height:100px
}
</style>
