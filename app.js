const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const https = require("https");
const fs = require("fs");
const WebSocket = require("ws");
const mongoose = require("./config/dbConfig");
const Product = require("./models/productModel");
const { ApolloServer } = require("apollo-server-express");
const productTypeDefs = require("./typeDefs/productTypeDefs");
const productResolvers = require("./resolvers/productResolvers");
const app = express();

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  // credentials: true,
  allowedHeaders: ["Content-Type"],
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Function to fetch and log products using resolvers
const logProducts = async () => {
  try {
    const products = await productResolvers.Query.products();
    console.log("Products:", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Log products to console
// logProducts();

//use controller to get data
// app.use("/api", productRoutes);

// GrapthQL Create Apollo Server
const server = new ApolloServer({
  typeDefs: [productTypeDefs],
  resolvers: [productResolvers],
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Read SSL certificate and key
  // Load your self-signed SSL certificates
  const privateKey = fs.readFileSync("mydomain.key");
  const certificate = fs.readFileSync("mydomain.crt");
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  // Create HTTPS server
  https.createServer(credentials, app).listen({ port: 3000 }, () => {
    console.log(
      `🚀 Server ready at https://localhost:3000${server.graphqlPath}`
    );
  });
});

// Load your self-signed SSL certificates
// const privateKey = fs.readFileSync("mydomain.key");
// const certificate = fs.readFileSync("mydomain.crt");
// const credentials = {
//   key: privateKey,
//   cert: certificate,
// };
// // const server = https.createServer(credentials, app);
// Start the server on port 3000
// server.listen(3000, () => {
//   console.log("Server running on https://localhost:3000/");
// });

/*************************  WEB SOCKET *****************************/

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('New client connected');
//   ws.on('message', (message) => {
//       console.log(`Received message => ${message}`);
//   });
//   ws.on('close', () => {
//       console.log('Client disconnected');
//   });
// });

// Broadcast function to send data to all clients
// const broadcast = (data) => {
//   wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         // console.log({data});
//         client.send(JSON.stringify(data));
//       }
//   });
// };

// Example of broadcasting data periodically (you should replace this with your own logic)
// setInterval(async () => {
//   const products = await Product.find();
//   broadcast({ type: 'PRODUCTS_UPDATE', data: products });
// }, 5000);
