export default {
  // 资产管理类
  path: '/assetManagementClass',
  name: '/assetManagementClass',
  redirect: '/assetManagementClass/flowingWaterView',
  component: resolve => require(['../components/assetManagementClass/index'], resolve),
  children: [
    {
      path: '/assetManagementClass/flowingWaterView',
      name: '/assetManagementClass/flowingWaterView',
      component: resolve => require(['../components/assetManagementClass/flowingWaterView'], resolve),
    },
    {
      path: '/assetManagementClass/flowingWaterViewRemark',
      name: '/assetManagementClass/flowingWaterViewRemark',
      component: resolve => require(['../components/assetManagementClass/flowingWaterViewRemark'], resolve),
    },
    {
      path: '/assetManagementClass/assetView',
      name: '/assetManagementClass/assetView',
      component: resolve => require(['../components/assetManagementClass/assetView'], resolve),
    },
    {
      path: '/assetManagementClass/assetViewExchange',
      name: '/assetManagementClass/assetViewExchange',
      component: resolve => require(['../components/assetManagementClass/assetViewExchange'], resolve),
    },
    {
      path: '/assetManagementClass/assetViewCash',
      name: '/assetManagementClass/assetViewCash',
      component: resolve => require(['../components/assetManagementClass/assetViewCash'], resolve),
    },
    {
      path: '/assetManagementClass/chainAssetCollection',
      name: '/assetManagementClass/chainAssetCollection',
      component: resolve => require(['../components/assetManagementClass/chainAssetCollection'], resolve),
    }
  ]
}
