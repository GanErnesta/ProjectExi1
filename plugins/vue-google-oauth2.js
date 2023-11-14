import { gapi } from 'gapi-script'
import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '803782459833-hbm2041b5fpjb683mhoo1ercs6c2hdl5.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true
}

gapi.load('auth2', () => {
    gapi.auth2.init(gauthOption)
})
Vue.use(GAuth, gauthOption)