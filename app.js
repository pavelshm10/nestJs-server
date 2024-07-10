const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const https = require("https");
const fs = require('fs');
const mongoose = require("./config/dbConfig");
const corsOptions = {
  origin: "https://pavelshm10.github.io/nestjs/", // Replace with your GitHub Pages URL
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// const corsOptions = {
//   origin: '*', // Update with specific origin for production
//   optionsSuccessStatus: 200
// };
const app = express();
app.use(cors(corsOptions));
// app.options('/api/products', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", productRoutes);

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

https.createServer(options, app).listen(3000, () => {
  console.log("HTTPS Server running on port 3000");
});
