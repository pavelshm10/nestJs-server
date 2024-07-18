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
  origin: 'https://main.d3rbcp5dx3dvou.amplifyapp.com/', // Allow all origins
  optionsSuccessStatus: 200,
  rejectUnauthorized: false
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", productRoutes);

const options = {
  // key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  // cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const server = https.createServer(options, app);

const PORT = process.env.PORT || 443;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// https.createServer(options, app).listen(3000, () => {
//   console.log("HTTPS Server running on port 3000");
// });
