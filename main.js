import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '286254916140-urve5kssfl7fjcuh5matqtcj42pcsrdk.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
}
Vue.use(GAuth, gauthOption)
export default GAuth