
// ================ REQUIREMENTS ================
// ==============================================


// Require and set up an instance of express
var express = require("express");
var app = express();

// Require passport - our authentication middleware
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var auth = require("./config/auth.js");

// Body parser middleware
var bodyParser = require("body-parser");

// Require MORGAN - A popular HTTP request middleware 'logger' for Node.js
var morgan = require('morgan');

// Require express-session - Create a session middleware with the given options
var session = require('express-session');

// Setup .env environment file
require('dotenv').config();

// Setup dynamic PORT (default 8080)
var PORT = process.env.PORT || 42099;


// ================ SETUP PUBLIC DIR ================
// ==================================================


// Serve static content for the app from the "public" directory
app.use(express.static("public"));

// Sets the default view layout for .ejs files (index.ejs)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// ================ SETUP MIDDLEWARE ================
// ==================================================


// FOR DEV TRUST ONLY
app.set('trust proxy', 1);

//This tells express to log via morgan and morgan to log in the "combined" pre-defined format
app.use(morgan('combined'));

// parse application/x-www-form-urlencoded & application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// express-session - setting up a session using cookies?
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());


// ================ TESTING ================
// =========================================


// If running a test, set syncOptions.force to true - clearing the `testdb`
var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
};


// ================ ROUTING ================
// =========================================


// Import routes and give the server access to them
var routes = require("./controllers/controller.js");
app.use(routes);


// ================ START SERVER ================
// ==============================================


app.listen(PORT, function() { console.log("Server listening on: http://localhost:" + PORT); });





// Sets the default layout for ejs -> html
// *************************************
// var path = require("path");
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');