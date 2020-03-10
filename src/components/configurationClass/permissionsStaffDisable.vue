<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>确定要禁用该人员么</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PermissionsStaffDisable',
  data() {
    return {
      title: '禁用人员',
      dialogFormVisible: false,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.showDialog()
  },
  methods: {
    confirm() {
      this.$post('/api/admin/updateAdminStatus')
        .then(res => {
          console.log(res)
        })
    },
    cancel() {
      this.$router.push('/configurationClass/permissionsStaff')
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
