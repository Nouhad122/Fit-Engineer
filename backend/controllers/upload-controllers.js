const HttpError = require('../models/http-error');
const path = require('path');
const fs = require('fs');

exports.uploadImages = async (req, res, next) => {
        try {
          if (!req.files || req.files.length === 0) {
            const error = new HttpError('No files were uploaded.', 400);
            return next(error);
          }
      
          const uploadedFiles = req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: `/uploads/${file.filename}`
          }));
      
          res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            files: uploadedFiles
          });
        } catch (error) {
          next(error);
        }
}

exports.deleteImage = async (req, res, next) => {
  try{
    const { imageUrl } = req.params;
    const imagePath = path.join(__dirname, '..', 'public', imageUrl);

    if(!fs.existsSync(imagePath)) {
      const error = new HttpError('Image not found.', 404);
      return next(error);
    }

    fs.unlinkSync(imagePath);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}