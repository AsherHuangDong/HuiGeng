<template>
  <div>
    <el-dialog
      title="现金资产详情"
      :visible.sync="dialogFormVisible"
      :before-close="cancel"
      width="680px"
    >
      <el-form
        :model="form"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="用户ID："
              :label-width="formLabelWidth"
            >
              <span>{{ userId }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="用户名："
              :label-width="formLabelWidth"
            >
              <span>{{ userName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="手机号："
              :label-width="formLabelWidth"
            >
              <span>{{ phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              align="center"
            >
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column
              prop="coinSymbol"
              label="币种"
            />
            <el-table-column
              prop="lockBalance"
              label="冻结金额"
            />
            <el-table-column
              prop="normalBalance"
              label="可用金额"
            />
            <el-table-column
              prop="linkBalance"
              label="链上余额"
            />
          </el-table>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getWithdrawRw } from '../../service/bg'
export default {
  name: 'GlobalQuota',
  data() {
    const self = this
    return {
      row: {},
      tableData: [],
      dialogFormVisible: false,
      userId: '',
      userName: '',
      phone: '',
      remark: ''
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.userId = this.row.userId
    console.log('row', this.row)
    this.getCash()
    this.showDialog()
  },
  methods: {
    getCash() {
     const url =
        "/api/bg/userAssetsCat/cashWalletInfo/" + this.userId
      this.$get(url).then(res => {
        console.log(url, res);
        if (res.msg === "未查询到数据") {
          this.$message(res.msg);
          this.tableData = null;
        } else {
          this.userName = res.data.info.userName;
          this.phone = res.data.info.phone;
          this.tableData = res.data.info.cashWallet;
        }
      });
    },
    cancel() {
      this.$router.push('/assetManagementClass/assetView')
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
