// sparklebox
// index.js


// Requirements
//~~~~~~~~~~~~~~~~~~~~~~~
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var lessMiddleware = require('less-middleware');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect DB
//~~~~~~~~~~~~~~~~~~~~~~~
mongoose.connect('mongodb://localhost/deluxe1');

// Models
//~~~~~~~~~~~~~~~~~~~~~~~
var Place = require('./models/place');

// Hi Express!
//~~~~~~~~~~~~~~~~~~~~~~~
var app = express();  


// Register partials
//~~~~~~~~~~~~~~~~~~~~~~~
//initial
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/templates');
hbs.registerPartials(__dirname + '/views/content');
//watch
hbsutils.registerWatchedPartials(__dirname + '/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/views/templates');
hbsutils.registerWatchedPartials(__dirname + '/views/content');

// Set up views
//~~~~~~~~~~~~~~~~~~~~~~~
// View Engine
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views');
// LESS
app.use(lessMiddleware(__dirname + '/common'));
// Static Dir
app.use(express.static(__dirname + '/common'));
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Ghetto routes
//~~~~~~~~~~~~~~~~~~~~~~~
var router = express.Router();

// Home, /
app.get('/', function(req, res) {
	res.locals = {
		title: 'Deluxe',
        page: {
          subtitle:'Welcome'
        }
	}
    res.render('master');
});

// Gfhl
//~~~~~~~~~~~~~~~~~~~~~~~
app.listen(6969);
console.log('sparkleboxDELUXE @ localhost:6969');