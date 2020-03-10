<template>
  <div class="box">
    <el-button
      type="primary"
      style="margin:20px 0"
      @click="add"
    >新增版本</el-button>
    <el-table
      :data="versionList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        width="180"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="platform"
        label="平台"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.platform == '1'?'Android':'IOS' }}</span>
        </template></el-table-column>
      <el-table-column
        prop="versionNo"
        label="版本号"
      />
      <el-table-column
        prop="apkName"
        label="安装包文件名"
      />
      <el-table-column
        property="status"
        label="是否必须升级"
        align="center"
      >
        <template slot-scope="scope">{{ scope.row.status === 1 ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column
        prop="uploadTime"
        label="上传更新时间"
      >
        <template slot-scope="scope">
          <span>{{ $moment(scope.row.uploadTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="edit(scope.row)"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="del(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <router-view />
  </div>
</template>

<script>
import { getVersionCountAll } from '../../service/bg'
export default {
  data() {
    return {
      versionList: [],
      options: [],
      form: {},
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      tableData: []
    }
  },
  mounted() {
    this.getVersionCountAll()
  },
  methods: {
    getVersionCountAll() {
      getVersionCountAll(this)
    },
    add() {
      const self = this
      this.$router.push({ name: '/configurationClass/versionAdd', params: { self: self }})
    },
    edit(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/versionEdit', params: { row: row, self: self }})
    },
    del(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/versionDelete', params: { row: row, self: self }})
    }
  }
}
</script>

<style scoped>
</style>
