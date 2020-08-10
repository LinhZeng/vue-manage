import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'
import '@/styles/index.scss'; // global css
import '@/assets/index.scss';

import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import './utils/components'; // 全局组件
import * as filters from './filters' // global filters
import plugins from './utils/plugins'; // 全局插件
import apis from './request/apis';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, { size: 'small' });
Vue.use(plugins);
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 接数据用，全局注册，使用方法为：this.axios, this.qs
Vue.prototype.axios = axios;
Vue.prototype.$apis = apis;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
