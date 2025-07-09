const express = require('express');
const auth = require('../middleware/auth');
const reviewsControllers = require('../controllers/reviews-controllers');

const router = express.Router();

// Public route for creating reviews
router.post('/', reviewsControllers.createReview);

// Protected routes for admin operations
router.get('/', auth, reviewsControllers.getReviews);
router.delete('/:rid', auth, reviewsControllers.deleteReview);

module.exports = router;