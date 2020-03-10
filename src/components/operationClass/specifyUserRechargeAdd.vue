<template>
  <div>
    <el-dialog title="向指定用户充值Token" :visible.sync="dialogFormVisible" :before-close="cancel" width="500px">
      <el-form ref="form" :model="form" label-width="100px" status-icon :rules="rules">
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="userPhone">
          <el-input v-model="form.userPhone" style="width:300px" />
        </el-form-item>
        <el-form-item label="转入金额" :label-width="formLabelWidth">
          <el-input v-model="form.toPrice" style="width:300px">
            <i slot="suffix">USDT</i>
          </el-input>
        </el-form-item>
        <el-form-item label="奖励数量" :label-width="formLabelWidth">
          <el-input v-model="form.rewardNum" type="number" style="width:200px" autocomplete="off" />&nbsp;&nbsp;
          <el-select v-model="form.coinId" placeholder="请选择" style="width:90px">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.coinSymbol"
              :value="item.id"
              align="center"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="editRate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'GlobalRate',
  data() {
    var validatePass = (rule, value, callback) => {
      const url = '/api/bg/memberQuali/user/' + this.form.userPhone 
      this.$get(url).then(res => {
        console.log('/api/bg/memberQuali/user/', res)
        if(res.code == 600) {
          callback(new Error('用户不存在'));
        } else {
          callback();
        }
      })
    };
    const self = this
    return {
      rules: {
      userPhone: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      options:[],
      dialogFormVisible: false,
      form: {
        userPhone: '',
        toPrice: '',
        rewardNum: '',
        coinId: '',
      }
    }
  },
  mounted() {
    this.showDialog()
    this.getAllCurrency()
  },
  methods: {
    editRate() {
      const url = '/api/bg/userRecharge'
      console.log('this.form', this.form)
      this.$post(url, this.form).then(res => {
        console.log(url, res)
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.cancel()
      })
    },
    getAllCurrency() {
      const url = '/api/bg/userRecharge/coins'
      this.$get(url).then(res => {
        console.log(url, res)
        this.options = res.data.info
      })
    },
    cancel() {
      this.$router.push('/operationClass/specifyUserRecharge')
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
