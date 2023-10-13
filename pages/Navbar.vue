<template>
    <v-app>
      <v-app-bar app>
        <img src="~/assets/logo2.png" alt="Logo" />
        <v-toolbar-title style="font-family: 'Barlow', sans-serif;
        margin-left: 19px;
        font-size: 19px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;">BRAND</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon style="color: #ffffff;">mdi-bell</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main>
        <!-- Konten utama aplikasi Anda akan ada di sini -->
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
    
  <script>
  export default {
    data() {
      return {
        drawer: false,
      };
    },
  };
  </script>
    
  <style>
  .v-application {
    background-color: #efefef;
  }

  .v-app-bar {
    
    background: transparent linear-gradient(90deg, #4E6EAF 0%, #A993D3 100%) 0% 0% no-repeat padding-box;
    box-shadow: 0px 10px 6px #00000007;
    opacity: 1;
  }

  .v-toolbar-title {
    font-family: 'Barlow', sans-serif;
    font-size: 24px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #ffffff;
  }
  </style>