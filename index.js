// sparklebox
// index.js


// Requirements
//~~~~~~~~~~~~~~~~~~~~~~~
var fs = require('fs');
var express = require('express');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
var lessMiddleware = require('less-middleware');


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
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views');
app.use(lessMiddleware(__dirname + '/common'));
app.use(express.static(__dirname + '/common'));


// Ghetto routes
//~~~~~~~~~~~~~~~~~~~~~~~

var siteTitle = 'Deluxe';

// Home, /
app.get('/', function(req, res) {
	res.locals = {
		title: siteTitle,
        page: {
          subtitle:'Welcome'
        }
	}
    res.render('master');
});

// New user, /new
app.get('/new', function(req, res) {
	res.locals = {
		title: siteTitle,
        page: {
          subtitle:'We\'re Curious...'
        }
	}
    res.render('master');
});

// New user first, /new
app.get('/new', function(req, res) {
	res.locals = {
		title: siteTitle,
        page: {
          subtitle:'We\'re Curious...'
        }
	}
    res.render('master');
});

// Gfhl
//~~~~~~~~~~~~~~~~~~~~~~~
app.listen(6969);
console.log('sparkleboxDELUXE @ localhost:6969');