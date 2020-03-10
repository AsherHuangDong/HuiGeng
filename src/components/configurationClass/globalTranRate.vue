<template>
  <div>
    <el-dialog title="修改提币手续费" :visible.sync="dialogFormVisible" :before-close="cancel" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="币种" :label-width="formLabelWidth"><template>
          <span>{{ row.coinSymbol }}</span>
        </template></el-form-item>
        <el-form-item label="提币手续费" :label-width="formLabelWidth">
          <el-input v-model="form.tranRate" type="number" style="width:200px" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editRate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { otcList } from '../../service/bg'
import { globalConfigList } from '../../service/bg'
export default {
  name: 'GlobalRate',
  data() {
    const self = this
    return {
      row: {},
      dialogFormVisible: false,
      form: {
        id: self.$route.params.row.id,
        tranRate: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.form.tranRate = this.row.tranRate
    console.log('row', this.row)
    this.showDialog()
    // this.getRate()
  },
  methods: {
    editRate() {
      // const url = '/api/bg/rate'
      const url = '/api/bg/globalConfig'
      this.$put(url, this.form).then(res => {
        console.log(url, res)
        globalConfigList(this.$route.params.self)
        this.cancel()
      })
    },
    getRate() {
      const url = '/api/bg/rate/' + this.row.id
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
