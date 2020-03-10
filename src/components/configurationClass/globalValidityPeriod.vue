<template>
  <div>
    <el-dialog title="修改订单有效期" :visible.sync="dialogFormVisible" :before-close="cancel" width="550px">
      <el-form :model="form" label-width="150px" align="center">
        <el-form-item label="OTC订单付款有效期" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off" style="width:320px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editWithDraw">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getValidityPeriod } from '../../service/bg'
export default {
  name: 'GlobalQuota',
  data() {
    const self = this
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        time: ''
      }
    }
  },
  mounted() {
    this.form.time = this.$route.params.validityPeriod
    this.form.id = this.$route.params.validityPeriodid
    this.showDialog()
  },
  methods: {
    editWithDraw() {
      const url = '/api/bg/orderValidConfig'
      this.$put(url, this.form).then(res => {
        console.log(url, res)
        getValidityPeriod(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/global')
    },
    showDialog() {
      setTimeout(() => {
        this.dialogFormVisible = true
      }, 1)
    }
  }
}
</script>

<style scoped>

</style>
