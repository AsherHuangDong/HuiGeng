import VueRouter from 'vue-router'
import configurationClass from './configurationClass'
import assetManagementClass from './assetManagementClass'
import auditClass from './auditClass'
import operationClass from './operationClass'
import reportClass from './reportClass'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['../components/Index'], resolve),
      children: [
        configurationClass,
        assetManagementClass,
        auditClass,
        operationClass,
        reportClass
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/Login'], resolve),
    },
    {
      path: '/webpage',
      name: 'Webpage',
      component: resolve => require(['../components/Webpage'], resolve),
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

// 全局守卫，用于过滤跳转路由
router.beforeEach((to, from, next) => {
  // window.console.log('to', to)
  // window.console.log('from', from);
  // window.console.log('next', next);
  // 保存当前所在路由位置，当页面刷新时，回显菜单选中状态
  for (let i = 0; i < to.matched.length; i++) {
    sessionStorage.setItem('routerLocation' + i, to.matched[i].name)
  }
  // 登录、权限拦截
  const isLogin = !!localStorage.token // !!代表是否存在
  if (to.path === '/login' || to.path === '/rePassword') { // 如果进入登录页，不进行拦截
    localStorage.setItem('permValue', to.path)
    next()
  } else if (isLogin) { // 路由权限过滤
    localStorage.setItem('permValue', to.path)
    next()
  } else {
    next()
    // router.push('/login').then()
  }
})

export default router
