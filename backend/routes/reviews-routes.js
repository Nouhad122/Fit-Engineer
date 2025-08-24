const express = require('express');
const auth = require('../middleware/auth');
const { validateReviewForm } = require('../middleware/validation');
const reviewsControllers = require('../controllers/reviews-controllers');

const router = express.Router();

// Public route for getting reviews
router.get('/', reviewsControllers.getReviews);

// Protected routes for admin operations
router.post('/', auth, validateReviewForm, reviewsControllers.createReview);
router.delete('/:rid', auth, reviewsControllers.deleteReview);

module.exports = router;