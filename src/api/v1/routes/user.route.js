const Router = require('express').Router();

const userController = require('../controllers/user.controller');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

Router.get('/', verifyToken, isAdmin, userController.getAllUsers);

Router.post('/change-password', verifyToken, userController.changePassword);
Router.put('/', verifyToken, userController.updateUser);

module.exports = Router;
