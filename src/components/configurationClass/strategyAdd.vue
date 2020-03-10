<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="120px" style="margin-left:150px">
      <el-form-item label="策略名称" style="margin-top:50px">
        <el-input v-model="form.strategyName" style="width:300px" />
      </el-form-item>
      <el-form-item label="文字简介">
        <el-input
          v-model="form.strategyDetail"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="适用交易所" style="margin-top:50px">
        <el-checkbox-group v-model="form.exchangeIdArr">
          <el-checkbox label="2">火币</el-checkbox>
          <el-checkbox label="1">OKEX</el-checkbox>
          <el-checkbox label="3">Bitfinex</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="适用品种" style="margin-top:50px">
        <el-checkbox-group v-model="transactionPairIds">
          <el-checkbox label="1">BTC</el-checkbox>
          <el-checkbox label="2">ETH</el-checkbox>
          <el-checkbox label="3">EOS</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="预计收益百分比" style="margin-top:50px">
        <el-input v-model="form.estimateBenefit" style="width:300px" />
      </el-form-item> -->
      <el-form-item label="策略启动费用" style="margin-top:50px">
        <el-input v-model="form.startCost" style="width:300px">
          <i slot="suffix">LB</i>
        </el-input>
      </el-form-item>
      <el-form-item label="最少保证金" style="margin-top:50px">
        <span v-show="!transactionPairIds.length">请先选择使用品种</span>
        <div v-show="transactionPairIds.length">
          <span v-show="transactionPairIds.indexOf('1')!=-1">
            BTC
            <el-input v-model="baozhengjin1" style="width:100px" />
          </span>
          <span v-show="transactionPairIds.indexOf('2')!=-1">
            ETH
            <el-input v-model="baozhengjin2" style="width:100px" />
          </span>
          <span v-show="transactionPairIds.indexOf('3')!=-1">
            EOS
            <el-input v-model="baozhengjin3" style="width:100px" />
          </span>
        </div>
      </el-form-item>
      <el-form-item label="最大可承载资金" style="margin-top:50px">
        <span v-show="!transactionPairIds.length">请先选择使用品种</span>
        <div v-show="transactionPairIds.length">
          <span v-show="transactionPairIds.indexOf('1')!=-1">
            BTC
            <el-input v-model="chengzaijin1" style="width:100px" />
          </span>
          <span v-show="transactionPairIds.indexOf('2')!=-1">
            ETH
            <el-input v-model="chengzaijin2" style="width:100px" />
          </span>
          <span v-show="transactionPairIds.indexOf('3')!=-1">
            EOS
            <el-input v-model="chengzaijin3" style="width:100px" />
          </span>
        </div>
      </el-form-item>
      <el-button type="primary" style="margin-left:100px" @click="onSubmit">保存</el-button>
      <el-button style="margin-left:70px" @click="$router.push('/configurationClass/strategy')">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import { permList } from '../../config/permList'
export default {
  data() {
    return {
      data: permList(),
      textarea: '',
      checkList: [],
      baozhengjin1:'',
      baozhengjin2:'',
      baozhengjin3:'',
      chengzaijin1:'',
      chengzaijin2:'',
      chengzaijin3:'',
      transactionPairIds:[],
      form: {
        strategyName: '',
        strategyDetail: '',
        startCost: '',
        exchangeIdArr: [],
        // estimateBenefit: '',
        vtransactionPair: []
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('form', this.form)
      if (this.transactionPairIds.indexOf('1') !== -1) {
        this.form.vtransactionPair.push({
          transactionPairId: '1',
          name: 'BTC',
          minMargin: this.baozhengjin1,
          maxBearingCapital: this.chengzaijin1
        })
      }
      if (this.transactionPairIds.indexOf('2') !== -1) {
        this.form.vtransactionPair.push({
          transactionPairId: '2',
          name: 'ETH',
          minMargin: this.baozhengjin2,
          maxBearingCapital: this.chengzaijin2
        })
      }
      if (this.transactionPairIds.indexOf('3') !== -1) {
        this.form.vtransactionPair.push({
          transactionPairId: '3',
          name: 'EOS',
          minMargin: this.baozhengjin3,
          maxBearingCapital: this.chengzaijin3
        })
      }
      this.$post('/api/bg/strategy', this.form)
        .then(res => {
          console.log('/api/bg/strategy', res)
          this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/strategy')
    }
  }
}
</script>

<style scoped>

</style>
