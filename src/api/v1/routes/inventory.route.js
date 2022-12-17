const Router = require('express').Router();

const inventoryController = require('../controllers/inventory.controller');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

Router.post(
  '/',
  verifyToken,
  isAdmin,
  inventoryController.addProductToInventory
);

Router.put(
  '/:id',
  verifyToken,
  isAdmin,
  inventoryController.updateQuantityOfProductInInventory
);
Router.delete(
  '/:id',
  verifyToken,
  isAdmin,
  inventoryController.deleteProductInInventory
);

module.exports = Router;
