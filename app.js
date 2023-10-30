const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

app.all('/google', (req, res) => {
  // Teruskan permintaan ke server backend
  proxy.web(req, res, { target: 'https://brand.playease.site' });
});

// Rute dan konfigurasi lainnya Anda letakkan di sini

app.listen(PortAnda, () => {
  console.log('Server proxy berjalan di port PortAnda');
});
