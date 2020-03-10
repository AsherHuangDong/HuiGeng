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
        <el-button type="primary" @click="changeStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { withDrawList } from '../../service/bg'
export default {
  name: 'RetrievePasswordAudit',
  data() {
    const self = this
    return {
      title: '',
      message: '',
      row: {},
      ispass: 1,
      dialogFormVisible: false,
      form: {
        id: self.$route.params.row.id,
        status: 0
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.ispass = this.$route.params.ispass
    if (this.ispass === 1) {
      this.title = '通过找回密码审核'
      this.message = '确定要通过该条找回密码审核吗'
    } else {
      this.title = '不通过找回密码审核'
      this.message = '确定不通过该条找回密码审核吗'
    }
    this.showDialog()
  },
  methods: {
    changeStatus() {
      // 需要先判断status再传参
      const url = '/api/bg/mentmoney/status'
      this.form.status = this.ispass
      const params = new FormData()
      params.append('id', this.row.id)
      params.append('status', this.ispass)
      this.$put(url, params).then(res => {
        console.log(url, res)
        if(res.code == 200){
          this.$message.error(res.msg);
        }
        withDrawList(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/auditClass/withdraw')
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
