const HttpError = require('../models/http-error');
const Review = require('../models/review');

exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find().sort({ _id: -1 });
        
        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews: reviews.map(review => review.toObject({ getters: true }))
        });
    } catch (err) {
        console.error('Get reviews error:', err);
        const error = new HttpError('Something went wrong, could not find reviews.', 500);
        return next(error);
    }
};

exports.createReview = async (req, res, next) => {
    const { clientName, reviewText } = req.body;
    
    if (!clientName || !reviewText) {
        const error = new HttpError('Client name and review text are required.', 400);
        return next(error);
    }
    
    const createdReview = new Review({
        clientName: clientName.trim(),
        reviewText: reviewText.trim(),
    });
    
    try {
        const savedReview = await createdReview.save();
        
        res.status(201).json({
            success: true,
            message: 'Review created successfully',
            review: savedReview.toObject({ getters: true })
        });
    } catch (err) {
        console.error('Create review error:', err);
        const error = new HttpError('Something went wrong, could not create review.', 500);
        return next(error);
    }
};

exports.deleteReview = async (req, res, next) => {
    const reviewId = req.params.rid;
    
    if (!reviewId) {
        const error = new HttpError('Review ID is required.', 400);
        return next(error);
    }
    
    try {
        const review = await Review.findByIdAndDelete(reviewId);
        
        if (!review) {
            const error = new HttpError('Could not find a review for the provided id.', 404);
            return next(error);
        }
        
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully.',
            deletedReview: review.toObject({ getters: true })
        });
    } catch (err) {
        console.error('Delete review error:', err);
        const error = new HttpError('Something went wrong, could not delete review.', 500);
        return next(error);
    }
};


