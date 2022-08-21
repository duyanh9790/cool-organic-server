const Router = require('express').Router();

const userController = require('../controllers/user.controller');

Router.get('/', userController.getAllUsers);

module.exports = Router;
