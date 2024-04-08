const express = require('express');

const router = express.Router();

router.get('/users', (req, res, next) => {
    console.log("middle");
    res.send('<h1>users</h1>');
})

router.use('/add-user', (req, res, next) => {
    console.log("middle");
    res.send('<h1>users123</h1>');
})

module.exports = router;