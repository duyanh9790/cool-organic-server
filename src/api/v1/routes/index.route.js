const Router = require('express').Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const productRouter = require('./product.route');
const categoryRouter = require('./category.route');
const sortTypeRouter = require('./sortType.route');

Router.use('/users', userRouter);
Router.use('/auth', authRouter);
Router.use('/products', productRouter);
Router.use('/categories', categoryRouter);
Router.use('/sort-type', sortTypeRouter);

module.exports = Router;
