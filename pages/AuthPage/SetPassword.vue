<template>
  <div class="card">
    <div class="card-header">
      <h3>Please input a new password, and you can <br>login again</h3>
    </div>
    <div class="card-body">
      <form @submit.prevent="savePassword">
        <div class="form-group">
          <label for="password">Password</label>
          <v-icon>mdi-lock</v-icon>
          <input type="password" id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your new password" required />
          <span class="password-toggle" @click="showPassword = !showPassword">{{ showPassword ? "" : "" }}</span>
        </div>
        <div class="form-group">
          <label for="repeatPassword">Repeat Password</label>
          <v-icon>mdi-lock</v-icon>
          <input type="password" id="repeatPassword" v-model="repeatPassword"
            :type="showRepeatPassword ? 'text' : 'password'" placeholder="Repeat your new password" required />
          <span class="password-toggle" @click="showRepeatPassword = !showRepeatPassword">{{ showRepeatPassword ? "" : ""
          }}</span>
        </div>
        <div class="form-group">
          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
    <div v-if="showSuccessDialog" class="popup-dialog">
      <div class="popup-content">
        <img src="~/assets/success.svg" alt="">
        <h2>Selamat!</h2>
        <p>Password baru <br> sudah disimpan.</p>
        <button @click="redirectToLogin">LOG IN</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      password: "",
      repeatPassword: "",
      showPassword: false,
      showRepeatPassword: false,
      showSuccessDialog: false,
    };
  },
  methods: {
    savePassword() {
      // Implement logic to save the new password
      if (this.password === this.repeatPassword) {
        console.log("Password saved successfully");
        this.showSuccessDialog = true; // Menampilkan pop-up dialog sukses
      } else {
        console.log("Passwords do not match");
      }
    },
    redirectToLogin() {
      // Redirect ke halaman login saat tombol "Login" pada pop-up ditekan
      this.$router.push('/AuthPage/login'); // Gantilah '/login' dengan rute yang sesuai
    },
  },
};
</script>
  
<style scoped>
.card {
  border-radius: 15px;
  width: 28vw;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 6px #0000004b;
  top: 50%;
  position: absolute;
  transform: translate(70%, -50%);
}

.card-header {
  margin-bottom: 20px;
}

.card-header h3 {
  margin-bottom: 20px;
  font: normal normal normal 17px/17px Barlow;
}

.form-group {
  margin: 10px 0;
  text-align: left;
}

label {
  font: normal normal normal 12px/12px Barlow;
}

input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  outline: none;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

button {
  margin-top: 5px;
  background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
  color: white;
  width: 25.4vw;
  height: 5vh;
  font: normal normal normal 20px/24px Helvetica;
  font-weight: 300;
  border: none;
  letter-spacing: 1px;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.popup-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background-color: #fff;
  text-align: center;
  padding: 50px;
  height: 39vh;
  width: 23vw;
  border-radius: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.popup-content h2 {
  margin-bottom: 10px;
  color: #506EAF;
  font: normal normal bold 32px/38px Barlow;
}

.popup-content p {
  color: #506EAF;
  font: normal normal normal 24px/29px Barlow;
}

.popup-content button {
  margin-top: 10px;
  background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
  color: white;
  width: 16vw;
  height: 5vh;
  font: normal normal normal 20px/24px Helvetica;
  font-weight: 100;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}

.popup-content button:hover {
  background-color: #0056b3;
}
</style>
  