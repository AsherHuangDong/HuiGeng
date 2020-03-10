<template>
  <div class="box">
    <el-row>
      <el-col
        :span="23"
        :offset="1"
      >
        <div class="grid-content bg-purple-dark" />用户
        <el-input
          v-model="userSearch"
          placeholder="请输入用户Id或用户名"
          class="input-with-select"
          style="width:200px"
        />
        <el-button
          type="primary"
          @click="search"
        >搜索</el-button>
      </el-col>
    </el-row>
    
    <div v-if="JSON.stringify(tableData1) !== '[]'&&JSON.stringify(tableData2) !== '[]'&&tableData1!==null&&tableData2!==null">
      <el-row>
        <el-col
          :span="23"
          :offset="1"
        >
          <span>用户名：{{ userName }}</span>&nbsp;&nbsp;
          <span>用户ID：{{ userId }}</span>&nbsp;&nbsp;
          <span>伞下总用户数：{{ totalInviteNum }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="23"
          :offset="1"
        >
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              :label="directlyNum"
              name="first"
            >
              <el-table
                :data="tableData1"
                style="width: 100%"
              >
                <el-table-column
                  label="序号"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="用户ID"
                  align="center"
                />
                <el-table-column
                  prop="name"
                  label="用户名"
                  align="center"
                />
                <el-table-column
                  prop="phone"
                  label="手机号"
                  align="center"
                />
                <el-table-column
                  prop="memberName"
                  label="会员等级"
                  align="center"
                />
                <el-table-column
                  prop="directlyInvitePerNum"
                  label="直接推荐人数"
                  align="center"
                />
                <el-table-column
                  prop="indirectInvitePerNum"
                  label="间接推荐人数"
                  align="center"
                />
                <el-table-column
                  prop="registerTime"
                  label="注册时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ $moment(scope.row.registerTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                style="margin-top:20px;text-align:center"
                @current-change="handleCurrentChange1"
              />
            </el-tab-pane>
            <el-tab-pane
              :label="indirectNum"
              name="second"
            >
              <el-table
                :data="tableData2"
                style="width: 100%"
              >
                <el-table-column
                  label="序号"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="用户ID"
                  align="center"
                />
                <el-table-column
                  prop="name"
                  label="用户名"
                  align="center"
                />
                <el-table-column
                  prop="phone"
                  label="手机号"
                  align="center"
                />
                <el-table-column
                  prop="memberName"
                  label="会员等级"
                  align="center"
                />
                <el-table-column
                  prop="directlyInvitePerNum"
                  label="直接推荐人数"
                  align="center"
                />
                <el-table-column
                  prop="indirectInvitePerNum"
                  label="间接推荐人数"
                  align="center"
                />
                <el-table-column
                  prop="registerTime"
                  label="注册时间"
                  align="center"
                >
                  <template slot-scope="scope">
                    <span>{{ $moment(scope.row.registerTime).format("YYYY-MM-DD HH:mm:ss") }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                background
                layout="prev, pager, next"
                style="margin-top:20px;text-align:center"
                @current-change="handleCurrentChange2"
              />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div v-else class="tishi">
      支持按用户ID和用户名查询推荐关系
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesStatusOfMembership',
  data() {
    return {
      userName:'',
      userId:'',
      totalInviteNum:'',
      directlyNum:'',
      indirectNum:'',
      shijianduan: '',
      tableData1: [],
      tableData2: [],
      userSearch: '',
      type: 1,
      activeName:'first',
      pageParams: {
        current: 1,
        size: 10
      },
    }
  },
  mounted() {
  },
  methods: {
    handleCurrentChange1(value) {
      this.pageParams.current = value;
      this.getList1();
    },
    handleCurrentChange2(value) {
      this.pageParams.current = value;
      this.getList2();
    },
    search() {
      this.getList1()
      this.getList2()
    },
    getList1() {
      const p = new FormData()
      if (this.userSearch !== '') {
        p.append('userSearch', this.userSearch)
      }
      const url = '/api/bg/inviteInfoCat/search/1/' + this.pageParams.current + '/' + this.pageParams.size
      this.$post(url, p).then(res => {
        console.log(url, res)
        if (res.code === 100) {
          if (res.msg == "未查询到数据") {
            this.$message(res.msg)
            this.tableData1 = null
          } else {
            this.tableData1 = res.data.info.inviteInfoCats
            this.userName = res.data.info.userName
            this.userId = res.data.info.userId
            this.totalInviteNum = res.data.info.totalInviteNum
            this.directlyNum = '直接推荐人(' + res.data.info.directlyNum + ')'
            this.indirectNum = '间接推荐人(' + res.data.info.indirectNum + ')'
          }
        }
      })
    },
    getList2() {
      const p = new FormData()
      if (this.userSearch !== '') {
        p.append('userSearch', this.userSearch)
      }
      const url = '/api/bg/inviteInfoCat/search/2/' + this.pageParams.current + '/' + this.pageParams.size
      this.$post(url, p).then(res => {
        console.log(url, res)
        if (res.code === 100) {
          if (res.msg == "未查询到数据") {
            this.$message(res.msg)
            this.tableData2 = null
          } else {
            this.tableData2 = res.data.info.inviteInfoCats
            this.userName = res.data.info.userName
            this.userId = res.data.info.userId
            this.totalInviteNum = res.data.info.totalInviteNum
            this.directlyNum = '直接推荐人(' + res.data.info.directlyNum + ')'
            this.indirectNum = '间接推荐人(' + res.data.info.indirectNum + ')'
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.box {
  margin: 0 50px;
}
.el-row {
  margin-bottom: 20px;
}
.tishi {
 margin-left: 200px;
 margin-top: 150px;
}
</style>

