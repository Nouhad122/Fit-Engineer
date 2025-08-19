const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    clientName:{
        type: String,
        required: true
    },
    
    reviewText:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema);