import Vue from 'vue'
import './plugins/axios.js'
import App from './App.vue'
import './plugins/element.js'
import store from './store'
import router from './router'
import echarts from 'echarts'
import VueDND from 'awe-dnd'
Vue.prototype.$echarts = echarts

import {
  Message
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import $conf from './common/config/config.js'
Vue.config.productionTip = false
Vue.prototype.$conf = $conf
Vue.use(VueDND);


let loading = null;
let requestCount = 0

function showLoad() {
  if (requestCount === 0) {
    loading = Message({
      message: '加载中...',
      duration: 0
    });
  }
  requestCount++
}

function hideLoad() {
  if (requestCount > 0) { requestCount-- }
  if (loading && requestCount === 0) {
    loading.close()
  }
}

// 添加请求拦截器
Vue.prototype.axios.interceptors.request.use(function (config) {
  console.log(config)
  //从本地拿去token
  let token = window.sessionStorage.getItem('token');
  console.log(token)
  if (config.token) {
    config.headers['token'] = token
  }
  if (config.load) {
    //显示加载中
    showLoad()
  }
  return config;
}, function (error) {
  hideLoad()
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Vue.prototype.axios.interceptors.response.use(function (response) {
  //隐藏加载中...
  hideLoad()
  return response;
}, function (err) {
  // 对响应错误做点什么
  if (err.response.data && err.response.data.errorCode) {
    Message(err.response.data.msg)

  }
  hideLoad()
  return Promise.reject(err);
});
new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
