import Vue from 'vue';
import VueGoogleOauth from 'vue-google-oauth2';

const gauthOption = {
    clientId: '286254916140-urve5kssfl7fjcuh5matqtcj42pcsrdk.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true,
};

Vue.use(VueGoogleOauth, gauthOption);
const gauth = VueGoogleOauth.gauth;

export default gauth;
