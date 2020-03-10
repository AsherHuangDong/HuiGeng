<template>
  <div>
    <el-dialog title="修改限额" :visible.sync="dialogFormVisible" :before-close="cancel" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="币种" :label-width="formLabelWidth"><template>
          <span>{{ row.coinSymbol }}</span>
        </template></el-form-item>
        <el-form-item label="审核限额" :label-width="formLabelWidth">
          <el-input v-model="form.auditLimit" autocomplete="off" style="width:200px" />
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
// import { withDrawAll } from '../../service/bg'
import { globalConfigList } from '../../service/bg'
export default {
  name: 'GlobalQuota',
  data() {
    const self = this
    return {
      row: {},
      dialogFormVisible: false,
      form: {
        id: self.$route.params.row.id,
        auditLimit: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.auditLimit = this.row.auditLimit
    console.log('row', this.row)
    this.showDialog()
    this.getWithDraw()
  },
  methods: {
    editWithDraw() {
      // const url = '/api/bg/withdraw'
      const url = '/api/bg/globalConfig'
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
