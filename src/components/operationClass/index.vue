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
          path: '/operationClass/activeConfiguration',
          name: '活动&banner配置'
        },
        {
          path: '/operationClass/projectIntroductionConfiguration',
          name: '项目介绍配置'
        },
        {
          path: '/operationClass/announcementConfiguration',
          name: '公告配置'
        },
        {
          path: '/operationClass/otcOrderManagement',
          name: 'OTC订单管理'
        },
        {
          path: '/operationClass/specifyUserRecharge',
          name: '向指定用户充值Token'
        },
        {
          path: '/operationClass/openMembership',
          name: '开通会员资格'
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
