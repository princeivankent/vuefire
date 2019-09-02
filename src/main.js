import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import store from './store'
import { auth } from './config/firebase'

import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDPG4uSZfYXnLTg1x_DbigWdNWKxeMcaPg', // hacked
    libraries: 'places'
  }
});

let app = '';
auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch('user/setUserDetailsAction', {
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid
    });
  }

  if (!app) {
    app = new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})
