<template>
    <div class="title">
        <div class="login-container">
            <div class="login-form">
                <h1>Welcome Back!</h1>
                <img src="~/assets/logo.png" alt="">
                <h2>BRAND</h2>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <h3>Please Login to Continue</h3>
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model="email" placeholder="Email" required />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password" style="font-size: medium;" required />
                        <i class="password-toggle" @click="showPassword = !showPassword"
                            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        <p style="color: red; font-size: medium;" class="error-message"
                            v-if="password.length > 0 && password.length < 8">
                            Password is too short (minimum 8 characters).
                        </p>
                    </div>
                    <v-btn type="submit" style="background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box; padding: 5px 136px;
            border-radius: 15px; color: white; font: normal normal normal 20px/24px Helvetica;">Login</v-btn>
                </form>
                <a @click="redirectToSendEmail" class="forgot-password">Forgotten Your Password?</a>
                <br>
                <div class="additional-options flex-column">
                    <hr class="divider" />
                    <p>Or</p>
                    <div class="row-layout">
                        <v-btn class="google-register-btn" @click="registerWithGoogle">
                            <img src="~/assets/google.svg" alt=""> Login with Google
                        </v-btn>
                        <p class="login-link">Have an account? <a @click="redirectToLogin">Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showSuccessDialog" class="success-dialog">
            <div class="modal-content">
                <img src="~/assets/success.svg" alt="Login Success" />
                <h2>Selamat!</h2>
                <p>Login Berhasil</p>
                <v-btn to="/AuthPage/logout"
                    style="background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
                    border-radius: 15px; font: normal normal normal 18px/24px Helvetica; height: 5vh; width: 10vw; color: white;">TUTUP</v-btn>
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
            showPassword: false,
            showSuccessDialog: false,
            isLoggedIn: false,
            passwordError: false,

        };
    },
    methods: {
        login() {
            if (this.email === "" && this.password === "") {
                this.showSuccessDialog = true;
                this.isLoggedIn = true;
                console.log('Login berhasil');

                // Panggil metode untuk menyimpan email
                this.saveRegisteredEmail();
            } else {
                console.log('Login gagal');
            }
            if (this.password.length < 8) {
                // Atur passwordError menjadi true jika diperlukan
                this.passwordError = true;
            } else {
                // Atur passwordError menjadi false jika diperlukan
                this.passwordError = false;
            }
        },
        closeSuccessDialog() {
            // Menutup dialog kesuksesan
            this.showSuccessDialog = false;
        },
        redirectToLogout() {
            if (this.isLoggedIn) {
                this.$router.push('/AuthPage/logout');
            }
        },
        redirectToLogin() {
            // Implementasi logika pendaftaran dengan Google
            this.$router.push('/AuthPage/login');
        },
        registerWithGoogle() {
            // Implementasi logika pendaftaran dengan Google
            console.log('Register with Google');
        },
        redirectToSendEmail() {
            this.$router.push('/AuthPage/SendEmail');
        },
        saveRegisteredEmail() {
            localStorage.setItem('registeredEmail', this.email);
        },
    },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@700&display=swap');

.login-container {
    background-image: url('~/assets/bg.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1280px;
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

.form-group {
    margin: 10px 0;
}
.form-group h3 {
    margin: 10px 0;
    font: normal normal normal 14px/14px Barlow;
    color: black;
}


label {
    display: flex;
    color: #000000;
    font-size: medium;
}

input[type="email"] {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    font-size: medium;
    font-size: 15px;
    font-weight: 400;
}

input[type="password"] {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    font-weight: 400;
}

.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
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
    margin-bottom: 10px;
    color: #506EAF;
}

.modal-content p {
    color: #506EAF;
}

.modal-content img {
    width: 100px;
    margin: 10px 0;
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
    font: normal normal normal 12px/14px Barlow;
    color: #000000;
    margin: 0 10px;
}

.google-register-btn {
    font-size: medium;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    opacity: 1;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 15px;
}

.google-register-btn img {
    width: 25px;
    margin-right: 10px;
    margin-bottom: 28px;
}

.login-link {
    font: normal normal normal 11px/14px Barlow;
    color: #000000;
    display: block;
    margin-top: 20px;
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
</style>
  