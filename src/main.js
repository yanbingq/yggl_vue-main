// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 添加element-ui依赖
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'  //此处是https协议如果不是改成http
// 将API方法绑定到全局
Vue.prototype.$axios = axios

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  // 月份从0开始,使她变成字符串,不足两位时,前面补个0.
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d}`
});

Vue.use(ElementUI);
// 添加请求拦截器，在请求头部加token
axios.interceptors.request.use(
  config =>{
    if(localStorage.getItem('token')){
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  error =>{
    return Promise.reject(error);
  }
);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
