const Order = require('../models/order.model');
const Inventory = require('../models/inventory.model');
const orderService = require('../services/order.service');

const OrderController = {
  createOrder: async (req, res) => {
    let {
      email,
      fullName,
      phone,
      city,
      district,
      ward,
      comment,
      shippingMethod,
      shippingFee,
      paymentMethod,
      totalPrice,
      cart,
    } = req.body;
    if (
      !email ||
      !fullName ||
      !phone ||
      !city ||
      !district ||
      !ward ||
      !shippingMethod ||
      !shippingFee ||
      !paymentMethod ||
      !totalPrice ||
      !cart
    ) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập đầy đủ thông tin!',
      });
    }
    shippingMethod = orderService.handleShippingMethod(shippingMethod);
    paymentMethod = orderService.handlePaymentMethod(paymentMethod);

    try {
      const order = await Order.create({
        email,
        fullName,
        phone,
        city,
        district,
        ward,
        comment,
        shippingMethod,
        shippingFee,
        paymentMethod,
        totalPrice,
        cart,
        userId: req.userId,
      });
      if (!order) {
        return res.status(500).json({
          success: false,
          message: 'Đặt hàng thất bại, Vui lòng thử lại sau!',
        });
      }

      // Update inventory
      const handleUpdateInventory = async () => {
        for (const item of cart) {
          const product = await Inventory.findOne({
            productId: item.product._id,
          }).populate('productId');
          if (!product) {
            return res.status(500).json({
              success: false,
              message: 'Đặt hàng thất bại, Vui lòng thử lại sau!',
            });
          }
          product.quantity -= item.quantity;
          if (product.quantity < 0) {
            product.quantity = 0;
            return res.status(500).json({
              success: false,
              message: `Sản phẩm ${product.productId.name} đã hết hàng! Vui lòng thử lại sau!`,
            });
          }
          await product.save();
        }
      };

      await handleUpdateInventory();

      return res.status(200).json({
        success: true,
        message: 'Đặt hàng thành công!',
        order,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Đặt hàng thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find({}).sort({ createdAt: -1 });

      if (!orders) {
        return res.status(500).json({
          success: false,
          message: 'Không tìm thấy đơn hàng nào!',
        });
      }

      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy đơn hàng thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  getOrdersByUserId: async (req, res) => {
    const userId = req.userId;
    try {
      const orders = await Order.find({
        userId,
      });
      if (!orders) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đơn hàng!',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy đơn hàng thành công!',
        orders,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy đơn hàng thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  getOrderByOrderId: async (req, res) => {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu dữ liệu orderId!',
      });
    }
    try {
      const order = await Order.findOne({
        _id: orderId,
        userId: req.userId,
      });
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy đơn hàng!',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lấy đơn hàng thành công!',
        order,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy đơn hàng thất bại, Vui lòng thử lại sau!',
      });
    }
  },
};

module.exports = OrderController;
