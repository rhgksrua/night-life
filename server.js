var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var userRoutes = require('./routes/api/user');
var Yelp = require('yelp');
var bodyParser = require('body-parser');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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

var yelp = new Yelp({
    consumer_key: process.env.YELP_KEY,
    consumer_secret: process.env.YELP_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET
});

app.get('/test', function(req, res) {
    res.send('test');
});

app.post('/test/test', function(req, res) {
    
    var loc = req.body.loc;
    console.log('----loc', loc, req.body);
    if (!loc) {
        return res.json({error: 'no location'});
    }
    yelp.search({ term: 'bar', location: loc, limit: 5})
        .then(function(data) {
            console.log('data', data);
            return res.json(data);
        })
        .catch(function(err) {
            console.log('error', err);
            return res.json({error: 'yelp api error'});
        })
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

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/?logout=' + encodeURIComponent('true'));
});

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




app.listen(port, function() {
    console.log('http://localhost:' + port);
});