<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="15" :offset="3">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px" class="demo-ruleForm">
          <el-form-item label="昵称(系统名)" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="文字说明" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item label="人员角色" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="登录密码" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="人员状态" prop="delivery">
            <el-switch
              v-model="ruleForm.delivery"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading.submitForm" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="back">返回</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PermissionsStaffEdit',
  data() {
    return {
      row: {},
      loading: {
        submitForm: false
      },
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
  },
  methods: {
    back() {
      this.$router.push('/configurationClass/permissionsStaff')
    },
    addAdmin() {
      this.loading.submitForm = true
      this.$post('/api/admin/updateAdmin', this.ruleForm)
        .then(res => {
          console.log('/api/admin/updateAdmin', res)
        }).finally(() => {
          this.loading.submitForm = false
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.addAdmin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
