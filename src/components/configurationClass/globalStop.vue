<template>
  <div>
    <el-dialog
      title="暂停/恢复提币"
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
// import { withDrawAll } from '../../service/bg'
import { globalConfigList } from '../../service/bg'
export default {
  name: 'GlobalStop',
  data() {
    const self = this
    return {
      message: '',
      row: {},
      dialogFormVisible: false,
      form: {
        id: self.$route.params.row.id,
        status: 0
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.message = this.row.status === 2 ? '确定要暂停提币吗' : '确定要恢复提币吗'
    this.showDialog()
    this.getWithDraw()
  },
  methods: {
    editWithDraw() {
      // 需要先判断status再传参
      // const url = '/api/bg/withdraw'
      const url = '/api/bg/globalConfig'
      this.form.status = this.row.status === 2 ? 1 : 2
      this.$put(url, this.form).then(res => {
        console.log(url, res)
        globalConfigList(this.$route.params.self)
        this.cancel()
      })
    },
    getWithDraw() {
      const url = '/api/bg/withdraw/' + this.row.id
      this.$get(url).then(res => {
        console.log(url, res)
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
