import Vue from 'vue'
import axios from 'axios'

// css framework bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
// css darkly theme
import './assets/bootstrap_darkly.css'

// bootstrap-vue only for tooltip
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import App from './App'
import router from './router'
import store from './store'

// font-awesome
import './assets/fontawesome/css/fontawesome-all.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
