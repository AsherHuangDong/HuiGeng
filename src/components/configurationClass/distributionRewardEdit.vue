<template>
  <div>
    <el-dialog title="修改奖励数量" :visible.sync="dialogTableVisible" :before-close="cancel" width="400px" :close-on-click-modal="false">
      <el-form label-width="100px" :model="form">
        <el-form-item label="会员等级">
          <template>
            <span>{{ row.memberName }}</span>
          </template>
        </el-form-item>
        <el-form-item label="直接推荐奖励">
          <el-input
            v-model.number="form.zhi"
            type="number"
            style="width:200px"
          >
            <i slot="suffix" style="margin-right: 8px;">JFC</i>
          </el-input>
        </el-form-item>
        <el-form-item label="间接推荐奖励">
          <el-input
            v-model.number="form.jian"
            type="number"
            style="width:200px"
          >
            <i slot="suffix" style="margin-right: 8px;">JFC</i>
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
import { DistributionList } from '../../service/bg'
export default {
  name: 'DistributionRewardEdit',
  data() {
    return {
      row: {},
      form: {
        level: '',
        zhi: '',
        jian: ''
      },
      dialogTableVisible: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.dialogTableVisible = true
    }, 1)
    this.row = this.$route.params.row
    this.form.level=this.row.memberLevel
    this.form.zhi = this.row.rewardBum1
    this.form.jian = this.row.rewardBum2
  },
  methods: {
    confirm() {
      const p = new FormData()
      p.append('level', this.form.level)
      p.append('zhi', this.form.zhi)
      p.append('jian', this.form.jian)
      this.$post('/api/bg/distReward/update', p).then(res => {
        console.log('/api/bg/distReward/', res)
        this.$message('编辑成功')
        DistributionList(this.$route.params.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/distributionReward')
    }
  }
}
</script>

<style scoped>

</style>
