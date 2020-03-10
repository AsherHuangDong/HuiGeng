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
          path: '/assetManagementClass/flowingWaterView',
          name: '充提币流水查看'
        },
        {
          path: '/assetManagementClass/assetView',
          name: '用户资产查看'
        }
        // {
        //   path: '/assetManagementClass/chainAssetCollection',
        //   name: '用户链上资产归集'
        // }
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
