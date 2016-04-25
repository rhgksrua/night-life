'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('api v1');
});

router.get('/login', login);
router.get('/logout', logout);

function login(req, res) {
    res.json({endpoint: 'login'});
}

function logout(req, res) {
    res.json({endpoint: 'logout'});
}

module.exports = router;