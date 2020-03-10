<template>
  <div>
    <el-dialog
      title="是否删除该收款方式"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>删除后数据无法恢复</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" @click="confirm">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBankCountAll, getPayZAccountAll, getPayWAccountAll } from '../../service/bg'
export default {
  name: 'PaymentAccountDelete',
  data() {
    return {
      row: {},
      loading: {
        deleteRole: false
      },
      dialogFormVisible: false,
      flag: 0,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.flag = this.$route.params.flag
    this.showDialog()
  },
  methods: {
    confirm() {
      console.log('confirm')
      this.deleteBankAccount()
    },
    cancel() {
      this.$router.push('/configurationClass/paymentAccount')
    },
    showDialog() {
      setTimeout(() => {
        this.dialogFormVisible = true
      }, 1)
    },
    deleteBankAccount() {
      this.loading.deleteRole = true
      console.log('this.row', this.row)
      if (this.flag === 0) {
        this.$delete('/api/bg/bankAccount/' + this.row.id)
          .then(res => {
            console.log(res)
            this.$message('删除成功')
            getBankCountAll(this.$route.params.self)
            this.cancel()
          }).finally(() => {
            this.loading.deleteRole = false
          })
      }
      if (this.flag === 1 || this.flag === 2) {
        this.$delete('/api/bg/payAccount/' + this.row.id)
          .then(res => {
            console.log(res)
            this.$message('删除成功')
            getPayZAccountAll(this.$route.params.self)
            getPayWAccountAll(this.$route.params.self)
            this.cancel()
          }).finally(() => {
            this.loading.deleteRole = false
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
