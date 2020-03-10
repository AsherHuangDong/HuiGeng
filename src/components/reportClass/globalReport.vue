<template>
  <div class="box">
    <div class="row">
      <div class="col1">
        <div class="title">
          <span class="left">用户</span>
        </div>
        <div class="content">
          <div class="block1">
            <div class="qiu">
              <div class="text">
                <span>
                  <b>{{ ordercount }}</b>
                </span>
                <br>
                <span>APP安装总数</span>
              </div>
            </div>
            <div class="qiu">
              <div class="text">
                <span>
                  <b>{{ usercount }}</b>
                </span>
                <br>
                <span>用户总数</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col2">
        <div class="nav">
          <span
            class="item1"
            @click="show1"
          >策略</span>
        </div>
        <div class="content">
          <div
            class="block1"
          >
            <div class="qiu">
              <div class="text">
                <span>
                  <b>{{ ordercount }}</b>
                </span>
                <br>
                <span>总订单数量</span>
              </div>
            </div>
            <div class="qiu">
              <div class="text">
                <span>
                  <b>{{ failordercount }}</b>
                </span>
                <br>
                <span>未成功订单数量</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <br>
    <div
      lang="scss"
      class="row"
    >
      <div class="col1">
        <div class="title">
          <span class="left">销售</span>
        </div>
        <div class="content">
          <p class="p">
            <span>会员等级</span>
            <span class="right">会员数量</span>
          </p>
          <p
            v-for="(item,index) in sellList"
            :key="index"
            class="p"
          >
            <span style="margin-left:15px">{{ item.memberName }}</span>
            <span
              class="right"
              style="margin-right:20px"
            >{{ item.count }}</span>
          </p>
        </div>
      </div>
      <div class="col2">
        <div class="title">
          <span class="left">OTC</span>
        </div>
        <div class="content">
          <p class="p">
            <span>总订单数量</span>
            <span class="right">{{ ordercount }}</span>
          </p>
          <p
            v-for="(item,index) in OTCList"
            :key="index"
            class="p"
          >
            <span>{{ item.coinSymbol }} 交易额</span>
            <span
              class="right"
              style="margin-left:10px"
            >{{ item.price }}</span>
          </p>
          <p class="p">
            <span>未成功订单数量</span>
            <span class="right">{{ failordercount }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllStrategy } from '../../service/bg'
export default {
  data() {
    return {
      activeName: 'second',
      usercount: '',
      ordercount: '',
      failordercount:'',
      sellList: [],
      OTCList:[],
      getAllStrategyParams: {
        current: 1,
        size: 10
      }
    }
  },
  mounted() {
    this.userCount()
    this.orderCount()
    this.failOrderCount()
    this.getAllSell()
    this.getOTCList()
  },
  methods: {
    show1() {
      this.isshowqiu = true
      this.isshowlist = false
    },
    userCount() {
      const url = '/api/bg/report/userCount'
      this.$get(url).then(res => {
        console.log(url, res)
        this.usercount = res.data.count
      })
    },
    orderCount() {
      const url = '/api/bg/report/orderCount'
      this.$get(url).then(res => {
        console.log(url, res)
        this.ordercount = res.data.count
      })
    },
    failOrderCount() {
      const url = '/api/bg/report/failOrderCount'
      this.$get(url).then(res => {
        console.log(url, res)
        this.failordercount = res.data.count
      })
    },
    getAllSell() {
      const url = '/api/bg/report/memberCount'
      this.$get(url).then(res => {
        console.log(url, res)
        this.sellList = res.data.info
      })
    },
    getOTCList() {
      const url = '/api/bg/report/coinSymbolPrice'
      this.$get(url).then(res => {
        console.log(url, res)
        this.OTCList = res.data.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 100px;
  .row {
    width: 100%;
    display: flex;
    .content {
      margin-top: 25px;
      .p {
        position: relative;
        padding: 0 150px;
        span {
          padding-left: 0 10px;
        }
        .right {
          position: absolute;
          right: 150px;
        }
      }
    }
    .block1 {
      display: flex;
      margin: 10px 5%;
      .qiu {
        margin: 20px 40px;
        width: 179px;
        height: 179px;
        border: 1px solid #aaa;
        border-radius: 100px;
        text-align: center;
        .text {
          padding-top: 60px;
        }
      }
    }
    .title {
      position: relative;
      height: 40px;
      .left {
        position: absolute;
        top: 20px;
        left: 5%;
      }
      .right {
        position: absolute;
        top: 20px;
        right: 5%;
      }
    }
    .nav {
      position: relative;
      height: 40px;
      .item1 {
        position: absolute;
        top: 20px;
        left: 5%;
      }
      .right {
        position: absolute;
        top: 20px;
        right: 5%;
      }
    }
    .col1 {
      flex: 1;
      background: #ddd;
    }
    .col2 {
      flex: 1;
      background: #ddd;
      margin-left:20px;
    }
  }
}
</style>
