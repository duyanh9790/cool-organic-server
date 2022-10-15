const Category = require('../models/category.model');
const generateSlug = require('../utils/generateSlug');

const categoryController = {
  createCategory: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên danh mục!',
      });
    }
    try {
      const categorySlug = generateSlug(name);
      const category = await Category.create({ name, categorySlug });
      if (!category) {
        return res.status(500).json({
          success: false,
          message: 'Tạo danh mục thất bại, Vui lòng thử lại sau!',
        });
      }
      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Tạo danh mục thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  getAllCategories: async (req, res) => {
    const { limit } = req.query;
    try {
      if (limit) {
        const categories = await Category.find().limit(Number(limit));
        return res.status(200).json({
          success: true,
          categories,
        });
      }

      const categories = await Category.find();
      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy thống tin danh mục thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  getCategoryBySlug: async (req, res) => {
    const { slug } = req.params;
    try {
      const category = await Category.findOne({ categorySlug: slug });
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy danh mục',
        });
      }
      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy thông tin danh mục thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  updateCategory: async (req, res) => {
    const { slug } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tên danh mục!',
      });
    }
    try {
      const categorySlug = generateSlug(name);
      const category = await Category.findOneAndUpdate(
        { categorySlug: slug },
        { name, categorySlug },
        {
          new: true,
        }
      );
      if (!category) {
        return res.status(500).json({
          success: false,
          message: 'Cập nhật danh mục thất bại, Vui lòng thử lại sau!',
        });
      }
      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Cập nhật danh mục thất bại, Vui lòng thử lại sau!',
      });
    }
  },
  deleteCategory: async (req, res) => {
    const { slug } = req.params;
    try {
      const category = await Category.findOneAndDelete({ categorySlug: slug });
      if (!category) {
        return res.status(500).json({
          success: false,
          message: 'Xóa danh mục thất bại, Vui lòng thử lại sau!',
        });
      }
      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Xóa danh mục thất bại, Vui lòng thử lại sau!',
      });
    }
  },
};

module.exports = categoryController;
