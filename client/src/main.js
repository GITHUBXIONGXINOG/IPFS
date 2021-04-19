import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
import './assets/icon/iconfont.js'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWorker from 'vue-worker'
Vue.use(ElementUI);
Vue.use(VueWorker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
