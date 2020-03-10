<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="background-color:#f5f5f5;height: 100%">
        <el-menu
          class="el-menu-vertical-demo"
          default-active=""
          router
          style="background-color:#f5f5f5;"
        >
          <el-menu-item v-for="item in route" :key="item.path" :index="item.path">
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main :style="{width: width + 'px', background: '#fff'}">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      route: [
        {
          path: '/auditClass/KYC',
          name: 'KYC审核'
        },
        {
          path: '/auditClass/retrievePassword',
          name: '找回支付密码审核'
        },
        {
          path: '/auditClass/withdraw',
          name: '提币审核'
        },
        {
          path: '/auditClass/OTC',
          name: 'OTC争议处理'
        }
      ]
    }
  },
  computed: {
    width: {
      get() {
        return this.$store.getters['index/getWidth']
      },
      set(value) {
        this.$store.commit('index/setWidth', value)
      }
    }
  }
}
</script>

<style scoped>

</style>
