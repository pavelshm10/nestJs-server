// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const https = require("https");
const fs = require('fs');
const mongoose = require("./config/dbConfig");

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  // credentials: true,
  allowedHeaders: ['Content-Type'],
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", productRoutes);

// Load your self-signed SSL certificates
const privateKey = fs.readFileSync('mydomain.key');
const certificate = fs.readFileSync('mydomain.crt');

const credentials = {
  key: privateKey,
  cert: certificate
};

https.createServer(credentials, app).listen(3000, () => {
  console.log('Server running on https://localhost:3000/');
});