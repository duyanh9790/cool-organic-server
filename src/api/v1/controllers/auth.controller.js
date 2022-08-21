const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  handleLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: 'Email là bắt buộc' });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: 'Mật khẩu là bắt buộc' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng',
      });
    }
    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      accessToken,
    });
  },
  handleRegister: async (req, res) => {
    const { email, password, fullName } = req.body;
    const saltRounds = 10;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: 'Email là bắt buộc' });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: 'Nật khẩu là bắt buộc' });
    }
    if (!fullName) {
      return res
        .status(400)
        .json({ success: false, message: 'Tên đầy đủ là bắt buộc' });
    }

    try {
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Tài khoản đã tồn tại' });
      }

      const hashPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        email,
        password: hashPassword,
        fullName,
      });

      if (!newUser) {
        return res.status(400).json({
          success: false,
          message: 'Tạo tài khoản không thành công, vui lòng thử lại!',
        });
      }

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        success: true,
        message: 'Tạo tài khoản thành công',
        accessToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Lỗi server',
      });
    }
  },
};

module.exports = authController;