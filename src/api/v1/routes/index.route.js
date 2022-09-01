const Router = require('express').Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const productRouter = require('./product.route');

Router.use('/users', userRouter);
Router.use('/auth', authRouter);
Router.use('/products', productRouter);

module.exports = Router;
