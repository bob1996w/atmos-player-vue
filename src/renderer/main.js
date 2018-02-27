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
import './assets/fontawesome-all'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


console.log(require.resolve('electron'))
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  mounted: function(){
    console.log("/");
    console.log(require.resolve('electron'))
    const {ipcMain} = require('electron');
    const {dialog} = require('electron').remote;

    // opening music files
    ipcMain.on('openFileRequest', function(event, data) {
      dialog.showOpenDialog({
        title: "Select Music...",
        filters: [
          {name: 'mp3 files', extensions: ['mp3']}
        ]
      }, function(filename){
        console.log(filename);
        if(filename === undefined){
          console.log("NO the sun is a deadly laser");
        }else{
          console.log("Not anymore there's a blanket");
        }
      });
    });
  }
}).$mount('#app')
