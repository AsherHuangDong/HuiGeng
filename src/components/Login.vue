<template>
  <div id="loginDiv" :style="{height: height + 'px'}">
    <div id="header">
      <h2>会跟管理后台</h2>
    </div>
    <div id="contain">
      <div class="demo-input-suffix">
        <el-input
          v-model="loginParams.account"
          placeholder="账号"
        >
          <i slot="prefix" class="el-input__icon el-icon-user-solid" />
        </el-input>
        <br><br>
        <el-input
          v-model="loginParams.password"
          placeholder="密码"
          type="password"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock" />
        </el-input>
        <br><br>
        <el-button style="width:100%;" type="primary" @click="login">登录</el-button>
      </div>
    </div>
    <div id="footer">
      copyright@2019会跟
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginParams: {
        account: '',
        password: ''
      }
    }
  },
  computed: {
    height: {
      get() {
        return this.$store.getters['index/getHeight']
      },
      set(value) {
        this.$store.commit('index/setHeight', value)
      }
    }
  },
  mounted() {
    const _this = this
    this.computedScreen()
    window.onresize = function() {
      _this.computedScreen()
    }
  },
  methods: {
    login() {
      console.log(this.loginParams)
      this.$post('/api/admin/login', this.loginParams)
        .then(res => {
          console.log('/api/admin/login', res)
          if (res.data.code === 100) {
            console.log(res.data.data.token)
            localStorage.setItem('token', res.data.data.token)
            this.$router.push({ name: '/configurationClass/global' })
          }
        })
    },
    computedScreen() {
      // 自动计算宽高
      const height = document.documentElement.clientHeight
      this.$store.commit('index/setHeight', height)
    }
  }
}
</script>

<style scoped>
  #footer{
    position:absolute;
    text-align: center;
    color: #777;
    left: 50%;
    bottom: 10%;
    width: 200px;
    margin-left: -100px;
  }
  #header{
    position: absolute;
    left: 50%;
    top: 20%;
    text-align: center;
    width: 200px;
    margin-left: -100px;
  }
  h2{
    display: inline-block;
  }
  #contain{
    position: absolute;
    left: 50%;
    top: 55%;
    width: 400px;
    height: 300px;
    margin-top: -150px;
    margin-left: -200px;
  }
  #loginDiv{
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background: url("../assets/images/u14.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    width: 480px;
  }
</style>
