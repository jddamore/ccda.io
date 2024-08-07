const express = require("express");
const fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();
const path = require('path');
let credentials = null;
if  (fs.existsSync('./certs/ccda.io.key')) {
  privateKey  = fs.readFileSync('./certs/ccda.io.key', 'utf-8');
  certificate = fs.readFileSync('./certs/ccda.io.crt', 'utf-8');
  ca = fs.readFileSync('./certs/ccda.io.ca-bundle', 'utf-8')
  credentials = {key: privateKey, cert: certificate, ca: ca};
}
const index = fs.readFileSync('./build/index.html', 'utf-8');

let now = new Date().toISOString();

app.use(express.static(path.join(__dirname, './build')));

app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

var httpServer = http.createServer(app);
let httpsServer;
if (credentials) {
  httpsServer = https.createServer(credentials, app);
}

httpServer.listen(80);
if (httpsServer) {
  httpsServer.listen(443);
  console.log('listening on HTTP and HTTPS...')
}
else console.log('HTTPS server not running...')