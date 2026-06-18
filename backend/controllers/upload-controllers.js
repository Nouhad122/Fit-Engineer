const HttpError = require('../models/http-error');
const path = require('path');
const fs = require('fs');
const { isCloudinaryConfigured, uploadBuffer, deleteImage: deleteCloudinaryImage } = require('../utils/cloudinary');

exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      const error = new HttpError('No files were uploaded.', 400);
      return next(error);
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        if (isCloudinaryConfigured()) {
          const result = await uploadBuffer(file.buffer, file.originalname);
          return {
            filename: result.public_id,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: result.secure_url,
          };
        }

        return {
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          url: `/uploads/${file.filename}`,
        };
      })
    );

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.params;
    const decodedUrl = decodeURIComponent(imageUrl);

    if (decodedUrl.startsWith('http://') || decodedUrl.startsWith('https://')) {
      await deleteCloudinaryImage(decodedUrl);
    } else {
      const imagePath = path.join(__dirname, '..', 'public', decodedUrl);

      if (!fs.existsSync(imagePath)) {
        const error = new HttpError('Image not found.', 404);
        return next(error);
      }

      fs.unlinkSync(imagePath);
    }

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
