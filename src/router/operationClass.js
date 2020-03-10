export default {
  // 运营类
  path: '/operationClass',
  name: '/operationClass',
  redirect: '/operationClass/activeConfiguration',
  component: resolve => require(['../components/operationClass/index'], resolve),
  children: [
    // 活动&banner配置
    {
      path: '/operationClass/activeConfiguration',
      name: '/operationClass/activeConfiguration',
      component: resolve => require(['../components/operationClass/activeConfiguration'], resolve),
    },
    // 活动添加
    {
      path: '/operationClass/activeConfigurationAdd',
      name: '/operationClass/activeConfigurationAdd',
      component: resolve => require(['../components/operationClass/activeConfigurationAdd'], resolve),
    },
    // 活动编辑
    {
      path: '/operationClass/activeConfigurationEdit',
      name: '/operationClass/activeConfigurationEdit',
      component: resolve => require(['../components/operationClass/activeConfigurationEdit'], resolve),
    },
    // 活动删除
    {
      path: '/operationClass/activeConfigurationDelete',
      name: '/operationClass/activeConfigurationDelete',
      component: resolve => require(['../components/operationClass/activeConfigurationDelete'], resolve),
    },
    // 活动上架、下架
    {
      path: '/operationClass/activeConfigurationStop',
      name: '/operationClass/activeConfigurationStop',
      component: resolve => require(['../components/operationClass/activeConfigurationStop'], resolve),
    },
    // 公告配置
    {
      path: '/operationClass/announcementConfiguration',
      name: '/operationClass/announcementConfiguration',
      component: resolve => require(['../components/operationClass/announcementConfiguration'], resolve),
    },
    // 公告配置添加
    {
      path: '/operationClass/announcementConfigurationAdd',
      name: '/operationClass/announcementConfigurationAdd',
      component: resolve => require(['../components/operationClass/announcementConfigurationAdd'], resolve),
    },
    // 公告配置编辑
    {
      path: '/operationClass/announcementConfigurationEdit',
      name: '/operationClass/announcementConfigurationEdit',
      component: resolve => require(['../components/operationClass/announcementConfigurationEdit'], resolve),
    },
    // 公告配置删除
    {
      path: '/operationClass/announcementConfigurationDelete',
      name: '/operationClass/announcementConfigurationDelete',
      component: resolve => require(['../components/operationClass/announcementConfigurationDelete'], resolve),
    },
    // 公告配置上架、下架
    {
      path: '/operationClass/announcementConfigurationStop',
      name: '/operationClass/announcementConfigurationStop',
      component: resolve => require(['../components/operationClass/announcementConfigurationStop'], resolve),
    },
    // 向指定用户充值Token
    {
      path: '/operationClass/specifyUserRecharge',
      name: '/operationClass/specifyUserRecharge',
      component: resolve => require(['../components/operationClass/specifyUserRecharge'], resolve),
    },
    // 向指定用户充值Token添加
    {
      path: '/operationClass/specifyUserRechargeAdd',
      name: '/operationClass/specifyUserRechargeAdd',
      component: resolve => require(['../components/operationClass/specifyUserRechargeAdd'], resolve),
    },
    // 向指定用户充值Token编辑
    {
      path: '/operationClass/specifyUserRechargeEdit',
      name: '/operationClass/specifyUserRechargeEdit',
      component: resolve => require(['../components/operationClass/specifyUserRechargeEdit'], resolve),
    },
    // OTC订单管理
    {
      path: '/operationClass/otcOrderManagement',
      name: '/operationClass/otcOrderManagement',
      component: resolve => require(['../components/operationClass/otcOrderManagement'], resolve),
    },
    // 卖单详情
    {
      path: '/operationClass/sellOrderDetails',
      name: '/operationClass/sellOrderDetails',
      component: resolve => require(['../components/operationClass/sellOrderDetails'], resolve),
    },
    // 开通会员资格
    {
      path: '/operationClass/openMembership',
      name: '/operationClass/openMembership',
      component: resolve => require(['../components/operationClass/openMembership'], resolve),
    },
    // 开通会员资格添加
    {
      path: '/operationClass/openMembershipAdd',
      name: '/operationClass/openMembershipAdd',
      component: resolve => require(['../components/operationClass/openMembershipAdd'], resolve),
    },
    // 开通会员资格编辑
    {
      path: '/operationClass/openMembershipEdit',
      name: '/operationClass/openMembershipEdit',
      component: resolve => require(['../components/operationClass/openMembershipEdit'], resolve),
    },
    // 项目介绍配置
    {
      path: '/operationClass/projectIntroductionConfiguration',
      name: '/operationClass/projectIntroductionConfiguration',
      component: resolve => require(['../components/operationClass/projectIntroductionConfiguration'], resolve),
    },
    // 项目介绍配置编辑
    {
      path: '/operationClass/projectIntroductionConfigurationEdit',
      name: '/operationClass/projectIntroductionConfigurationEdit',
      component: resolve => require(['../components/operationClass/projectIntroductionConfigurationEdit'], resolve),
    }
  ]
}
