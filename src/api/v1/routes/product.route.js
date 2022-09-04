const Router = require('express').Router();

const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

Router.post('/create', verifyToken, isAdmin, productController.createProduct);

Router.get('/', productController.getAllProducts);
Router.get('/category/:categorySlug', productController.getProductsByCategory);
Router.get('/:slug', productController.getProductBySlug);

Router.put('/:slug', verifyToken, isAdmin, productController.updateProduct);

Router.delete('/:slug', verifyToken, isAdmin, productController.deleteProduct);

module.exports = Router;
