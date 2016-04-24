var express = require('express');
var morgan = require('morgan');


var app = express();

var port = process.env.PORT || 3000;

var MONGO_URI = process.env.MONGO_URI || process.env.IP + "/nightlife";

app.use(morgan('combined'));

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.render('index');
});


app.listen(port, function() {
    console.log('http://localhost:' + port);
});