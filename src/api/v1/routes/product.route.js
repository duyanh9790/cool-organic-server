const Router = require('express').Router();

const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken');

Router.post('/create', verifyToken, productController.createProduct);

Router.get('/', productController.getAllProducts);
Router.get('/:slug', productController.getProductBySlug);

Router.put('/:slug', productController.updateProduct);

Router.delete('/:slug', productController.deleteProduct);

module.exports = Router;
