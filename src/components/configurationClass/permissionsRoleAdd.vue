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
            <el-button type="primary" @click="onSubmit">保存</el-button>
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
  name: 'PermissionsRoleAdd',
  data() {
    return {
      data: permList(),
      form: {
        roleName: '',
        roleDesc: '',
        permId: []
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      console.log(this.$refs.tree.getHalfCheckedKeys())
      console.log(this.$refs.tree.getCheckedKeys())
      console.log(this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()))
      this.form.permId = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.$post('/api/role/addRole', this.form)
        .then(res => {
          console.log(res)
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
