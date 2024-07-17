const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const https = require("https");
const fs = require('fs');
const mongoose = require("./config/dbConfig");
const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore SSL certificate errors
});
const app = express();
app.use(cors({
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", productRoutes);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS Server running on port 3000");
});
