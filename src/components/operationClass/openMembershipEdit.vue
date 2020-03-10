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
              <el-select v-model="form.memberId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  align="center"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="现金钱包奖励" :label-width="formLabelWidth">
              <el-input v-model="obj.rewardNum" style="width:300px">
                <i slot="suffix">USDT</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="奖励钱包奖励" :label-width="formLabelWidth">
              <el-input v-model="obj.rewardNum2" style="width:300px">
                <i slot="suffix">JFC</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="form.memberId=='1'">
          <el-col :span="24">
            <el-form-item label="每日解锁比例" :label-width="formLabelWidth">
              <el-input v-model="obj.rewardDayMole" style="width: 100px" />&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;<el-input v-model="obj.rewardDayDeno" style="width: 100px" />
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
              />
              &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
              <el-date-picker
                v-model="form.memberEndTime"
                type="date"
                placeholder="选择日期"
                style="width: 200px"
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
      memberName:'',
      options: [{
          value: '1',
          label: '玄奘'
        }, {
          value: '2',
          label: '悟空'
        }, {
          value: '3',
          label: '悟能'
        }, {
          value: '4',
          label: '悟净'
        }, {
          value: '5',
          label: '普通用户'
      }],
      rules: {
      phone: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      row: {},
      dialogFormVisible: false,
      obj: {
        rewardNum: '',
        rewardNum2: '',
        rewardDayMole: '1',
        rewardDayDeno: '365',
      },
      form: {
        phone: '',
        memberId: '',
        rewardDayMole: '',
        rewardDayDeno: '',
        memberStartTime: '',
        memberEndTime: ''
      },
      ischeck: false,
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.row = this.$route.params.row
    this.memberName = this.$route.params.row.memberName
    this.form.phone = this.$route.params.row.phone
    this.obj.rewardNum = this.$route.params.row.rewardNum
    this.obj.rewardNum2 = this.$route.params.row.rewardNum2
    this.obj.rewardDayMole = this.$route.params.row.rewardDayMole
    this.obj.rewardDayDeno = this.$route.params.row.rewardDayDeno
    this.form.memberStartTime = this.$route.params.row.memberStartTime
    this.form.memberEndTime = this.$route.params.row.memberEndTime
    setTimeout(() => {
      this.dialogFormVisible = true
    }, 1)
  },
  methods: {
    confirm() {
      if(this.form.memberId == 1) {
        this.form.rewardDayMole = this.obj.rewardDayMole
        this.form.rewardDayDeno = this.obj.rewardDayDeno
      } else {
         delete this.form.rewardDayMole
         delete this.form.rewardDayDeno
      }
      this.form.memberStartTime = this.$moment(this.form.memberStartTime).format("YYYY-MM-DD HH:mm:ss")
      this.form.memberEndTime = this.$moment(this.form.memberEndTime).format("YYYY-MM-DD HH:mm:ss")
      this.$put('/api/bg/memberQuali/updateMember', this.form).then(res => {
        console.log('/api/bg/bankAccount', res)
        if(res.code == 100) {
          this.$message({
          message: '编辑成功',
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
