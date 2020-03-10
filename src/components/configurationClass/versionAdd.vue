<template>
  <div>
    <el-dialog
      :title="payzhifu"
      :visible.sync="dialogFormVisible"
      width="600px"
      :before-close="handleClose"
      @close="cancel"
    >
      <el-form :model="form" label-position="left" enctype="multipart/form-data">
        <el-col :span="24">
          <el-form-item label="平台" label-width="100px">
            <el-select v-model="form.platform" placeholder="请选择" style="width:400px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="版本号" label-width="100px">
            <el-input v-model="form.versionNo" style="width:400px" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="安装包" label-width="100px">
            <el-upload
              :http-request="uploadSectionFile"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否必须升级" label-width="100px">
            <el-switch v-model="form.status" />
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editVersion">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getVersionCountAll } from '../../service/bg'
export default {
  name: 'VersionAdd',
  data() {
    return {
      row: {},
      loading: {
        isshow: false
      },
      options: [{
        label: 'Android', value: 1
      },
      {
        label: 'IOS', value: 2
      }],
      dialogFormVisible: false,
      form: {
        id: '',
        platform: '',
        versionNo: '',
        status: '',
        file: ''
      }
    }
  },
  mounted() {
    this.showDialog()
    console.log('test')
  },
  methods: {
    uploadSectionFile(param) {
      this.form.file = param.file
    },
    confirm() {
      this.editVersion()
    },
    cancel() {
      this.$router.push('/configurationClass/version')
    },
    showDialog() {
      setTimeout(() => {
        this.dialogFormVisible = true
      }, 1)
    },
    editVersion() {
      event.preventDefault()
      this.form.status = this.form.statu === true ? 1 : 2
      const formData = new FormData()
      if (this.form.id != null && this.form.id !== '') {
        formData.append('id', this.form.id)
      }
      formData.append('platform', this.form.platform)
      formData.append('versionNo', this.form.versionNo)
      formData.append('status', this.form.status)
      formData.append('file', this.form.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.loading.isshow = true
      this.$post('/api/bg/version/', formData, config)
          .then(res => {
            console.log(res)
            this.$message('添加成功')
            getVersionCountAll(this.$route.params.self)
            this.cancel()
          }).finally(() => {
            this.loading.isshow = false
          })
    }
  }
}
</script>

<style scoped>

</style>

