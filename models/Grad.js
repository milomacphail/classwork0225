const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GradSchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    yearOfGraduation : {
        type: Date,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    } 
})

module.exports = Grad = mongoose.model("grads", GradSchema);