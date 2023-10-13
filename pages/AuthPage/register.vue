<template>
    <div class="title">
        <div class="login-container">
            <div class="login-form">
                <h1>Create Account!</h1>
                <img src="~/assets/logo.png" alt="">
                <h2>BRAND</h2>
                <form @submit.prevent="register">
                    <div class="form-group">
                        <h3>Register to use amazing app</h3>
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password" required/>
                        <i class="password-toggle" @click="showPassword = !showPassword"
                            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        <p class="error-message" v-if="password.length > 0 && password.length < 8">
                            Password is too short (minimum 8 characters).
                        </p>
                    </div>
                    <div class="form-group">
                        <label for="repeatPassword">Repeat Password</label>
                        <input type="repeatPassword" id="repeatPassword" v-model="repeatPassword"
                            :type="showPassword ? 'text' : 'password'" placeholder="Repeat Password" required />
                        <i class="password-toggle" @click="showPassword = !showPassword"
                            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </div>
                    <p v-if="!passwordMatch" class="password-mismatch-text">Repeat Password not the same!</p>
                    <v-btn type="submit"
                        style="background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box; padding: 5px 136px;
                        border-radius: 15px; font: normal normal normal 20px/24px Helvetica Neue; color: #fff;">REGISTER</v-btn>
                </form>
                <div class="additional-options flex-column">
                    <hr class="divider" />
                    <p>OR</p>
                    <div class="row-layout">
                        <v-btn class="google-register-btn" @click="registerWithGoogle">
                            <v-icon left>mdi-google</v-icon> Register with Google
                        </v-btn>
                        <p class="login-link">Have an account? <router-link to="/AuthPage/login">Login here</router-link></p>
                    </div>
                </div>
            </div>
            <div v-if="showSuccessDialog" class="success-dialog">
                <div class="modal-content">
                    <img src="~/assets/success.svg" alt="Login Success" />
                    <h2>Selamat!</h2>
                    <p>Registrasi Berhasil</p>
                    <v-btn @click="closeSuccessDialog">Tutup</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            repeatPassword: '',
            passwordMatch: true,
            showPassword: false,
        };
    },
    methods: {
        async register() {
            let valid = true;

            // Periksa apakah kedua password cocok
            if (this.password !== this.repeatPassword) {
                // Jika kedua password tidak cocok, atur passwordMatch ke false
                this.passwordMatch = false;
                valid = false; // Tambahkan ini untuk menandai validasi yang gagal
            } else {
                this.passwordMatch = true;
            }

            if (this.email === 'email-yang-terdaftar' && this.password === 'password-yang-terdaftar') {
                // Tampilkan modal login berhasil
                this.showSuccessDialog = true;
                console.log('Login berhasil');
            } else {
                // Password salah atau email tidak terdaftar
                console.log('Login gagal');
            }


            if (this.password.length < 8) {
                this.passwordError = true; // Atur passwordError menjadi true
                valid = false;
            } else {
                this.passwordError = false; // Atur passwordError menjadi false
            }

            if (valid) {
                // Implementasi logika login di sini
                console.log('Email:', this.email);
                console.log('Password:', this.password);

                // Redirect using this.$router
                this.$router.push('/AuthPage/login');
            }
        },
        registerWithGoogle() {
            // Implementasi logika pendaftaran dengan Google
            console.log('Register with Google');
        },
        closeSuccessDialog() {
            // Tutup modal login berhasil
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
    width: 85vw;
    height: 90vh;
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

input[type="email"],
input[type="password"],
input[type="repeatPassword"] {
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
}</style>
  