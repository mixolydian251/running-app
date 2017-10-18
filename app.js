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

 // View engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

 // Page routes
    app.use('/', run);
    app.use('/data', data);
    app.use('/settings', settings);

 // Post route
    app.post('/uploads', (req, res) => {
        console.log('You have hit the server post route!');
        var run = new Run({
            run_time: {
                total_time: req.body.run_time.total_time,
                formatted_time: req.body.run_time.formatted_time
            },
            distance: req.body.distance,
            mile_marks: req.body.mile_marks,
            upload_time: req.body.upload_time
        });

        run.save().then((result) => {
            console.log('Saved to mongoDB');
            res.send(result);
        }, (e) => {
            res.status(400).send(e);
        });
    });

 // Fetch route
    app.get('/uploads', (req, res) => {
        Run.find().then((runs) => {
            res.send({runs});
        }).catch((error) => {
            res.status(400).send(error);
        })
    });

 // Catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


 // Error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

     // Render the error page
        res.status(err.status || 500);
        res.render('error');
    });


    app.listen(port, () => {
        console.log(`server is up on port ${port}`);
    });

    module.exports = app;