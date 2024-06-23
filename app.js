const express = require('express')
const bodyParser= require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
// const users = require('./routes/users')
console.log('hi');

app.use(bodyParser.urlencoded({extended: false}))

app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from the server' });
});
  
  // Start the server
  app.listen(3001
    , () => {
    console.log('Server is running on port 3001');
  });
