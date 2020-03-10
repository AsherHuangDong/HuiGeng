<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="120px" style="margin-left:150px">
      <el-form-item label="策略" style="margin-top:50px">
        <el-select v-model="form.strategyId" placeholder="请选择">
          <el-option
            v-for="item in strategyList"
            :key="item.strategyId"
            :label="item.strategyName"
            :value="item.strategyId"
            align="center"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="历史收益">
        <el-input
          v-model="form.historyProfit"
          type="textarea"
          :rows="5"
          placeholder="按照“日期:收益值”格式填写，多个收益间使用换行分隔，如：2019-09-20:1.01"
          style="width:300px"
          @blur="drawLine"
        />
      </el-form-item>
      <el-form-item label="历史收益曲线">
        <div id="myChart" ref="myChart" :style="{width: '300px', height: '300px'}" />
      </el-form-item>
      <el-button type="primary" style="margin-left:100px" @click="onSubmit">保存</el-button>
      <el-button style="margin-left:70px" @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import { getAllStrategy } from '../../service/bg'
export default {
  name: 'SimulationAccountAdd',
  data() {
    return {
      strategyList: [],
      getAllStrategyParams: {
        current: 1,
        size: 10
      },
      form:{
        strategyId:'',
        historyProfit:''
      }
    }
  },
  mounted() {
    this.getAllStrategy()
  },
  methods:{
    drawLine(){
      let arr = this.form.historyProfit.split(/[\s\n]/)
      let x = []
      let y = []
      arr.forEach(element => {
        let temp = element.split(':')
        x.push(temp[0])
        y.push(temp[1])
      });
      console.log('this.form.historyProfit', this.form.historyProfit.split(/[\s\n]/))
      console.log('x' ,x)
      console.log('y' ,y)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          type: 'category',
          axisLabel: {
          interval: 0, // 横轴信息全部显示
          rotate: 30 // 30度角倾斜显示
          },
          data:x
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'line',
          data: y
        }]
      })
    },
    getAllStrategy() {
      // const url = '/api/bg/strategy/all/?current=' + this.getAllStrategyParams.current +
      //         '&size=' + this.getAllStrategyParams.size
      getAllStrategy(this)
    },
    onSubmit() {
      console.log(this.form,'this.form')
      this.$post('/api/bg/simuacc', this.form)
        .then(res => {
          console.log('/api/bg/simuacc', res)
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.cancel()
      })
    },
    cancel() {
      this.$router.push('/configurationClass/simulationAccount')
    }
  }
}
</script>

<style scoped>

</style>
