export default {
  // 审核类
  path: '/auditClass',
  name: '/auditClass',
  redirect: '/auditClass/KYC',
  component: resolve => require(['../components/auditClass/index'], resolve),
  children: [
    {
      path: '/auditClass/KYC',
      name: '/auditClass/KYC',
      component: resolve => require(['../components/auditClass/KYC'], resolve),
      children: [
        {
          path: '/auditClass/KYCAudit',
          name: '/auditClass/KYCAudit',
          component: resolve => require(['../components/auditClass/KYCAudit'], resolve),
        }
      ]
    },
    {
      path: '/auditClass/retrievePassword',
      name: '/auditClass/retrievePassword',
      component: resolve => require(['../components/auditClass/retrievePassword'], resolve),
      children: [
        {
          path: '/auditClass/retrievePasswordAudit',
          name: '/auditClass/retrievePasswordAudit',
          component: resolve => require(['../components/auditClass/retrievePasswordAudit'], resolve),
        }
      ]
    },
    {
      path: '/auditClass/withdraw',
      name: '/auditClass/withdraw',
      component: resolve => require(['../components/auditClass/withdraw'], resolve),
      children: [
        {
          path: '/auditClass/withdrawAudit',
          name: '/auditClass/withdrawAudit',
          component: resolve => require(['../components/auditClass/withdrawAudit'], resolve),
        }
      ]
    },
    {
      path: '/auditClass/OTC',
      name: '/auditClass/OTC',
      component: resolve => require(['../components/auditClass/OTC'], resolve),
    },
    // OTC争议详情
    {
      path: '/auditClass/otcOrderDetails',
      name: '/auditClass/otcOrderDetails',
      component: resolve => require(['../components/auditClass/otcOrderDetails'], resolve),
    }
  ]
}
