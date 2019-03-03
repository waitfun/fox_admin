// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'    
// import '../static/theme/#EA1935/index.css'
import '../static/icon/iconfont.css'
import animated from 'animate.css'
import { http } from './utils/http'


Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(animated)
// 使用 Event Bus
window.eventBus = new Vue();
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("user_token")) {
      if (to.meta.title) {
        let website_name = localStorage.getItem('website_name') ? localStorage.getItem('website_name'):'后台管理系统'
        document.title = website_name +'-'+ to.meta.title;
      }
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    if (to.meta.title) {
      let website_name = localStorage.getItem('website_name') ? localStorage.getItem('website_name'):'后台管理系统'
        document.title = website_name +'-'+ to.meta.title;
    }
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
