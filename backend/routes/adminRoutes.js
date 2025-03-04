const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/auth');

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Log the received login data for debugging
  console.log('Received login data:', req.body);

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log('Admin not found in database'); // Log if admin is not found
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Log the found admin object (be careful, don't log sensitive data like password)
    console.log('Admin found:', admin);

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Password mismatch'); // Log if password doesn't match
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Successful login
    console.log('Login successful'); // Log if login is successful
    res.status(200).json({ msg: 'Admin logged in successfully' });

  } catch (error) {
    // Log the error if something goes wrong
    console.error('Error during admin login:', error);
    res.status(500).json({ msg: 'Server error', error }); // Log and send error response
  }
});

module.exports = router;
