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
        required: true,
        default: []
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Transformation', transformationSchema);