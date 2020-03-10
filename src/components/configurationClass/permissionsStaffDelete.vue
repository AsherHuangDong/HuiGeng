<template>
  <div>
    <el-dialog
      title="是否删除该人员"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>删除后数据无法恢复</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" :loading="loading.deleteAdmin" @click="deleteAdmin">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PermissionsRoleDelete',
  data() {
    return {
      row: {},
      loading: {
        deleteAdmin: false
      },
      dialogFormVisible: false,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.showDialog()
  },
  methods: {
    cancel() {
      this.$router.push('/configurationClass/permissionsStaff')
    },
    showDialog() {
      setTimeout(() => {
        this.dialogFormVisible = true
      }, 1)
    },
    deleteAdmin() {
      this.loading.deleteAdmin = true
      this.$post('/api/role/deleteAdmin', { adminId: this.row.adminId })
        .then(res => {
          console.log(res)
        }).finally(() => {
          this.loading.deleteAdmin = false
        })
    }
  }
}
</script>

<style scoped>

</style>
