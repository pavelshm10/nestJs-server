// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
// const https = require("https");
// const fs = require('fs');
const mongoose = require("./config/dbConfig");

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", productRoutes);

// const options = {
//   // key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
//   // cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
//   key: fs.readFileSync("server.key"),
//   cert: fs.readFileSync("server.cert"),
// };

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});