var express = require('express');
var router = express.Router();

/* GET run page. */
router.get('/', function(req, res, next) {
    res.render('run', { title: 'Run' });
});

module.exports = router;