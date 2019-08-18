import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import { auth } from './config/firebase'

import App from './App.vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

let app = '';
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})
