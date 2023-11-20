import { gapi } from 'gapi-script'
import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '320405960498-gulhs3dvp2drq7ba0v8068kr5lr05npl.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    response_type: 'id_token permission',
    fetch_basic_profile: true
}

gapi.load('auth2', () => {
    gapi.auth2.init(gauthOption)
})

Vue.use(GAuth, gauthOption)