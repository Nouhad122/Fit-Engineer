const express = require('express');
const auth = require('../middleware/auth');
const { validateReview } = require('../middleware/validation');
const reviewsControllers = require('../controllers/reviews-controllers');

const router = express.Router();

// Public route for creating reviews
router.get('/', reviewsControllers.getReviews);

// Protected routes for admin operations
router.post('/', auth, validateReview, reviewsControllers.createReview);
router.delete('/:rid', auth, reviewsControllers.deleteReview);

module.exports = router;