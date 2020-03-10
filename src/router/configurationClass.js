export default {
  // 配置类
  path: '/configurationClass',
  name: '/configurationClass',
  redirect: '/configurationClass/global',
  component: resolve => require(['../components/configurationClass/index'], resolve),
  children: [
    {
      path: '/configurationClass/global',
      name: '/configurationClass/global',
      component: resolve => require(['../components/configurationClass/global'], resolve),
      children: [
        {
          path: '/configurationClass/globalQuota',
          name: '/configurationClass/globalQuota',
          component: resolve => require(['../components/configurationClass/globalQuota'], resolve),
        },
        {
          path: '/configurationClass/globalWith',
          name: '/configurationClass/globalWith',
          component: resolve => require(['../components/configurationClass/globalWith'], resolve),
        },
        {
          path: '/configurationClass/globalTranRate',
          name: '/configurationClass/globalTranRate',
          component: resolve => require(['../components/configurationClass/globalTranRate'], resolve),
        },
        {
          path: '/configurationClass/globalAdress',
          name: '/configurationClass/globalAdress',
          component: resolve => require(['../components/configurationClass/globalAdress'], resolve),
        },
        {
          path: '/configurationClass/globalStop',
          name: '/configurationClass/globalStop',
          component: resolve => require(['../components/configurationClass/globalStop'], resolve),
        },
        {
          path: '/configurationClass/globalRate',
          name: '/configurationClass/globalRate',
          component: resolve => require(['../components/configurationClass/globalRate'], resolve),
        },
        {
          path: '/configurationClass/globalValidityPeriod',
          name: '/configurationClass/globalValidityPeriod',
          component: resolve => require(['../components/configurationClass/globalValidityPeriod'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/strategy',
      name: '/configurationClass/strategy',
      component: resolve => require(['../components/configurationClass/strategy'], resolve),
      children: [
        {
          path: '/configurationClass/strategyDelete',
          name: '/configurationClass/strategyDelete',
          component: resolve => require(['../components/configurationClass/strategyDelete'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/strategyAdd',
      name: '/configurationClass/strategyAdd',
      component: resolve => require(['../components/configurationClass/strategyAdd'], resolve),
    },
    {
      path: '/configurationClass/strategyEdit',
      name: '/configurationClass/strategyEdit',
      component: resolve => require(['../components/configurationClass/strategyEdit'], resolve),
    },
    {
      path: '/configurationClass/paymentAccount',
      name: '/configurationClass/paymentAccount',
      component: resolve => require(['../components/configurationClass/paymentAccount'], resolve),
      children: [
        {
          path: '/configurationClass/paymentAccountAddBankCard',
          name: '/configurationClass/paymentAccountAddBankCard',
          component: resolve => require(['../components/configurationClass/paymentAccountAddBankCard'], resolve),
        },
        {
          path: '/configurationClass/paymentAccountEditBankCard',
          name: '/configurationClass/paymentAccountEditBankCard',
          component: resolve => require(['../components/configurationClass/paymentAccountEditBankCard'], resolve),
        },
        {
          path: '/configurationClass/paymentAccountAddPay',
          name: '/configurationClass/paymentAccountAddPay',
          component: resolve => require(['../components/configurationClass/paymentAccountAddPay'], resolve),
        },
        {
          path: '/configurationClass/paymentAccountEditPay',
          name: '/configurationClass/paymentAccountEditPay',
          component: resolve => require(['../components/configurationClass/paymentAccountEditPay'], resolve),
        },
        {
          path: '/configurationClass/paymentAccountStop',
          name: '/configurationClass/paymentAccountStop',
          component: resolve => require(['../components/configurationClass/paymentAccountStop'], resolve),
        },
        {
          path: '/configurationClass/paymentAccountDelete',
          name: '/configurationClass/paymentAccountDelete',
          component: resolve => require(['../components/configurationClass/paymentAccountDelete'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/membership',
      name: '/configurationClass/membership',
      component: resolve => require(['../components/configurationClass/membership'], resolve),
      children: [
        {
          path: '/configurationClass/membershipConfig',
          name: '/configurationClass/membershipConfig',
          component: resolve => require(['../components/configurationClass/membershipConfig'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/registrationReward',
      name: '/configurationClass/registrationReward',
      component: resolve => require(['../components/configurationClass/registrationReward'], resolve),
      children: [
        {
          path: '/configurationClass/registrationRewardEdit',
          name: '/configurationClass/registrationRewardEdit',
          component: resolve => require(['../components/configurationClass/registrationRewardEdit'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/distributionReward',
      name: '/configurationClass/distributionReward',
      component: resolve => require(['../components/configurationClass/distributionReward'], resolve),
      children: [
        {
          path: '/configurationClass/distributionRewardEdit',
          name: '/configurationClass/distributionRewardEdit',
          component: resolve => require(['../components/configurationClass/distributionRewardEdit'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/version',
      name: '/configurationClass/version',
      component: resolve => require(['../components/configurationClass/version'], resolve),
      children: [
        {
          path: '/configurationClass/versionAdd',
          name: '/configurationClass/versionAdd',
          component: resolve => require(['../components/configurationClass/versionAdd'], resolve),
        },
        {
          path: '/configurationClass/versionEdit',
          name: '/configurationClass/versionEdit',
          component: resolve => require(['../components/configurationClass/versionEdit'], resolve),
        },
        {
          path: '/configurationClass/versionDelete',
          name: '/configurationClass/versionDelete',
          component: resolve => require(['../components/configurationClass/versionDelete'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/simulationAccount',
      name: '/configurationClass/simulationAccount',
      component: resolve => require(['../components/configurationClass/simulationAccount'], resolve),
    },
    {
      path: '/configurationClass/simulationAccountAdd',
      name: '/configurationClass/simulationAccountAdd',
      component: resolve => require(['../components/configurationClass/simulationAccountAdd'], resolve),
    },
    {
      path: '/configurationClass/simulationAccountEdit',
      name: '/configurationClass/simulationAccountEdit',
      component: resolve => require(['../components/configurationClass/simulationAccountEdit'], resolve),
    },
    {
      path: '/configurationClass/permissionsRole',
      name: '/configurationClass/permissionsRole',
      component: resolve => require(['../components/configurationClass/permissionsRole'], resolve),
      children: [
        {
          path: '/configurationClass/permissionsRoleDelete',
          name: '/configurationClass/permissionsRoleDelete',
          component: resolve => require(['../components/configurationClass/permissionsRoleDelete'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/permissionsRoleAdd',
      name: '/configurationClass/permissionsRoleAdd',
      component: resolve => require(['../components/configurationClass/permissionsRoleAdd'], resolve),
    },
    {
      path: '/configurationClass/permissionsRoleEdit',
      name: '/configurationClass/permissionsRoleEdit',
      component: resolve => require(['../components/configurationClass/permissionsRoleEdit'], resolve),
    },
    {
      path: '/configurationClass/permissionsStaff',
      name: '/configurationClass/permissionsStaff',
      component: resolve => require(['../components/configurationClass/permissionsStaff'], resolve),
      children: [
        {
          path: '/configurationClass/permissionsStaffDisable',
          name: '/configurationClass/permissionsStaffDisable',
          component: resolve => require(['../components/configurationClass/permissionsStaffDisable'], resolve),
        },
        {
          path: '/configurationClass/permissionsStaffDelete',
          name: '/configurationClass/permissionsStaffDelete',
          component: resolve => require(['../components/configurationClass/permissionsStaffDelete'], resolve),
        }
      ]
    },
    {
      path: '/configurationClass/permissionsStaffAdd',
      name: '/configurationClass/permissionsStaffAdd',
      component: resolve => require(['../components/configurationClass/permissionsStaffAdd'], resolve),
    },
    {
      path: '/configurationClass/permissionsStaffEdit',
      name: '/configurationClass/permissionsStaffEdit',
      component: resolve => require(['../components/configurationClass/permissionsStaffEdit'], resolve),
    }
  ]
}
