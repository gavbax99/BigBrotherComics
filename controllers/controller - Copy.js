// Require model.js file  ((USED TO BE MODELS.JS))
var model = require('../models/model.js');

// Require express and build our router instance
var express = require("express");
var router = express.Router();

// HTML ROUTES 
// *************************************************
router.get("/", function (req, res) {
    res.render("index");
});

router.get("/admin", function (req, res) {
    res.render("test.html");
});

// API ROUTES 
// *************************************************
router.post("/api/nameFromMainJS", function (req, res) {
    model.create(
            "taable_name", 
        [
            'captain_name',
            'ship_name'
        ], 
        [
            req.body.captain_name,
            req.body.ship_name
        ], 
            function (result) {
            var resid = result.insertId;
            idHolder = resid;
            res.json({ id: resid });
        });
});

// EXPORT OUR ROUTER
module.exports = router;
