const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authController = {
  handleLogin: (req, res) => {
    res.send('handleLogin');
  },
  handleRegister: (req, res) => {
    res.send('handleRegister');
  },
};

module.exports = authController;
