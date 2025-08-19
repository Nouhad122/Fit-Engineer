const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transformationSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },

    transformationText: {
        type: String,
        required: true
    },
    
    transformationImages: {
        type: [String],
        required: false //need to change to true after image upload is implemented
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transformation', transformationSchema);