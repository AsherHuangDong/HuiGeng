<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <el-button type="primary" @click="configEdit(content)">编辑</el-button>
          <br>
          <br>
          <br>
          <div v-html="content" />
          <!-- <el-row :gutter="12">
            <el-col :span="14" :offset="10">
              <el-pagination
                background
                :current-page="getAllStrategyParams.current"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handleCurrentChange"
              /></el-col>
          </el-row> -->
        </el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script>
import { allBanner } from '../../service/bg'
export default {
  data() {
    return {
      content:''
    }
  },
  mounted() {
    this.getDescription()
  },
  methods: {
    handleCurrentChange(value) {
      this.getAllStrategyParams.current = value
      this.getDescription()
    },
    getDescription() {
      this.$get('/api/bg/projectDesc/all').then(res => {
        console.log(res.data)
        this.content = res.data.info[0].projectDesc
      })
    },
    configEdit(content) {
      const self = this
      this.$router.push({ name: '/operationClass/projectIntroductionConfigurationEdit', params: { content:content }})
    }
  }
}
</script>

<style scoped>

</style>