export default {
  // 报告类
  path: '/reportClass',
  name: '/reportClass',
  redirect: '/reportClass/globalReport',
  component: resolve => require(['../components/reportClass/index'], resolve),
  children: [
    {
      path: '/reportClass/globalReport',
      name: '/reportClass/globalReport',
      component: resolve => require(['../components/reportClass/globalReport'], resolve),
    },
    {
      path: '/reportClass/userView',
      name: '/reportClass/userView',
      component: resolve => require(['../components/reportClass/userView'], resolve),
    },
    {
      path: '/reportClass/salesStatusOfMembership',
      name: '/reportClass/salesStatusOfMembership',
      component: resolve => require(['../components/reportClass/salesStatusOfMembership'], resolve),
    },
    {
      path: '/reportClass/membershipDistribution',
      name: '/reportClass/membershipDistribution',
      component: resolve => require(['../components/reportClass/membershipDistribution'], resolve),
    },
    {
      path: '/reportClass/summaryOfAward',
      name: '/reportClass/summaryOfAward',
      component: resolve => require(['../components/reportClass/summaryOfAward'], resolve),
    },
    {
      path: '/reportClass/strategyUsageProfile',
      name: '/reportClass/strategyUsageProfile',
      component: resolve => require(['../components/reportClass/strategyUsageProfile'], resolve),
    },
    {
      path: '/reportClass/dayReconciliation',
      name: '/reportClass/dayReconciliation',
      component: resolve => require(['../components/reportClass/dayReconciliation'], resolve),
    },
    {
      path: '/reportClass/monthReconciliation',
      name: '/reportClass/monthReconciliation',
      component: resolve => require(['../components/reportClass/monthReconciliation'], resolve),
    },
    {
      path: '/reportClass/userReconciliation',
      name: '/reportClass/userReconciliation',
      component: resolve => require(['../components/reportClass/userReconciliation'], resolve),
    },
    {
      path: '/reportClass/userStatusProfile',
      name: '/reportClass/userStatusProfile',
      component: resolve => require(['../components/reportClass/userStatusProfile'], resolve),
    }
  ]
}
