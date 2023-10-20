<template>
    <div class="container flex-column">
        <div class="verification-card">
            <p class="title">Anda harus memverifikasi alamat email anda</p>
            <p class="email">{{ registeredEmail }}</p>
            <form @submit.prevent="verifyEmail">
                <div class="form-group">
                    <label for="verificationCode"></label>
                    <input type="text" id="verificationCode" v-model="verificationCode" placeholder="Kode Verifikasi"
                        required />
                </div>
                <button class="lanjut" type="submit">Lanjut</button>
            </form>
            <div class="time">{{ countdownMinutes }}:{{ countdownSeconds }}</div>
        </div>
        <div class="resend-container">
            <button class="resend-button" style="color: white;" @click="resendVerificationCode" :disabled="resendDisabled">
                Resend Code
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            registeredEmail: 'karsakds@gmail.com',
            verificationCode: '',
            countdown: 120, // 2 menit (2 * 60 detik)
            countdownInterval: null,
        };
    },
    computed: {
        countdownMinutes() {
            return String(Math.floor(this.countdown / 60)).padStart(2, '0');
        },
        countdownSeconds() {
            return String(this.countdown % 60).padStart(2, '0');
        },
        resendDisabled() {
            return this.countdown > 0;
        },
    },
    methods: {
        verifyEmail() {
            if (this.verificationCode === 'kode-verifikasi-yang-benar') {
                console.log('Verifikasi berhasil');
                // Redirect atau lakukan tindakan lain
            } else {
                console.log('Verifikasi gagal. Kode verifikasi tidak sesuai.');
            }
        },
        resendVerificationCode() {
            if (!this.resendDisabled) {
                console.log('Mengirim ulang kode verifikasi...');
                // Lakukan pengiriman ulang kode verifikasi ke alamat email yang terdaftar
                this.startCountdown();
                this.resendDisabled = true;
            }
        },
        startCountdown() {
            this.countdown = 120; // Set ulang countdown ke 2 menit (2 * 60 detik)
            clearInterval(this.countdownInterval);
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.countdownInterval);
                }
            }, 1000); // Perbarui setiap 1 detik
        },
    },
    mounted() {
        this.startCountdown();
    },
};
</script>
  
  
<style scoped>
.verification-card {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 30vw;
    margin: 0 auto;
    top: 50%;
    position: absolute;
    transform: translate(70%, -50%);
    /* Untuk mengatur card persis di tengah */
}

.title {
    font-weight: 400;
    margin: 0 auto;
}

.email {
    font-weight: bold;
    margin-bottom: 20px;
}

.form-group {
    margin: 10px 0;
}

label {
    display: block;
    text-align: left;
}

input {
    width: 25.4vw;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    outline: none;
}

button {
    background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
    color: #fff;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
}

.time {
    color: #ff0000;
    margin-right: 20px;
    float: inline-end;
    font: normal normal normal 14px/12px Barlow;
    top: 53%;
    left: 53%;
    position: absolute;
    transform: translatey(-70%);
}

.lanjut {
    width: 25.4vw;
    height: 5vh;
    font: normal normal normal 20px/24px Helvetica;
    font-weight: 300;
}

.resend-container {
    text-align: center;
}

.resend-button {
    color: #fff;
    border: none;
    border-radius: 0 15px 15px 0;
    cursor: pointer;
    height: 4.5vh;
    width: 13.5vh;
    top: 49%;
    position: absolute;
    transform: translate(30%, -45%);
}
</style>
  