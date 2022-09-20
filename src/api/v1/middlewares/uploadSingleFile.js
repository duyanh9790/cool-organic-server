const cloudinary = require('../utils/cloudinary');

const upLoadSingleFile = async (req, res, next) => {
  const uploader = async (file) =>
    await cloudinary.uploadImage(res, file, 'Images');

  if (req.method === 'POST') {
    const file = req.file;
    console.log('file', file);
    const image = await uploader(file);
    console.log('image: ', image);
    req.image = image;
    next();
  } else {
    res.status(405).json({
      success: false,
      message: 'Tải ảnh chỉ hỗ trợ phương thức POST',
    });
  }
};

module.exports = upLoadSingleFile;
