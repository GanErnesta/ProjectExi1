<template>
    <div class="card">
        <div class="card-header">
            <h3>Please input your email, and we will send <br> your link for setting password</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="sendResetPasswordEmail">
                <div class="form-group">
                    <label for="email">
                        <img src="~/assets/email.svg" alt="" style="margin-right: 2px;">
                        Email
                    </label>
                    <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
                </div>
                <div class="form-group">
                    <button type="submit">SEND</button>
                </div>
            </form>
            <!-- <Navbar /> -->
        </div>
    </div>
</template>
  
<script>
import Navbar from '../Navbar.vue';
import api from '~/api';
export default {
    data() {
        return {
            email: "",
        };
    },
    methods: {
        async sendResetPasswordEmail() {
            try {
                // Ganti URL_API_SEND_EMAIL dengan URL API yang  sesuai
                const response = await api.post('/api/sendEmail', {
                    email: this.email,
                });
                if (response.status === 200) {
                    // Email pengaturan ulang password berhasil dikirim
                    sessionStorage.setItem('email', this.email);
                    console.log('Email berhasil dikirim ' +  response.status);
                    this.$router.push('/AuthPage/ResendCode');

                } else {
                    console.error('Gagal mengirim email pengaturan ulang password');
                }
            } catch (error) {
                // Tangani kesalahan jika terjadi error
                console.error('Terjadi kesalahan saat mengirim email pengaturan ulang password:', error);
            }
        },
    },
    components: { Navbar }
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    width: 20vw;
    height: 22vh;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 5px 6px #0000004b;
    top: 50%;
    left: 25%;
    position: absolute;
    transform: translate(70%, -50%);
}

.card-header {
    margin-bottom: 20px;
}

.card-header h3 {
    margin-bottom: 20px;
    font: normal normal normal 14px/17px Barlow;
}

.form-group {
    margin: 10px 0;
    align-items: center;
}

label {
    font: normal normal normal 12px/12px Barlow;
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 5px;
}

label v-icon {
    margin-right: 10px;
}

input[type="email"] {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border-radius: 15px;
    border: 1px solid #ccc;
    outline: none;
}

button {
    background: transparent linear-gradient(97deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    cursor: pointer;
    font: normal normal normal 20px/24px Helvetica;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
    width: 18vw;
}

button:hover {
    background-color: #0056b3;
}
</style>