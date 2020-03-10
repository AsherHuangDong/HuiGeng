<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="120px" style="margin-left:150px">
      <VueEditor
        v-model="content"
        style="width:900px;height:auto;"
        @image-added="handleImageAdded"
      />
      <br>
      <br>
      <el-button type="primary" style="margin-left:100px" @click="editDescription">保存</el-button>
      <el-button style="margin-left:70px" @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: 'ProjectIntroductionConfigurationEdit',
  components: { VueEditor },
  data() {
    return {
      content: '',
    }
  },
  mounted() {
    this.content = this.$route.params.content
  },
  methods:{
    editDescription() {
        const self = this
        let form = new FormData()
        form.append('projectDesc', self.content)
        // form.append('url', 'http://app-bg.justfollow.vip/#/webpage')
        form.append('url', 'http://admin.huigen.talkingcake.cn/#/webpage')
        this.$put('/api/bg/projectDesc', form).then(res => {
          console.log('/api/bg/projectDesc', res)
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.cancel()
        })
    },
    cancel() {
      this.$router.push('/operationClass/projectIntroductionConfiguration')
    }
  }
}
</script>

<style scoped>

</style>
