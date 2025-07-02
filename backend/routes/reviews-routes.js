const express = require('express');

const reviewsControllers = require('../controllers/reviews-controllers');

const router = express.Router();

router.get('/', reviewsControllers.getReviews);

router.post('/', reviewsControllers.createReview);

router.delete('/:rid', reviewsControllers.deleteReview);

module.exports = router;