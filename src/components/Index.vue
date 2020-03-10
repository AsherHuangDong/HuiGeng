<template>
  <div>
    <el-container>
      <el-header style="padding: 0;background-color:#545c64;width: 100%;">
        <el-row>
          <el-col :span="10" :offset="8">
            <el-menu
              router
              :default-active="'/configurationClass'"
              class="el-menu-demo"
              mode="horizontal"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
            >
              <el-menu-item v-for="item in menu" :key="item.path" :index="item.path">{{ item.item }}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <div style="color:#fff;margin-top:20px;cursor:pointer" @click="loginout">
              退出登录
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container :style="{height: height + 'px', background: '#fff'}">
        <router-view />
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      menu: [
        {
          index: 1,
          item: '配置类',
          path: '/configurationClass'
        },
        {
          index: 2,
          item: '报告类',
          path: '/reportClass'
        },
        {
          index: 3,
          item: '运营类',
          path: '/operationClass'
        },
        {
          index: 4,
          item: '审核类',
          path: '/auditClass'
        },
        {
          index: 5,
          item: '资产管理类',
          path: '/assetManagementClass'
        }
      ]
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
    },
    width: {
      get() {
        return this.$store.getters['index/getWidth'] + 200
      },
      set(value) {
        this.$store.commit('index/setWidth', value)
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
    loginout(){
      localStorage.setItem('token', null)
      this.$router.push('/login')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    computedScreen() {
      // 自动计算宽高
      const height = document.documentElement.clientHeight - 60
      const width = document.documentElement.clientWidth - 200
      this.$store.commit('index/setHeight', height)
      this.$store.commit('index/setWidth', width)
    }
  }
}
</script>

<style scoped>

</style>
