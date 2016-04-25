var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var userRoutes = require('./routes/api/user');

require('dotenv').load();

require('./config/passport')(passport);

var app = express();

var port = process.env.PORT || 3000;

var MONGO_URI = process.env.MONGO_URI || process.env.IP + "/nightlife";
console.log('mongo uri:', MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

app.use(morgan('combined'));

app.use(session({
    secret: 'nightlifesecret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/dist'));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
        
    } else {
        res.redirect('/login');
    }
}

app.get('/*', function(req, res) {
    if (req.query.logout) {
        return res.render('index', {logout: 'true'});
    }
    if (req.query.loggedin) {
        return res.render('index', {loggedin: 'true'});
    }
    console.log(req.user);
    res.render('index');
});

app.use('/api/user', userRoutes);

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/?logout=' + encodeURIComponent('true'));
});

app.get('/auth/github',
    passport.authenticate('github')
);

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res) {
        res.redirect('/?loggedin=true');
    }
);


app.listen(port, function() {
    console.log('http://localhost:' + port);
});