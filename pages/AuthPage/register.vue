<template>
    <div class="title">
        <div class="login-container">
            <div class="login-form">
                <h1>Create Account!</h1>
                <img src="~/assets/logo.png" alt="">
                <h2>BRAND</h2>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input class="form-input" type="text" id="name" v-model="name" placeholder="Name" required />
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input class="form-input" type="email" id="email" v-model="email" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input class="form-input" type="password" id="password" v-model="password"
                            :type="showPassword ? 'text' : 'password'" placeholder="Password" required />
                        <i class="password-toggle" @click="showPassword = !showPassword"
                            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        <p class="error-message" v-if="password.length > 0 && password.length < 8">Password is too short
                            (minimum 8 characters).</p>
                    </div>
                    <v-btn type="submit"
                        style="background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box; padding: 5px 136px; border-radius: 15px; font: normal normal normal 20px/24px Helvetica; color: #fff; margin-top: 15px;">REGISTER</v-btn>
                </form>
                <div class="additional-options flex-column">
                    <hr class="divider" />
                    <p>OR</p>
                    <div class="row-layout">
                        <v-btn class="google-register-btn" @click="googleLogin">
                            <img src="~/assets/google.svg" alt=""> Login with Google
                        </v-btn>
                        <p class="login-link">Have an account? <router-link to="/AuthPage/login">Login here</router-link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import api from '~/api';
import Swal from 'sweetalert2';
import axios from 'axios';


export default {
    data() {
        return {
            name: '', // Tambahkan properti name
            email: '',
            password: '',
            passwordMatch: true,
            showPassword: false,
            showSuccessDialog: false,
            
        };
    },
    methods: {
        async register() {
            let valid = true;

            if (this.password.length < 8) {
                valid = false;
            }

            if (valid) {
                try {
                    const response = await api.post('/api/registration', {
                        name: this.name, // Kirim name sebagai bagian dari data pendaftaran
                        email: this.email,
                        password: this.password,
                    });
                    console.log('Response:', response);
                    if (response.status === 200) {
                        this.showSuccessDialog = true;
                        console.log('Registrasi berhasil');

                        // Tampilkan SweetAlert sukses
                        Swal.fire({
                            title: 'Registrasi Berhasil',
                            text: 'Anda berhasil terdaftar.',
                            icon: 'success',
                        }).then(() => {
                            this.$router.push('/AuthPage/Login');
                        });
                    } else {
                        console.log('Registrasi gagal dengan kode :', response.status);
                        console.log('Pesan kesalahan:', response.data);
                    }
                } catch (error) {
                    console.error('Error:', error);

                    // Tampilkan SweetAlert gagal
                    Swal.fire({
                        title: 'Registrasi Gagal',
                        text: 'Terjadi kesalahan saat mendaftar.',
                        icon: 'error',
                    });
                }
            }
        },
        async loginGoogle() {
            try {
                // Panggil endpoint API Google Login
                const response = await api.get('/api/google');
                if (response.status === 200) {
                    const url = "https://accounts.google.com/o/oauth2/auth?client_id=329073525441-5r4mlijv8033shl9i3snpegre9kk8nk8.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fbrand.playease.site%2Fapi%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code";
                    window.location.href = url;
                    console.log('Login berhasil');
                    localStorage.setItem('token', response.data.token);
                } else {
                    console.log('Login gagal dengan kode:', response.status);
                    console.log('Pesan kesalahan:', response.data);
                }
            }
            catch (error) {
                console.error('Error:', error);
                // Tindakan penanganan kesalahan lainnya
            }
        },
        async googleLogin() {
            try {
                const googleUser = await this.$gAuth.signIn()
                console.log(googleUser)
                googleUser.getId()
                googleUser.getBasicProfile()
                googleUser.getAuthResponse()
                this.isSignIn = this.$gAuth.isAuthorized
            } catch (error) {
                console.error('Error:', error);
                // Handle the error here
            }
        },


        closeSuccessDialog() {
            this.showSuccessDialog = false;
        },
    },
};
</script>


  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@700&display=swap');

.title {
    height: 80vh;
}

.login-container {
    background-image: url('~/assets/bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85.2vw;
    height: 88vh;
}

.login-form {
    width: 420px;
    background-color: rgba(248, 248, 248, 0.9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(255, 255, 255);
    text-align: center;
    border: solid 1.5px #ffffff;
}

.login-form h2 {
    color: #506EAF;
    opacity: 6;
    font: normal normal 50px/60px Barlow;
    font-weight: bold;
    letter-spacing: 0px;
}

.login-form h1 {
    color: #506EAF;
    opacity: 6;
    font: normal normal bold 30px/40px Barlow;
    letter-spacing: 0px;
    font-size: larger;
}

.login-form img {
    width: 100px;
    margin-bottom: 10px;
    box-shadow: #ccc;
    padding-top: 30px;
}

.form-group h3 {
    margin: 10px 0;
    font: normal normal normal 14px/14px Barlow;
    color: black;
}

.additional-options {
    display: flex;
    align-items: center;
    margin-top: 20px;
    justify-content: center;
}

.divider {
    border: 0;
    border-top: 1px solid #ccc;
    margin: 10px;
    width: 100%;
}

.or {
    font: normal normal normal 14px/14px Barlow;
    color: #000000;
    margin: 0 10px;
}

.google-register-btn {
    font-size: medium;
    border-radius: 15px;
}

.google-register-btn img {
    width: 25px;
    margin-right: 10px;
    margin-top: -19px;
}

.login-link {
    font: normal normal normal 11px/14px Barlow;
    color: #000000;
    display: block;
    margin-top: 10px;
    transition: color 0.3s;
    text-align: center;
}

.login-link a {
    color: #506EAF;
    text-decoration: none;
}

.login-link a:hover {
    color: #4E6EAF;
}

.error-message {
    color: red;
}

label {
    display: flex;
    color: #000000;
    font-size: medium;
}

v-btn[type="button"] {
    font-size: large;
}

.form-group {
    margin-bottom: 10px;
}

.form-input {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    font-size: medium;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.password-mismatch-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.forgot-password {
    font: normal normal normal 11px/14px Barlow;
    text-decoration: none;
    color: #000000;
    display: block;
    margin-top: 10px;
    transition: color 0.3s;
    /* Tambahkan transisi warna */
}

.forgot-password:hover {
    color: #506EAF;
    /* Warna yang diinginkan saat dihover */
}

p {
    font: normal normal normal 14px/14px Barlow;
    color: #000000;
    margin-top: 10px;
}

.success-dialog {
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

.modal-content {
    background-color: #fff;
    text-align: center;
    padding: 50px;
    width: 17vw;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.modal-content h2 {
    color: #506EAF;
}

.modal-content p {
    color: #506EAF;
}

.modal-content img {
    width: 100px;
    margin: 10px 0;
}
</style>
  