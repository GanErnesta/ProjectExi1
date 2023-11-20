<template>
  <div class="profile-card">
    <div class="profile-circle">
      <img :src="userProfile.picture" alt="?" />
    </div>
    <div class="profile-info">
      <h2>Welcome Back</h2>
      <p> {{ userProfile.name }} </p>
    </div>
    <router-link to="/AuthPage/Login">
      <button @click="logout">LOG OUT</button>
    </router-link>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import axios from 'axios'
import api from '~/api'

export default {
  data() {
    return {
      isAuthenticated: false,
      userProfile: {}
    }
  },
  computed: {
    profileImage() {
      return this.$gAuth.isAuthenticated && this.userProfile.picture ? this.userProfile.picture : null
    }
  },
  methods: {
    signIn() {
      this.$gAuth.signIn()
        .then(user => {
          this.isAuthenticated = this.$gAuth.isAuthorized
          this.userProfile = this.$gAuth.getProfile()
          console.log('User signed in:', user)
          console.log('User profile:', this.userProfile)

          this.displayProfilePicture()
          this.sendTokenToBackend(this.userProfile.access_token)
          console.log('Token:', this.userProfile.access_token)
        })
        .catch(error => {
          console.error('Error occurred while signing in:', error)
        })
    },
    displayProfilePicture() {
      if (this.isAuthenticated && this.userProfile.picture) {
        const profilePictureUrl = this.userProfile.picture

        // Example: Assuming access token is required in the URL
        const access_token = this.$gAuth.getAuthCode()
        axios.get(profilePictureUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        })
          .then(response => {
            // Handle the response here or set the image source directly
            console.log('Profile picture response:', response)
            // Set the image source
            // this.profileImage = response.data.picture;
          })
          .catch(error => {
            console.error('Error fetching profile picture:', error)
          })
      }
    },
    sendTokenToBackend(token) {
      // Send the token to the backend server
      api.post('/api/oauthGoogle/${access_token}', {
        access_token: token
      })
        .then(response => {
          console.log('Token sent to backend:', response)
        })
        .catch(error => {
          console.error('Error occurred while sending token to backend:', error)
        })
        
    },
    logout() {
      this.$gAuth.signOut()
        .then(() => {
          this.isAuthenticated = this.$gAuth.isAuthorized
          this.userProfile = {}
        })
        .catch(error => {
          console.error('Error occurred while signing out:', error)
        })
    },
  },
  mounted() {
    if (this.$route.query) {
      console.log(this.$route.query.user)
      this.userProfile = { ...this.$route.query.user }
      if (this.userProfile.access_token) {
        // If the token is present in the query params, send it to backend
        this.sendTokenToBackend(this.userProfile.access_token)
      }
    }
  }
}
</script>


<style scoped>
.profile-card {

  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 30vw;
  margin: 0 auto;
  text-align: center;
  top: 50%;
  position: absolute;
  transform: translate(70%, -50%);
}

.profile-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.profile-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h2 {
  font-weight: 500;
  font-size: 1rem;
  font: Barlow;
  color: #506EAF;
  margin: 5px 0;
}

.profile-info p {
  font: normal normal bold 32px/38px Barlow;
  margin: 5px 0;
  padding-bottom: 10px;
  font-size: 2.3rem;
  color: #506EAF;
}


button {
  width: 18vw;
  background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  letter-spacing: 1px;
  font: normal normal normal 20px/24px Helvetica;
  cursor: pointer;
}

button:hover {
  background-color: #506EAF;
}
</style>
