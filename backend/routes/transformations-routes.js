const express = require('express');
const auth = require('../middleware/auth');
const { validateTransformationForm } = require('../middleware/validation');
const transformationsControllers = require('../controllers/transformations-controllers');

const router = express.Router();

// Public route for getting transformations
router.get('/', transformationsControllers.getTransformations);

// Protected routes for admin operations
router.post('/', auth, validateTransformationForm, transformationsControllers.createTransformation);
router.delete('/:tid', auth, transformationsControllers.deleteTransformation);

module.exports = router;