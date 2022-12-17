const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        return res.status(404).json({
          success: false,
          message: 'Hiện không có người dùng nào trong hệ thống',
        });
      }

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ, vui lòng thử lại sau!',
      });
    }
  },
  changePassword: async (req, res) => {
    const { password, newPassword } = req.body;
    const userId = req.userId;

    const saltRounds = 10;

    if (!password || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin truyền lên',
      });
    }

    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy người dùng',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Mật khẩu cũ không chính xác, Vui lòng thử lại!',
        });
      }

      const hashPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: 'Đổi mật khẩu thành công',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ, vui lòng thử lại sau!',
      });
    }
  },
  updateUser: async (req, res) => {
    const { fullName } = req.body;
    const userId = req.userId;

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu thông tin truyền lên',
      });
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { fullName: fullName },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Cập nhật thông tin thất bại, Vui lòng thử lại!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Cập nhật thông tin thành công',
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Lỗi máy chủ, vui lòng thử lại sau!',
      });
    }
  },
};

module.exports = userController;
