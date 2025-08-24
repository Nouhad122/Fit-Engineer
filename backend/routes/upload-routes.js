const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const uploadControllers = require('../controllers/upload-controllers');

const router = express.Router();

// Protected route for uploading images
router.post('/', auth, upload.array('images', 5), uploadControllers.uploadImages);
router.delete('/:imageUrl', auth, uploadControllers.deleteImage);

module.exports = router;
