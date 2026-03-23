// console.js

const express = require('express');
const router = express.Router();

// Example endpoint to log a message
router.get('/log-message', (req, res) => {
    console.log('Log message endpoint hit');
    res.send('Message logged to console');
});

// Example endpoint to log request details
router.post('/log-request', (req, res) => {
    console.log('Request details:', req.body);
    res.send('Request details logged to console');
});

module.exports = router;