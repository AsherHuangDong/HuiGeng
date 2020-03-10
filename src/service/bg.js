export const withDrawAll = function(self) {
  const url = '/api/bg/withdraw/all?current=' + self.withDrawAllParams.current +
    '&size=' + self.withDrawAllParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    self.withDrawAllParams.current = res.data.info.current
    self.withDrawAllParams.size = res.data.info.size
    self.withDrawAllParams.total = res.data.info.total
    self.tableData1 = res.data.info.records
  })
}

export const otcList = function(self) {
  self.$get('/api/bg/rate/all', {
    params: {
      current: self.otcListParams.current,
      size: self.otcListParams.size
    }
  }).then(res => {
    self.otcListParams.current = res.data.info.current
    self.otcListParams.size = res.data.info.size
    self.otcListParams.total = res.data.info.total
    self.tableData2 = res.data.info
  })
}

export const globalConfigList = function(self) {
  self.$get('/api/bg/globalConfig/all', {
    params: {
      current: self.otcListParams.current,
      size: self.otcListParams.size
    }
  }).then(res => {
    self.globalConfigParams.current = res.data.info.current
    self.globalConfigParams.size = res.data.info.size
    self.globalConfigParams.total = res.data.info.total
    self.tableData = []
    res.data.info.forEach(element => {
      element.vstatus = element.status == 2 ? true : false
      self.tableData.push(element)
    });
    //self.name = self.tableData[0].coinSymbol
    //self.getData();
  })
}

export const getAllStrategy = function(self) {
  const url = '/api/bg/strategy/all/' + self.getAllStrategyParams.current +
    '/' + self.getAllStrategyParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    self.strategyList = res.data.info
  })
}

export const getBankCountAll = function(self) {
  const url = '/api/bg/bankAccount/all/' + self.getBankCountAllParams.current + '/' + self.getBankCountAllParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      self.bankList = res.data.info.records
      self.getBankCountAllParams.total = res.data.info.total
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.bankList = null
    }
  })
}

export const getPayZAccountAll = function(self) {
  const url = '/api/bg/payAccount/all/' + '1' +
  '/' + self.payAccountAllParams.current +
  '/' + self.payAccountAllParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    self.zhifubaoList = res.data.info.records
  })
}

export const getPayWAccountAll = function(self) {
  const url = '/api/bg/payAccount/all/' + '2' +
  '/' + self.payAccountAllParams.current +
  '/' + self.payAccountAllParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    self.weixinList = res.data.info.records
  })
}

export const getVersionCountAll = function(self) {
  const url = '/api/bg/version/all'
  self.$get(url).then(res => {
    console.log(url, res)
    self.versionList = res.data.info
  })
}

export const RegistrationList = function(self) {
  const url = '/api/bg/reward/all/' // 注册奖励配置
  self.$get(url).then(res => {
    console.log(url, res)
    self.tableData = res.data.info
  })
}

export const DistributionList = function(self) {
  const url = '/api/bg/distReward/testall' // 分销奖励配置
  self.$get(url).then(res => {
    console.log(url, res)
    self.tableData = res.data.a
    console.log('tableData', self.tableData)
  })
}

export const SimuaccList = function(self) {
  const url = '/api/bg/simuacc/all' // 分销奖励配置
  self.$get(url).then(res => {
    console.log(url, res)
    self.tableData = res.data.info
  })
}

export const KYCList = function(self) {
  const url = '/api/bg/kycAudit/all/' + self.pageParams.current + '/' + self.pageParams.size
  self.$post(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      self.tableData = res.data.info.records
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}

export const ResetList = function(self) {
  const url = '/api/bg/paypwd/all/' + self.pageParams.current + '/' + self.pageParams.size
  self.$post(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      self.tableData = res.data.info.records
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}

export const withDrawList = function(self) {
  const url = '/api/bg/mentmoney/all/' + self.pageParams.current + '/' + self.pageParams.size
  self.$post(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      self.tableData = res.data.info.records
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}
// OTC争议处理列表
export const getOTCList = function(self) {
  const url = '/api/bg/otcComplaint/all/' + self.pageParams.current + '/' + self.pageParams.size
  self.$post(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      self.tableData = res.data.info.records
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}

// 活动&banner配置
export const allBanner = function(self) {
  const url = '/api/bg/banner/all'
  self.$get(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      res.data.info.forEach(element => {
        element.vstatus = element.status == 1 ? true : false
        self.tableData.push(element)
      });
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}

// 公告配置
export const allAnnouncement = function(self) {
  const url = '/api/bg/message/all'
  self.$get(url).then(res => {
    console.log(url, res)
    if (res.code === 100) {
      res.data.info.forEach(element => {
        element.vstatus = element.status == 1 ? true : false
        self.tableData.push(element)
      });
    }
    if (res.code === 400) {
      self.$message(res.msg)
      self.tableData = null
    }
  })
}
// 向指定用户充值Token
export const getRechargeRecord = function(self) {
  const url = '/api/bg/userRecharge/all/' + self.getAllStrategyParams.current +
    '/' + self.getAllStrategyParams.size
  self.$get(url).then(res => {
    console.log(url, res)
    self.strategyList = res.data.info.records
  })
}
// 获得所有会员信息
export const getAllMember = function(self) {
  const url = '/api/bg/member/all'
    self.$get(url).then(res => {
      console.log(url, res)
      console.log(res.data.info)
      for(let i in res.data.info){
        if(res.data.info[i].memberName == '玄奘' || res.data.info[i].memberName == '普通用户') {
          delete res.data.info[i]
        }
      }
      self.tableData = res.data.info
    })
}
// 订单有效期配置
export const getValidityPeriod = function(self) {
  self.$get('/api/bg/orderValidConfig').then(res => {
    self.validityPeriod = res.data.info.time
    self.validityPeriodid = res.data.info.id
  })
}

// 订单有效期配置
export const getWithdrawRw = function(self) {
  const url =
        "/api/bg/withdrawRw/all/" +
        self.pageParams.current +
        "/" +
        self.pageParams.size;
        self.$post(url).then(res => {
        console.log(url, res);
        if (res.msg === "未查询到数据") {
          self.$message(res.msg);
          self.tableData = null;
        } else {
          self.tableData = res.data.info.records;
          self.total = res.data.info.total;
        }
      });
}