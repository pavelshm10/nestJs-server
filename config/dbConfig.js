
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://pavelsh00:tYw7Z7elnXO3K9jS@test.4bsjii7.mongodb.net/?retryWrites=true&w=majority&appName=Test';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 30000 });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB connected successfully123');
});

module.exports = mongoose;

