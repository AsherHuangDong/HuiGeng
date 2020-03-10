export const permList = function() {
  return [{
    // 配置类
    permId: 10000,
    path: '/configurationClass',
    label: '配置类',
    children: [
      {
        permId: 10100,
        path: '/configurationClass/global',
        label: '全局配置',
        children: [
          {
            permId: 10101,
            path: '/configurationClass/global',
            label: '查看'
          },
          {
            permId: 10102,
            path: '/configurationClass/globalQuota',
            label: '修改限额'
          },
          {
            permId: 10103,
            path: '/configurationClass/globalStop',
            label: '暂停/恢复提币'
          },
          {
            permId: 10104,
            path: '/configurationClass/globalRate',
            label: '修改费率'
          }
        ]
      },
      {
        permId: 10200,
        path: '/configurationClass/strategy',
        label: '配置策略',
        children: [
          {
            permId: 10201,
            path: '/configurationClass/strategy',
            label: '查看'
          },
          {
            permId: 10202,
            path: '/configurationClass/strategyAdd',
            label: '新增策略'
          },
          {
            permId: 10203,
            path: '/configurationClass/strategyEdit',
            label: '修改策略'
          },
          {
            permId: 10204,
            path: '/configurationClass/strategyDelete',
            label: '删除策略'
          }
        ]
      },
      {
        permId: 10300,
        path: '/configurationClass/paymentAccount',
        label: 'OTC收款账号配置',
        children: [
          {
            permId: 10301,
            path: '/configurationClass/paymentAccount',
            label: '查看'
          },
          {
            permId: 10302,
            path: '/configurationClass/paymentAccountAddBankCard',
            label: '新增银行卡账号'
          },
          {
            permId: 10303,
            path: '/configurationClass/paymentAccountEditBankCard',
            label: '修改银行卡账号'
          },
          {
            permId: 10304,
            path: '/configurationClass/paymentAccountAddPay',
            label: '新增支付宝/微信支付'
          },
          {
            permId: 10305,
            path: '/configurationClass/paymentAccountEditPay',
            label: '修改支付宝/微信支付'
          },
          {
            permId: 10306,
            path: '/configurationClass/paymentAccountStop',
            label: '暂停/恢复收款'
          },
          {
            permId: 10307,
            path: '/configurationClass/paymentAccountDelete',
            label: '删除'
          }
        ]
      },
      {
        permId: 10400,
        path: '/configurationClass/membership',
        label: '会员资格配置',
        children: [
          {
            permId: 10401,
            path: '/configurationClass/membership',
            label: '查看'
          },
          {
            permId: 10402,
            path: '/configurationClass/membershipConfig',
            label: '设置'
          }
        ]
      },
      {
        permId: 10500,
        path: '/configurationClass/registrationReward',
        label: '注册奖励配置',
        children: [
          {
            permId: 10501,
            path: '/configurationClass/registrationReward',
            label: '查看'
          },
          {
            permId: 10502,
            path: '/configurationClass/registrationRewardEdit',
            label: '修改奖励数量'
          }
        ]
      },
      {
        permId: 10600,
        path: '/configurationClass/distributionReward',
        label: '分销奖励配置',
        children: [
          {
            permId: 10601,
            path: '/configurationClass/distributionReward',
            label: '查看'
          },
          {
            permId: 10602,
            path: '/configurationClass/distributionRewardEdit',
            label: '修改奖励数量'
          }
        ]
      },
      {
        permId: 10700,
        path: '/configurationClass/version',
        label: '版本配置',
        children: [
          {
            permId: 10701,
            path: '/configurationClass/version',
            label: '查看'
          },
          {
            permId: 10702,
            path: '/configurationClass/versionAdd',
            label: '新增版本'
          },
          {
            permId: 10703,
            path: '/configurationClass/versionEdit',
            label: '修改'
          },
          {
            permId: 10704,
            path: '/configurationClass/versionDelete',
            label: '删除'
          }
        ]
      },
      {
        permId: 10800,
        path: '/configurationClass/simulationAccount',
        label: '模拟账户配置',
        children: [
          {
            permId: 10801,
            path: '/configurationClass/simulationAccount',
            label: '查看'
          },
          {
            permId: 10802,
            path: '/configurationClass/simulationAccountEdit',
            label: '修改'
          }
        ]
      },
      {
        permId: 10900,
        path: '/configurationClass/permissionsRole',
        label: '角色配置',
        children: [
          {
            permId: 10901,
            path: '/configurationClass/permissionsRole',
            label: '查看'
          },
          {
            permId: 10902,
            path: '/configurationClass/permissionsRoleAdd',
            label: '新增角色'
          },
          {
            permId: 10903,
            path: '/configurationClass/permissionsRoleEdit',
            label: '修改角色'
          },
          {
            permId: 10904,
            path: '/configurationClass/permissionsRoleDelete',
            label: '删除角色'
          }
        ]
      },
      {
        permId: 11000,
        path: '/configurationClass/permissionsStaff',
        label: '人员配置',
        children: [
          {
            permId: 11001,
            path: '/configurationClass/permissionsStaff',
            label: '查看'
          },
          {
            permId: 11002,
            path: '/configurationClass/permissionsStaffAdd',
            label: '新增人员'
          },
          {
            permId: 11003,
            path: '/configurationClass/permissionsStaffEdit',
            label: '修改人员'
          },
          {
            permId: 11004,
            path: '/configurationClass/permissionsStaffDisable',
            label: '禁用/启动人员'
          },
          {
            permId: 11005,
            path: '/configurationClass/permissionsStaffDelete',
            label: '删除人员'
          }
        ]
      }
    ]
  },
  {
    // 报告类
    permId: 20000,
    path: '/reportClass',
    label: '报告类',
    children: [
      {
        permId: 20100,
        path: '/reportClass/globalReport',
        label: '全局报告'
      },
      {
        permId: 20200,
        path: '/reportClass/userView',
        label: '用户查看'
      },
      {
        permId: 20300,
        path: '/reportClass/salesStatusOfMembership',
        label: '会员资格销售情况查看'
      },
      {
        permId: 20400,
        path: '/reportClass/membershipDistribution',
        label: '会员资格分销情况查看'
      },
      {
        permId: 20500,
        path: '/reportClass/summaryOfAward',
        label: '奖励概要'
      },
      {
        permId: 20600,
        path: '/reportClass/strategyUsageProfile',
        label: '策略使用情况'
      },
      {
        permId: 20700,
        path: '/reportClass/dayReconciliation',
        label: '系统日对账'
      },
      {
        permId: 20800,
        path: '/reportClass/monthReconciliation',
        label: '系统月对账'
      },
      {
        permId: 20900,
        path: '/reportClass/userReconciliation',
        label: '单用户对账'
      },
      {
        permId: 21000,
        path: '/reportClass/userStatusProfile',
        label: '用户状态概要/详情'
      }
    ]
  },
  {
    // 审核类
    permId: 40000,
    path: '/auditClass',
    label: '审核类',
    children: [
      {
        permId: 40100,
        path: '/auditClass/KYC',
        label: 'KYC审核',
        children: [
          {
            permId: 40101,
            path: '/auditClass/KYC',
            label: '查看'
          },
          {
            permId: 40102,
            path: '/auditClass/KYCAudit',
            label: '审核操作'
          }
        ]
      },
      {
        permId: 40200,
        path: '/auditClass/retrievePassword',
        label: '找回支付密码审核',
        children: [
          {
            permId: 40201,
            path: '/auditClass/retrievePassword',
            label: '查看'
          },
          {
            permId: 40202,
            path: '/auditClass/retrievePasswordAudit',
            label: '审核操作'
          }
        ]
      },
      {
        permId: 40300,
        path: '/auditClass/withdraw',
        label: '提币审核',
        children: [
          {
            permId: 40301,
            path: '/auditClass/withdraw',
            label: '查看'
          },
          {
            permId: 40302,
            path: '/auditClass/withdrawAudit',
            label: '审核操作'
          }
        ]
      },
      {
        permId: 40400,
        path: '/auditClass/OTC',
        label: 'OTC争议处理'
      }
    ]
  }
  ]
}
