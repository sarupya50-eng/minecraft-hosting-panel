const express = require('express');
const router = express.Router();

// Mock user database
let users = [];

// Register endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Basic validation
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if(existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }
    // Register user
    users.push({ username, password });
    return res.status(201).json({ message: 'User registered successfully.' });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Basic validation
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
    // Check if user exists
    const user = users.find(user => user.username === username);
    if(!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    // Check password
    if(user.password !== password) {
        return res.status(401).json({ message: 'Invalid password.' });
    }
    return res.status(200).json({ message: 'Login successful.' });
});

module.exports = router;