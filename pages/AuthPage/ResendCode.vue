<template>
    <div class="container flex-column">
        <div class="verification-card">
            <p class="title">Anda harus memverifikasi alamat email anda</p>
            <form @submit.prevent="checkToken">
                <div class="form-group">
                    <label for="verificationCode">Kode Verifikasi</label>
                    <input type="number" id="verificationCode" v-model="verificationCode" placeholder="Kode Verifikasi"
                        required @input="limitInput" />
                </div>
                <button class="lanjut">Lanjut</button>
            </form>
            <div class="time">{{ countdownMinutes }}:{{ countdownSeconds }}</div>
        </div>
        <div class = "resend-container">
            <button class="resend-button" style="color: white;" @click="resendVerificationCode" :disabled="resendDisabled">
                Kirim Ulang Kode
            </button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'; // Import Axios
import api from '~/api';

export default {
    data() {
        return {
            token: '', // Inisialisasi token dengan nilai token yang sesuai
            email: '', // Tambahkan properti email dan inisialisasikan dengan alamat email pengguna
            countdown: 120,
            countdownInterval: null,
            verificationCode: '',
            tokenValid: false,
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
        async checkToken() {
            console.log('Memeriksa token...');
            const data = {
                token: this.token,
                verificationCode: this.verificationCode,
            };

            try {
                const response = await api.post('/checkToken', data); // Gunakan Axios untuk permintaan POST

                if (response.status === 200) {
                    this.tokenValid = true;
                    console.log('Token valid');
                    // localStorage.setItem('token', this.token); // Set token dalam localStorage jika diperlukan
                    this.$router.push('/AuthPage/SetPassword');
                } else {
                    this.tokenValid = false;
                    console.log('Token tidak valid');
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Terjadi kesalahan saat memeriksa token:', error);
                this.tokenValid = false;
            }
        },
        async resendVerificationCode() {
            if (!this.resendDisabled) {
                console.log('Mengirim ulang kode verifikasi...');
                try {
                    const response = await axios.post('/resendCode', {
                        email: this.email, // Gunakan properti email
                    });

                    if (response.status === 200) {
                        console.log('Kode verifikasi berhasil dikirim ulang.');
                    } else {
                        console.error('Terjadi kesalahan saat mengirim ulang kode verifikasi.');
                    }
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengirim ulang kode verifikasi:', error);
                }
                this.startCountdown();
            }
        },
        limitInput() {
            if (this.verificationCode.length > 4) {
                this.verificationCode = this.verificationCode.slice(0, 4);
            }
        },
        startCountdown() {
            this.countdown = 120;
            clearInterval(this.countdownInterval);
            this.countdownInterval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.countdownInterval);
                }
            }, 1000);
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
    width: 20vw;
    margin: 0 auto;
    top: 50%;
    left: 30%;
    position: absolute;
    transform: translate(50%, -50%);
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
    width: 18vw;
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
    top: 58%;
    left: 52%;
    position: absolute;
    transform: translatey(-70%);
}

.lanjut {
    width: 18vw;
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
    top: 50.7%;
    left: 50.6%;
    position: absolute;
    transform: translate(30%, -45%);
}
</style>
  