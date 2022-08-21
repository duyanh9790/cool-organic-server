const Router = require('express').Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');

Router.use('/users', userRouter);
Router.use('/auth', authRouter);

module.exports = Router;
