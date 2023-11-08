import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '832266083674-5pvu1subin8kdb1lfpb36urukj7l4k7r.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)

new Vue({ render: h => h(App) }).$mount('#app')