// import Vue from 'vue'
import store from './store/store'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import VueRouter from 'vue-router'
import router from './router/router'
import { $get, $post, $put, $delete } from './config/http'
import App from './App.vue'
import moment from 'moment'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
import DateTool from './assets/js/dateTool.js'
Vue.use(echarts)
Vue.use(iView)
Vue.config.productionTip = false
// Vue.use(ElementUI)
// Vue.use(VueRouter)
Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.prototype.$put = $put
Vue.prototype.$delete = $delete
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.prototype.DateTool = DateTool 
new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
