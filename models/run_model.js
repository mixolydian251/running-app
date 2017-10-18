
const mongoose = require('mongoose');

var Run = mongoose.model('Run', {
    run_time: {
        total_time: {
            type: Number,
            required: true,
        },
        formatted_time : {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    },
    distance: {
        type: Number,
        required: true,
    },
    mile_marks: {
        type: Array,
        required: false
    },
    upload_time: {
        type: Number,
        required: true
    }
});

module.exports = {Run};