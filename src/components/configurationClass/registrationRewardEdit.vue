<template>
  <div>
    <el-dialog title="修改奖励数量" :visible.sync="dialogTableVisible" :before-close="cancel" width="400px" :close-on-click-modal="false">
      <el-form label-width="80px" :model="form">
        <el-form-item label="推荐类型">
          <template>
            <span>{{ row.recoType === 1?'直接推荐':'间接推荐' }}</span>
          </template>
        </el-form-item>
        <el-form-item label="奖励数量">
          <el-input
            v-model="form.rewardNum"
            type="number"
            style="width:200px"
          >
            <i slot="suffix" style="margin-right: 8px;">LB</i>
          </el-input>
        </el-form-item>
      </el-form>
      <br>
      <el-row :gutter="10">
        <el-col :span="4" :offset="6"><el-button type="default" @click="cancel">取消</el-button></el-col>
        <el-col :span="4" :offset="2"><el-button type="primary" @click="confirm">确定</el-button></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { RegistrationList } from '../../service/bg'
export default {
  name: 'RegistrationRewardEdit',
  data() {
    return {
      row: {},
      form: {
        id: '',
        recoType: '',
        rewardNum: '',
        rewardType: ''
      },
      dialogTableVisible: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.dialogTableVisible = true
    }, 1)
    this.row = this.$route.params.row
    this.form.id = this.row.id
    this.form.recoType = this.row.recoType
    this.form.rewardNum = this.row.rewardNum
    this.rewardType = 1
    this.getReward()
  },
  methods: {
    confirm() {
      this.$put('/api/bg/reward', this.form).then(res => {
        console.log('/api/bg/reward/', res)
        this.$message('编辑成功')
        RegistrationList(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/registrationReward')
    }
  }
}
</script>

<style scoped>

</style>
