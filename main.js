import Vue from 'vue';
import VueSocialauth from 'vue-social-auth';

const socialConfig = {
  providers: {
    google: {
      clientId: '832266083674-5pvu1subin8kdb1lfpb36urukj7l4k7r.apps.googleusercontent.com',
      redirectUri: 'http://localhost:3000',
    },
  },
};

Vue.use(VueSocialauth, socialConfig);