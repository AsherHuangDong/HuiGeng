<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>{{ message }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editWithDraw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBankCountAll, getPayZAccountAll, getPayWAccountAll } from '../../service/bg'
export default {
  name: 'GlobalStop',
  data() {
    const self = this
    return {
      title: '',
      message: '',
      row: {},
      dialogFormVisible: false,
      flag: 0,
      form: {
        id: self.$route.params.row.id,
        status: 0
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.flag = this.$route.params.flag
    this.title = this.row.status === 1 ? '暂停收款' : '恢复收款'
    this.message = this.row.status === 1 ? '确定要暂停收款吗' : '确定要恢复收款吗'
    this.showDialog()
  },
  methods: {
    editWithDraw() {
      if (this.flag === 0) {
        // 需要先判断status再传参
        const url = '/api/bg/bankAccount/status'
        this.form.status = this.row.status === 2 ? 1 : 2
        const p = new FormData()
        p.append('id', this.form.id)
        p.append('status', this.form.status)
        this.$put(url, p).then(res => {
          console.log(url, res)
          getBankCountAll(this.$route.params.self)
          this.cancel()
        })
      }
      if (this.flag === 1) {
        // 需要先判断status再传参
        const url = '/api/bg/payAccount/status/1'
        this.form.status = this.row.status === 2 ? 1 : 2
        const p = new FormData()
        p.append('id', this.form.id)
        p.append('status', this.form.status)
        this.$put(url, p).then(res => {
          console.log(url, res)
          getPayZAccountAll(this.$route.params.self)
          this.cancel()
        })
      }
      if (this.flag === 2) {
        // 需要先判断status再传参
        const url = '/api/bg/payAccount/status/2'
        this.form.status = this.row.status === 2 ? 1 : 2
        const p = new FormData()
        p.append('id', this.form.id)
        p.append('status', this.form.status)
        this.$put(url, p).then(res => {
          console.log(url, res)
          getPayWAccountAll(this.$route.params.self)
          this.cancel()
        })
      }
    },
    cancel() {
      this.$router.push('/configurationClass/paymentAccount')
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
