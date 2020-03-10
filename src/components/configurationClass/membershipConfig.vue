<template>
  <div>
    <el-dialog :title="memberName" :visible.sync="dialogTableVisible2" :before-close="cancel">
      <el-table
        ref="multipleTable"
        :data="strategyList"
        tooltip-effect="dark"
        style="width: 100%"
        @select="handleSelection"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="序号"
          width="120"
          align="center"
        >
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="strategyName"
          label="策略"
          width="120"
          align="center"
        />
        <el-table-column
          prop="num"
          label="次数"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-show="scope.row.flag" v-model.number="scope.row.num" placeholder="请输入次数" style="width:150px" @blur="zhuijia1(scope.row.num)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="fund"
          label="资金规模"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input v-show="scope.row.flag" v-model.number="scope.row.fund" placeholder="请输入次数" style="width:150px" @blur="zhuijia2(scope.row.fund)" />
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-row :gutter="10">
        <el-col :span="4" :offset="8"><el-button type="default" @click="cancel">取消</el-button></el-col>
        <el-col :span="4"><el-button type="primary" @click="confirm">确定</el-button></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getAllMember } from '../../service/bg'
export default {
  name: 'MembershipConfig',
  data() {
    return {
      strategyList: [],
      getAllStrategyParams: {
        current: 1,
        size: 10
      },
      obj: {
        memberId:'',
        memberStrategies : []
      },
      memberName: '',
      row: {},
      dialogTableVisible2: false
    }
  },
  watch: {
    strategyList(n, o) {
      this.$nextTick(() => {
        this.strategyList.forEach(item => {
          if (item.flag) {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          }
        })
      })
    }
  },
  mounted() {
    this.row = this.$route.query.row
    console.log('this.row', this.row)
    this.getMember()
    setTimeout(() => {
      this.dialogTableVisible2 = true
    }, 1)
  },
  methods: {
    zhuijia1(num) {
      for (let index = 0; index < this.obj.memberStrategies.length; index++) {
        if (this.obj.memberStrategies[index].num == null) {
          this.$set(this.obj.memberStrategies[index], 'num', num);
        }
      }
    },
    zhuijia2(num) {
      for (let index = 0; index < this.obj.memberStrategies.length; index++) {
        if (this.obj.memberStrategies[index].fund == null) {
          this.$set(this.obj.memberStrategies[index], 'fund', num);
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
    },
    handleSelection(selection, row) {
      console.log('selection',selection)
      row.flag = !row.flag
      let memberStrategies = []
      selection.forEach(item => {
        memberStrategies.push({'strategyId':item.strategyId,'num':item.num,'fund':item.fund})
      })
      console.log('memberStrategies', memberStrategies)
      this.obj.memberStrategies = memberStrategies
    },
    confirm() {
      this.obj.memberId = this.row.memberId;
      console.log('obj', this.obj)
      if (this.obj.memberStrategies == false) {
        this.$message('请先选择要设置的策略');
      }
      this.$put('/api/bg/member/strategy',this.obj).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success'
        });
        getAllMember(this.$route.query.self)
        this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/membership')
    },
    getMember() {
      const url = '/api/bg/member/' + this.row.memberId
      this.$get(url).then(res => {
        console.log(url, res)
        this.strategyList = res.data.info
        console.log('this.strategyList', this.strategyList)
        this.memberName = '设置' + this.row.memberName + '会员资格'
      })
    }
  }
}
</script>

<style scoped>

</style>
