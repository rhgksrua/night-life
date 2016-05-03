var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var userRoutes = require('./routes/api/user');
var Yelp = require('yelp');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var favicon = require('serve-favicon');
var User = require('./models/Users');
var Bars = require('./models/Bars');

/*
mongoose.set('debug', function (coll, method, query, doc) {
 console.log(coll + " " + method + " " + JSON.stringify(query) + " " + JSON.stringify(doc));
});
*/

require('dotenv').load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon(__dirname + '/dist/favicon.ico'));

require('./config/passport')(passport);


var port = process.env.PORT || 3000;

var MONGO_URI = process.env.MONGO_URI || process.env.IP + "/nightlife";
//console.log('mongo uri:', MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

app.use(morgan('combined'));

app.use(session({
    secret: 'nightlifesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 365 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/dist'));

function isLoggedInAJAX(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({error: 'authentication failure'});
    }
}

function saveTermMiddleware(req, res, next) {
    if (req.query.term) {
        req.session.term = req.query.term;
    }
    next();
}

var yelp = new Yelp({
    consumer_key: process.env.YELP_KEY,
    consumer_secret: process.env.YELP_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET
});

app.post('/addbar', isLoggedInAJAX, function(req, res) {
    var bar = req.body.bar;
    var userId = req.user._id;
    
    var query = {
        id: bar.id
    };
    var update = {
        $push: {
            going: {userId: userId}
        },
        $setOnInsert: bar,
    };
    var options = {
        upsert: true
    };
    Bars.update(query, update, options, function(err, data) {
        if (err) {
            return res.json({error: 'db error'});
        }
        return res.json({status: 'added user to bar'});
    });
});

app.post('/removebar', isLoggedInAJAX, function(req, res) {
    var userId = req.user._id;
    var barId = req.body.barId;
    console.log('---user id', req.user._id);
    console.log('---bar id', req.body.barId);
    
    var query = {
        id: barId
    };
    var update = {
        $pull: { going: { userId: userId }}
    };
    Bars.update(query, update, function(err, data) {
        if (err) return res.json({error: 'db error'});
        return res.json({status: 'removed bar from user list'});
    });
});

app.post('/userinfo', isLoggedInAJAX, function(req, res) {
    if (req.user) {
        var query = {
            going: { $elemMatch: { userId: req.user._id }}
        };
        
        Bars.find(query, function(err, data) {
            if (err) {
                return res.json({error: 'db error'});
            }
            var newData = data.map(function(bar, i) {
                // bar is not a plain js object. Need to convert it using toObject
                bar = bar.toObject();
                bar.goingNumber = bar.going.length;
                if (bar.going) {
                    delete bar.going;
                }
                return bar;
            });
            return res.json(
                {
                    username: req.user.github.username,
                    data: newData
                }
            );
        });
    } else {
        res.json({error: 'not logged in'});
    }
});

app.post('/test/test', function(req, res) {
    
    var loc = req.body.loc;
    if (!loc) {
        return res.json({error: 'no location'});
    }
    yelp.search({ term: 'bar', location: loc, limit: 5})
        .then(function(data) {
            // find number of people going to each bar
            
            var barsIds = data.businesses.map(function(business) {
                return business.id;
            });
            
            var query = {
                id: { $in: barsIds }
            };
            
            Bars.find(query, function(err, bars) {
                var injectedBars;
                if (err) {
                    return {error: 'db error'};
                }
                injectedBars = data.businesses.map(function(bar) {
                    // bars with at least one person attending.
                    
                    // bar is from yelp
                    // bars is from mongo
                    
                    for (var i = 0, len = bars.length; i < len; i++) {
                        if (bars[i]['id'] === bar.id) {
                            bar.goingNumber = bars[i].going.length;
                            break;
                        }
                    }
                    return bar;
                });
                return res.json({businesses: injectedBars});
            });
        })
        .catch(function(err) {
            console.log('error', err);
            return res.json({error: 'yelp api error'});
        })
});

app.get('/auth/github',
    saveTermMiddleware,
    passport.authenticate('github')
);

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function(req, res) {
        console.log('---- session term:', req.session.term);
        if (req.session.term) {
            return res.redirect('/?term=' + req.session.term);
        }
        return res.redirect('/');
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
    res.render('index');
});

app.use('/api/user', userRoutes);

app.get('/login', function(req, res) {
    res.render('login');
});

app.listen(port, function() {
    console.log('http://localhost:' + port);
});