<template>
  <div>
    <el-dialog
      title="是否删除该条数据？"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>数据删除后将无法恢复</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" @click="confirm">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllStrategy } from '../../service/bg'
export default {
  name: 'StrategyDelete',
  data() {
    return {
      row: {},
      dialogFormVisible: false,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.showDialog()
  },
  methods: {
    confirm() {
      const url = '/api/bg/banner/' + this.row.bannerId
      this.$delete(url).then(res => {
        console.log(url, res)
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.cancel()
      })
    },
    cancel() {
      this.$router.go(-1)
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
