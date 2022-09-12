const Product = require('../models/product.model');

const generateSlug = require('../utils/generateSlug');

const productController = {
  createProduct: async (req, res) => {
    const {
      name,
      category,
      price,
      discount,
      status,
      quantity,
      origin,
      supplier,
      weight,
      unit,
      description,
    } = req.body;

    const isValidateFalse =
      !name ||
      !category ||
      !discount ||
      !status ||
      !quantity ||
      !origin ||
      !supplier ||
      !weight ||
      !unit ||
      !price ||
      !description;
    if (isValidateFalse) {
      return res.status(400).json({
        message: 'Vui lòng nhập đủ tất cả các trường bắt buộc!',
      });
    }

    try {
      const slug = generateSlug(name);
      const categorySlug = generateSlug(category);
      const product = await Product.create({
        name,
        category,
        categorySlug,
        price,
        discount,
        status,
        quantity,
        origin,
        supplier,
        weight,
        unit,
        slug,
        description,
        userId: req.userId,
      });

      if (!product) {
        return res.status(500).json({
          success: false,
          message: 'Tạo sản phẩm thất bại, Vui lòng thử lại!',
        });
      }

      return res.status(201).json({
        success: true,
        message: 'Tạo sản phẩm thành công',
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Tạo sản phẩm thất bại, Vui lòng thử lại!',
      });
    }
  },
  getAllProducts: async (req, res) => {
    let { page, limit = 8 } = req.query;
    try {
      if (page) {
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;
        const products = await Product.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);

        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        if (!products) {
          return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra, Vui lòng thử lại!',
          });
        }

        return res.status(200).json({
          success: true,
          products,
          currentPage: page,
          prePage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
          totalPages,
          totalProducts,
        });
      } else {
        const products = await Product.find({});

        if (!products) {
          return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra, Vui lòng thử lại!',
          });
        }

        return res.status(200).json({
          success: true,
          products,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, Vui lòng thử lại!',
      });
    }
  },
  getProductBySlug: async (req, res) => {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy sản phẩm!',
      });
    }
    try {
      const product = await Product.findOne({ slug });
      if (!product) {
        return res.status(500).json({
          success: false,
          message: 'Không có sản phẩm này, Vui lòng thử lại!',
        });
      }

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lấy thông tin sản phẩm không thành công, Vui lòng thử lại!',
      });
    }
  },
  getProductsByCategory: async (req, res) => {
    const { categorySlug } = req.params;
    let { page, limit = 8 } = req.query;
    if (!categorySlug) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn danh mục',
      });
    }
    try {
      if (page) {
        page = Number(page);
        limit = Number(limit);
        const skip = (page - 1) * limit;
        const products = await Product.find({ categorySlug })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(skip);

        const totalProducts = await Product.countDocuments({ categorySlug });
        const totalPages = Math.ceil(totalProducts / limit);

        if (!products) {
          return res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra, Vui lòng thử lại!',
          });
        }

        if (products.length === 0) {
          return res.status(200).json({
            success: true,
            message: 'Không có sản phẩm nào trong danh mục này!',
          });
        }

        return res.status(200).json({
          success: true,
          products,
          currentPage: page,
          prePage: page > 1 ? page - 1 : null,
          nextPage: page < totalPages ? page + 1 : null,
          totalPages,
          totalProducts,
        });
      }

      console.log('vẫn xuống');

      const products = await Product.find({ categorySlug });
      if (!products) {
        return res.status(500).json({
          success: false,
          message:
            'Không có sản phẩm nào trong danh mục này, Vui lòng thử lại!',
        });
      }

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại!',
      });
    }
  },
  updateProduct: async (req, res) => {
    const { slug } = req.params;
    const {
      name,
      category,
      price,
      discount,
      status,
      quantity,
      origin,
      supplier,
      weight,
      unit,
      description,
    } = req.body;

    const isValidateFalse =
      !name ||
      !category ||
      !discount ||
      !status ||
      !quantity ||
      !origin ||
      !weight ||
      !unit ||
      !price ||
      !description;
    if (isValidateFalse) {
      return res.status(400).json({
        message: 'Vui lòng nhập đủ tất cả các trường bắt buộc!',
      });
    }

    try {
      const newSlug = generateSlug(name);
      const categorySlug = generateSlug(category);
      const product = await Product.findOneAndUpdate(
        { slug },
        {
          name,
          category,
          categorySlug,
          price,
          discount,
          status,
          quantity,
          origin,
          supplier,
          weight,
          unit,
          slug: newSlug,
          description,
        },
        { new: true }
      );
      if (!product) {
        return res.status(500).json({
          success: false,
          message:
            'Cập nhật thông tin sản phẩm không thành công, Vui lòng thử lại!',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin sản phẩm thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          'Cập nhật thông tin sản phẩm không thành công, Vui lòng thử lại!',
      });
    }
  },
  deleteProduct: async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await Product.findOneAndDelete({ slug });
      if (!product) {
        return res.status(500).json({
          success: false,
          message: 'Xóa sản phẩm không thành công, Vui lòng thử lại!',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Xóa sản phẩm thành công',
        product,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Xóa sản phẩm không thành công, Vui lòng thử lại!',
      });
    }
  },
  searchProduct: async (req, res) => {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập từ khóa tìm kiếm',
      });
    }
    try {
      const products = await Product.find({
        name: { $regex: q, $options: 'i' },
      });

      if (products.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'Không có sản phẩm nào phù hợp',
        });
      }

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Không có sản phẩm nào phù hợp',
      });
    }
  },
};

module.exports = productController;
