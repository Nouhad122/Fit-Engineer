const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    activity: {type: String, required: true},
    age: {type: String, required: true},
    allergies: {type: String, required: true},
    email: {type: String, required: true},
    fullName: {type: String, required: true},
    gender: {type: String, required: true},
    height: {type: String, required: true},
    injuries: {type: String, required: true},
    mainGoal: {type: String, required: true},
    notes: {type: String, required: false},
    otherGoal: {type: String, required: false},
    pedExperience: {type: String, required: true},
    pedExplain: {type: String, required: false},
    weight: {type: String, required: true},
    weightGoal: {type: String, required: true},
    whatsapp: {type: String, required: true},
    workoutType: {type: String, required: true},
});

module.exports = mongoose.model('Client', clientSchema);