<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">提币配置</span><br><br>
          <!-- <el-table
            :data="tableData1"
            border
            style="width: 100%"
          > -->
          <el-table
            :data="tableData"
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
              prop="coinSymbol"
              label="币种"
              width="180"
            />
            <el-table-column
              prop="startPrice"
              label="起提金额"
            />
            />
            <el-table-column
              prop="auditLimit"
              label="审核限额"
            />
            <el-table-column
              prop="tranRate"
              label="提币手续费"
            />
            <el-table-column
              prop="address"
              label="开放状态"
            >
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.vstatus"
                  @change="stopMention(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="380"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="changeQuota(scope.row)">修改限额</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="changeStart(scope.row)">修改起提金额</el-button>&nbsp;&nbsp;
                <el-button type="text" size="small" @click="changeTranRate(scope.row)">修改提币手续费</el-button>&nbsp;&nbsp;
                <el-button v-if="scope.row.status === 2" type="text" size="small" @click="stopMention(scope.row)">暂停提币</el-button>
                <el-button v-if="scope.row.status === 1" type="text" size="small" @click="stopMention(scope.row)">恢复提币</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page.sync="withDrawAllParams.current"
            :page-sizes="[10,20,30,40]"
            :page-size="withDrawAllParams.size"
            layout="sizes, prev, pager, next"
            :total="withDrawAllParams.total"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">OTC费率配置</span><br><br>
          <!-- <el-table
            :data="tableData2"
            border
            style="width: 100%"
          > -->
          <el-table
            :data="tableData"
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
              prop="coinSymbol"
              label="币种"
              width="180"
            />
            <el-table-column
              prop="userInRate"
              label="用户买入费率"
            ><template slot-scope="scope">
              <span>{{ scope.row.userInRate + '%' }}</span>
            </template></el-table-column>
            <el-table-column
              prop="userOutRate"
              label="用户卖出费率"
            ><template slot-scope="scope">
              <span>{{ scope.row.userOutRate + '%' }}</span>
            </template></el-table-column>
            <el-table-column
              prop="address"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="changeRate(scope.row)">修改费率</el-button>&nbsp;&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">归集地址配置</span><br><br>
          <!-- <el-table
            :data="tableData2"
            border
            style="width: 100%"
          > -->
          <el-table
            :data="tableData"
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
              prop="coinSymbol"
              label="币种"
              width="180"
            />
            <el-table-column
              prop="address"
              label="地址"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="changeAdress(scope.row)">修改地址</el-button>&nbsp;&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="never">
          <span style="font-weight: bold">订单有效期配置</span>
          <br>
          <br>
          <div class="youxiaoqi">
            <div class="title">OTC订单付款有效期：{{ validityPeriod }}</div>
            <el-button type="primary" class="cont" @click="changeValidityPeriod(validityPeriod,validityPeriodid)">修改</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <router-view />
    <el-dialog title="修改费率" :visible.sync="dialogFormVisible2" width="400px">
      <el-form :model="form">
        <el-form-item label="币种" label-width="80px">
          <div>BTC</div>
        </el-form-item>
        <el-form-item label="买入费率" label-width="80px">
          <el-input v-model="input" placeholder="请输入内容" style="width:200px" />%
        </el-form-item>
        <el-form-item label="卖出费率" label-width="80px">
          <el-input v-model="input" placeholder="请输入内容" style="width:200px" />%
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { withDrawAll, globalConfigList } from '../../service/bg'
export default {
  name: 'Global',
  data() {
    return {
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      withDrawAllParams: {
        current: 1,
        size: 10,
        total: 0
      },
      otcListParams: {
        current: 1,
        size: 10,
        total: 0
      },
      globalConfigParams: {
        current: 1,
        size: 10,
        total: 0
      },
      rateAllParams: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      tableData1: [],
      tableData2: [],
      validityPeriod:'',
      validityPeriodid:''
    }
  },
  mounted() {
    // this.withDrawAll()
    this.getData()
    this.getValidityPeriod()
  },
  methods: {
    handleSizeChange1(value) {
      this.withDrawAllParams.size = value
      this.withDrawAllParams.current = 1
      this.withDrawAll()
    },
    handleCurrentChange1(value) {
      this.withDrawAllParams.current = value
      this.withDrawAll()
    },
    withDrawAll() {
      withDrawAll(this)
    },
    getData() {
      globalConfigList(this)
    },
    getValidityPeriod() {
      this.$get('/api/bg/orderValidConfig').then(res => {
        this.validityPeriod = res.data.info.time
        this.validityPeriodid = res.data.info.id
      })
    },
    changeQuota(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalQuota', params: { row: row, self: self }})
    },
    changeStart(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalWith', params: { row: row, self: self }})
    },
    stopMention(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalStop', params: { row: row, self: self }})
    },
    changeRate(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalRate', params: { row: row, self: self }})
    },
    changeTranRate(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalTranRate', params: { row: row, self: self }})
    },
    changeAdress(row) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalAdress', params: { row: row, self: self }})
    },
    changeValidityPeriod(validityPeriod,validityPeriodid) {
      const self = this
      this.$router.push({ name: '/configurationClass/globalValidityPeriod', params: { validityPeriod: validityPeriod,validityPeriodid:validityPeriodid, self: self }})
    }
  }
}
</script>

<style scoped>
.youxiaoqi{
  position: relative;
  height: 50px;
}
.title{
  position: absolute;
  left: 0;
  top: 5px;
}
.cont{
  position: absolute;
  right: 0;
  top: 5px;
}
</style>
