import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../common/config/routes.js'

Vue.use(VueRouter);
console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  let token = window.sessionStorage.getItem('token')
  if (token) {
    //已登录
    if (to.path === '/login') {
      console.log(Vue.prototype);
      Vue.prototype.$message.error('请勿重复登录!')
      return next({ name: from.name ? from.name : 'index' })
    }

    if (to.name !== '404') {
      let route = window.sessionStorage.getItem('route')
      if (route) {
        route = JSON.parse(route)
      }
      let index = route.findIndex(item => {
        return item.rule_id > 0 || item.desc === to.name
      })
      if (index === -1) {
        Vue.prototype.$message.error('您没有权限访问!')
        return next({ name: from.name ? from.name : '404' })
      }
    }
    
    next()
    return
  } else {
    if (to.path === '/login') {
      return next()
    }
    Vue.prototype.$message.error('请先登录!')
    //未登录
    next({ name: 'login' })
    return
  }
})
export default router