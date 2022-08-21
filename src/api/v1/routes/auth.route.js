const Router = require('express').Router();

const authController = require('../controllers/auth.controller');

Router.get('/login', authController.handleLogin);
Router.get('/register', authController.handleRegister);

module.exports = Router;
