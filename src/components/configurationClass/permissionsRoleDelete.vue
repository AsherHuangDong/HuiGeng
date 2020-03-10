<template>
  <div>
    <el-dialog
      title="是否删除该角色"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
      :before-close="cancel"
    >
      <div style="text-align: center;">
        <span>删除角色后，与该角色关联的人员将被禁用</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" @click="deleteRole">删 除</el-button>
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
        deleteRole: false
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
      this.$router.push('/configurationClass/strategy')
    },
    showDialog() {
      setTimeout(() => {
        this.dialogFormVisible = true
      }, 1)
    },
    deleteRole() {
      this.loading.deleteRole = true
      this.$post('/api/role/deleteRole')
        .then(res => {
          console.log(res)
        }).finally(() => {
          this.loading.deleteRole = false
        })
    }
  }
}
</script>

<style scoped>

</style>
