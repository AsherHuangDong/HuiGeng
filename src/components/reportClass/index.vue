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
          path: '/reportClass/globalReport',
          name: '全局报告'
        },
        {
          path: '/reportClass/userView',
          name: '用户查看'
        },
        {
          path: '/reportClass/salesStatusOfMembership',
          name: '会员资格销售情况查看'
        },
        {
          path: '/reportClass/membershipDistribution',
          name: '会员资格分销情况查看'
        },
        {
          path: '/reportClass/summaryOfAward',
          name: '奖励概要'
        },
        {
          path: '/reportClass/strategyUsageProfile',
          name: '策略使用概况'
        },
        {
          path: '/reportClass/dayReconciliation',
          name: '系统日对账'
        },
        {
          path: '/reportClass/monthReconciliation',
          name: '系统月对账'
        },
        {
          path: '/reportClass/userReconciliation',
          name: '单用户对账'
        },
        {
          path: '/reportClass/userStatusProfile',
          name: '用户状态概要/详情'
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
