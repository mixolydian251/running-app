var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var run = require('./routes/run_route');
var data = require('./routes/data_route');
var settings = require('./routes/settings_route');
var {mongoose} = require('./db/mongoose');
var {Run} = require('./models/run_model');

const port = process.env.PORT || 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.render('run.hbs')
// });

app.use('/', run);
app.use('/data', data);
app.use('/settings', settings);

//post routes
app.post('/request', (req, res) => {
    console.log('You have hit the server post route!');
    var example = new Example({
        name: req.body.name,
        email: req.body.email
    });

    example.save().then((doc) => {
        console.log('Saved to mongoDB');
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//post routes
app.post('/request2', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });



// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });


app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});

module.exports = app;