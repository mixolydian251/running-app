
const mongoose = require('mongoose');

var Run = mongoose.model('Run', {
    run_time: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    distance: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = {Run};