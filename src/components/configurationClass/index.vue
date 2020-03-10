<template>
  <div>
    <el-container style="height: 100%">
      <el-aside width="200px" style="background-color:#f5f5f5;height: 100%">
        <el-menu
          router
          default-active=""
          class="el-menu-vertical-demo"
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
          path: '/configurationClass/global',
          name: '全局配置'
        },
        {
          path: '/configurationClass/strategy',
          name: '策略配置'
        },
        {
          path: '/configurationClass/paymentAccount',
          name: 'OTC收款账号配置'
        },
        {
          path: '/configurationClass/membership',
          name: '会员资格配置'
        },
        {
          path: '/configurationClass/registrationReward',
          name: '注册奖励配置'
        },
        {
          path: '/configurationClass/distributionReward',
          name: '分销奖励配置'
        },
        {
          path: '/configurationClass/version',
          name: '版本配置'
        },
        {
          path: '/configurationClass/simulationAccount',
          name: '模拟账户配置'
        },
        {
          path: '/configurationClass/permissionsRole',
          name: '角色配置'
        },
        {
          path: '/configurationClass/permissionsStaff',
          name: '人员配置'
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
