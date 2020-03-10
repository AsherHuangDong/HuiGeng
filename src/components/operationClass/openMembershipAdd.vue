<template>
  <div>
    <el-dialog title="开通会员资格" :visible.sync="dialogFormVisible" :before-close="cancel">
      <el-form ref="form" :model="form" label-position="left" status-icon :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
              <el-input v-model="form.phone" style="width: 90%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="当前会员等级" :label-width="formLabelWidth">
              <span v-if="form.phone == ''">请先输入手机号</span>
              <span v-else>{{ memberName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="修改等级为" :label-width="formLabelWidth">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  label="玄奘"
                  value="1"
                  align="center"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="现金钱包奖励" :label-width="formLabelWidth">
              <el-input v-model="form.rewardNum" style="width:300px">
                <i slot="suffix">USDT</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="奖励钱包奖励" :label-width="formLabelWidth">
              <el-input v-model="form.rewardNum2" style="width:300px">
                <i slot="suffix">JFC</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="每日解锁比例" :label-width="formLabelWidth">
              <el-input v-model="form.rewardDayMole" style="width: 100px" />&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;<el-input v-model="form.rewardDayDeno" style="width: 100px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="会员有效期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.memberStartTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px"
                value-format="timestamp"
              />
              &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
              <el-date-picker
                v-model="form.memberEndTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px"
                value-format="timestamp"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBankCountAll } from '../../service/bg'
export default {
  name: 'PaymentAccountAddBankCard',
  data() {
    var validatePass = (rule, value, callback) => {
      const url = '/api/bg/memberQuali/user/' + this.form.phone 
      this.$get(url).then(res => {
        console.log('/api/bg/memberQuali/user/', res)
        if(res.code == 600) {
          callback(new Error('用户不存在'));
          this.memberName = ''
        } else {
          callback();
          this.memberName = res.data.info.memberName
        }
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
            
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      })
    };
    return {
      value: '',
      memberName:'',
      rules: {
      phone: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      row: {},
      dialogFormVisible: false,
      form: {
        phone: '',
        rewardNum:'15000',
        rewardNum2: '15000',
        rewardDayMole: '1',
        rewardDayDeno: '365',
        memberStartTime: '',
        memberEndTime: ''
      },
      ischeck: false,
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.row = this.$route.params.row
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    confirm() {
      this.form.memberStartTime = this.$moment(this.form.memberStartTime).format("YYYY-MM-DD HH:mm:ss")
      this.form.memberEndTime = this.$moment(this.form.memberEndTime).format("YYYY-MM-DD HH:mm:ss")
      this.$post('/api/bg/memberQuali/giveMember', this.form).then(res => {
        console.log('/api/bg/bankAccount', res)
        if(res.code == 100) {
          this.$message({
          message: '添加成功',
          type: 'success'
          });
        }
      }).finally(() => {
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/operationClass/openMembership')
    }
  }
}
</script>

<style scoped>

</style>
