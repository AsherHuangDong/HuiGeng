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
import { allBanner } from '../../service/bg'
export default {
  data() {
    const self = this
    return {
      title:'',
      message: '',
      row: {},
      dialogFormVisible: false,
      form: {
        messageId: '',
        status: 0
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.messageId = this.$route.params.row.messageId;
    this.title = this.row.status === 1 ? '活动下架' : '活动上架'
    this.message = this.row.status === 1 ? '确定要下架该活动吗' : '确定要上架该活动吗'
    this.showDialog()
  },
  methods: {
    editWithDraw() {
      // 需要先判断status再传参
      const url = '/api/bg/message'
      this.form.status = this.row.status === 2 ? 1 : 2
      this.$put(url, this.form).then(res => {
        console.log(url, res)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/operationClass/announcementConfiguration')
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
