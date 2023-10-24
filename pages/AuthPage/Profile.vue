<template>
    <div class="profile-card">
        <div class="profile-circle">
            <img src="~/assets/pp.png" alt="User Profile" />
        </div>
        <div class="profile-info">
            <h2>Welcome Back</h2>
            <p>{{ userData.name }}</p>
        </div>
        <router-link to="/AuthPage/Login">
            <button @click="logout">LOG OUT</button>
        </router-link>
    </div>
</template>

<script setup>
import api from '~/api';
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Mengambil token dari localStorage
const token = localStorage.getItem('token', token);

const userData = ref({}); // Menggunakan objek kosong untuk menyimpan data pengguna

const getUserData = async () => {
    try {
        const response = await axios.get('https://1209-118-99-91-15.ngrok-free.app/api/profile', {
            Headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        userData.value = response.data;
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
    }
};

const logout = () => {
    // Menghapus token dari localStorage
    localStorage.removeItem('token');
    // Mengarahkan pengguna ke halaman login
    router.push('/AuthPage/login');
};

onMounted(() => {
    getUserData();
});
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