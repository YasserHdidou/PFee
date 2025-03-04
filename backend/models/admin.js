const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt received:', req.body); // Log received data

  try {
    // Check if admin exists in the database
    const admin = await Admin.findOne({ username });
    console.log('Admin found in database:', admin);  // Log admin from DB

    if (!admin) {
      console.log('Admin not found');  // Log if admin is not found
      return res.status(404).json({ msg: 'Admin not found' });
    }

    // Compare the password provided with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch);  // Log password comparison result

    if (!isMatch) {
      console.log('Invalid credentials');  // Log if password doesn't match
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Successful login
    console.log('Login successful');
    res.status(200).json({ msg: 'Admin logged in successfully' });

  } catch (error) {
    console.error('Error during admin login:', error);  // Log any errors
    res.status(500).json({ msg: 'Server error', error });
  }
});

module.exports = router;
