const Router = require('express').Router();

const authController = require('../controllers/auth.controller');

Router.post('/login', authController.handleLogin);
Router.post('/register', authController.handleRegister);

module.exports = Router;
