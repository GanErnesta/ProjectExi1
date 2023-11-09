import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '320405960498-a6jj4jegk5q0r0bvv01r5dmd3np6t0ni.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)