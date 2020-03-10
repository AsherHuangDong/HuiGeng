<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="4">
        <el-form ref="form" :model="roleName" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" />
          </el-form-item>
          <el-form-item label="角色说明">
            <el-input v-model="form.roleDesc" type="textarea" />
          </el-form-item>
          <el-form-item label="分配权限">
            <el-tree
              ref="tree"
              :data="data"
              show-checkbox
              node-key="permId"
              :default-checked-keys="form.permId"
              :props="defaultProps"
              style="margin-top:5px;"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading.onSubmit" @click="onSubmit">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { permList } from '../../config/permList'
export default {
  name: 'PermissionsRoleEdit',
  data() {
    return {
      loading: {
        onSubmit: false
      },
      row: {},
      data: permList(),
      form: {
        roleName: '',
        roleDesc: '',
        permId: []
      }
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.getRole()
  },
  methods: {
    getRole() {
      this.$post('/api/role/getRole', { roleId: this.row.roleId })
        .then(res => {
          console.log('/api/role/getRole', res)
        })
    },
    onSubmit() {
      console.log('submit!')
      console.log(this.$refs.tree.getHalfCheckedKeys())
      console.log(this.$refs.tree.getCheckedKeys())
      console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
      this.form.permId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.loading.onSubmit = true
      this.$post('/api/role/updateRole', this.form)
        .then(res => {
          console.log('/api/role/updateRole', res)
        }).finally(() => {
          this.loading.onSubmit = false
        })
    },
    cancel() {
      this.$router.push('/configurationClass/permissionsRole')
    }
  }
}
</script>

<style scoped>

</style>
