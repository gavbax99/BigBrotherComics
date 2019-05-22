// Require model.js file  ((USED TO BE MODELS.JS))
var model = require('../models/model.js');


// Require express and build our router instance
var express = require("express");
var router = express.Router();


// Require passport for authentication
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var cel = require('connect-ensure-login');
var auth = require("../config/auth.js");


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
    function(username, password, cb) {
        auth.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
        return cb(null, user);
    });
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    auth.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});


// HTML ROUTES 
// *************************************************
router.get("/", function (req, res) {
    res.render('index', { user: req.user });
});

router.get('/bulletin', function(req, res) {
    res.render('bulletin');
});

router.post('/bulletin', 
  passport.authenticate('local', { failureRedirect: '/bulletin' }),
  function(req, res) {
    res.redirect('/admin');
});

router.get("/admin", 
    cel.ensureLoggedIn('/bulletin'),
    function(req, res) {
        res.render('admin', { user: req.user });
});


// API ROUTES 
// *************************************************
router.post("/api/newBulletin", function (req, res) {
    model.createBulletin(
            "bulletins", 
        [
            req.body.title,
            req.body.author,
            req.body.img,
            req.body.body
        ], 
            function (result) {
            var resid = result.insertId;
            res.json({ id: resid });
        });
});

router.post("/api/hideBulletin", function (req, res) {
    model.hideBulletin(
            "bulletins",
            function (result) {
            var resid = result.insertId;
            res.json({ id: resid });
        });
});


// EXPORT OUR ROUTER
module.exports = router;
