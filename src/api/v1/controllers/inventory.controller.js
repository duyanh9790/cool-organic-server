const Inventory = require('../models/inventory.model');

const inventoryController = {
  addProductToInventory: async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      const product = await Inventory.create({
        productId,
        quantity,
      });
      if (!product) {
        return res.status(400).json({
          success: false,
          message: 'Thêm sản phẩm vào kho không thành công',
        });
      }
      return res.status(201).json({
        success: true,
        message: 'Thêm sản phẩm vào kho hàng thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi server! Vui lòng thử lại sau',
      });
    }
  },
  updateQuantityOfProductInInventory: async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const product = await Inventory.findById(id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: 'Cập nhật số lượng sản phẩm không thành công',
        });
      }
      product.quantity += quantity;
      await product.save();
      return res.status(200).json({
        success: true,
        message: 'Cập nhật số lượng sản phẩm thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi server! Vui lòng thử lại sau',
      });
    }
  },
  deleteProductInInventory: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Inventory.findByIdAndDelete(id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: 'Xóa sản phẩm khỏi kho không thành công',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm khỏi kho thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi server! Vui lòng thử lại sau',
      });
    }
  },
};

module.exports = inventoryController;
