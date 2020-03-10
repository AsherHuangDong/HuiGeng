<template>
  <div>
    <el-dialog title="备注" :visible.sync="dialogFormVisible" :before-close="cancel" width="550px">
      <el-form :model="form" label-width="100px" align="center">
        <el-form-item label="备注内容" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" style="width:320px" />
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
import { getWithdrawRw } from '../../service/bg'
export default {
  name: 'GlobalQuota',
  data() {
    const self = this
    return {
      row: {},
      dialogFormVisible: false,
      form: {
        id: self.$route.params.row.id,
        remark: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.remark = this.row.remark
    console.log('row', this.row)
    this.showDialog()
  },
  methods: {
    editWithDraw() {
      const url = '/api/bg/withdrawRw'
      const params = new FormData()
      params.append('id', this.row.id)
      params.append('remark', this.form.remark)
      this.$put(url, params).then(res => {
        console.log(url, res)
        getWithdrawRw(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/assetManagementClass/flowingWaterView')
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
