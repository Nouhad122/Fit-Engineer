const HttpError = require('../models/http-error');
const uuid = require('uuid');
const Review = require('../models/review');

exports.getReviews = async (req, res, next) =>{
    let reviews;
     try{
        reviews = await Review.find();
     }
     catch(err){
        const error = new HttpError('Something went wrong, could not find reviews.', 500);
        return next(error);
     }
     res.json({reviews: reviews.map(review => review.toObject({getters: true}))});
}

exports.createReview = async(req, res, next) =>{
    const { clientName, reviewText } = req.body;
    const createdReview = new Review({
        id: uuid.v4(),
        clientName,
        reviewText
    });
    
    try{
        await createdReview.save();
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not create review.', 500);
        return next(error);
    }
    res.status(201).json({review: createdReview});
}

exports.deleteReview = async(req, res, next) =>{
    const reviewId = req.params.rid;
    try{
        const review = await Review.findByIdAndDelete(reviewId);
        if(!review){
            return next(new HttpError('Could not find a review for the provided id.', 404));
        }
        res.status(200).json({message: 'Review deleted.'});
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not delete review.', 500);
        return next(error);
    }
}
