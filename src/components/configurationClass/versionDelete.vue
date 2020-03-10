<template>
  <div>
    <el-dialog
      title="是否删除该版本"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <div style="text-align: center;">
        <span>删除后数据将无法恢复</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" @click="confirm">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getVersionCountAll } from '../../service/bg'
export default {
  name: 'VersionDelete',
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
      // const url = '/api/bg/strategy/?strategyId=' + this.row.strategyId
      const url = '/api/bg/version/' + this.row.id
      this.$delete(url).then(res => {
        console.log(url, res)
        this.$message('删除成功')
        getVersionCountAll(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/version')
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
