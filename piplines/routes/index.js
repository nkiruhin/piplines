'use strict';
var express = require('express');
var { getUsername } = require('../controllers/users');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    if (req.app.locals.username === '') {
        getUsername(req, res);
        return;
    }
    res.render('index', { username:req.app.locals.username  });
});

module.exports = router;
