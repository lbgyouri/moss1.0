import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'normalize.css/normalize.css'
import 'leaflet/dist/leaflet.css'
import Jquery from 'jquery'
Vue.prototype.$ = Jquery
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
Vue.use(Antd);
