<template>
  <div class="card">
    <div class="card-header">
      <h3>Silakan masukkan kata sandi baru, dan Anda dapat <br>masuk kembali</h3>
    </div>
    <div class="card-body">
      <form @submit.prevent="savePassword">
        <div class="form-group">
          <label for="password">Kata Sandi</label>
          <v-icon>mdi-lock</v-icon>
          <input type="password" id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
            placeholder="Masukkan kata sandi baru" required />
          <span class="password-toggle" @click="showPassword = !showPassword">{{ showPassword ? "" :
            "" }}</span>
        </div>
        <div class="form-group">
          <label for="repeatPassword">Ulangi Kata Sandi</label>
          <v-icon>mdi-lock</v-icon>
          <input type="password" id="repeatPassword" v-model="repeatPassword"
            :type="showRepeatPassword ? 'text' : 'password'" placeholder="Ulangi kata sandi baru" required />
          <span class="password-toggle" @click="showRepeatPassword = !showRepeatPassword">{{ showRepeatPassword ?
            "" : "" }}</span>
        </div>
        <div class="form-group">
          <button type="submit">SIMPAN</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import api from '~/api';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      token: '9249', // Token Anda
      password: "",
      repeatPassword: "",
      showPassword: false,
      showRepeatPassword: false,
      showSuccessDialog: false,
    };
  },
  methods: {
    async savePassword() {
      if (this.password === this.repeatPassword) {
        const data = {
          token: this.token,
          password: this.password,
          confirm_password: this.repeatPassword,
        }
        try {
          const response = await api.post(`/forget-password/${this.token}`, data);

          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Kata sandi berhasil disimpan',
            }).then(() => {
              this.showSuccessDialog = true;
              this.$router.push('/AuthPage/login');
            });
            console.log("Kata sandi berhasil disimpan");
            this.showSuccessDialog = true; // Tampilkan pop-up keberhasilan
          } else {
            console.error("Gagal menyimpan kata sandi");
          }
        } catch (error) {
          console.error("Terjadi kesalahan saat menyimpan kata sandi:", error);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Kata sandi tidak cocok',
        })
        console.log("Kata sandi tidak cocok");
      }
    },
    redirectToLogin() {
      // Alihkan ke halaman masuk ketika tombol "MASUK" pada pop-up diklik
      this.$router.push('/login'); // Gantilah dengan rute yang sesuai
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
}</style>
  