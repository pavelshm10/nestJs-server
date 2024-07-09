
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://pavelsh00:tYw7Z7elnXO3K9jS@test.4bsjii7.mongodb.net/?retryWrites=true&w=majority&appName=Test';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
    family: 4 // Use IPv4, skip trying IPv6
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB connected successfully123');
});

// Test a simple query
const testConnection = async () => {
    try {
      const result = await db.admin().ping();
      console.log('Ping result:', result);
    } catch (err) {
      console.error('Error pinging MongoDB:', err);
    }
  };
  
  testConnection();

module.exports = mongoose;

