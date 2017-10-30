var mongoose = require('mongoose');

// if in development 'mongodb://localhost:27017/RunApp'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://my_mongodb:27017/RunApp', {useMongoClient: true});

module.exports = {
    mongoose: mongoose
};