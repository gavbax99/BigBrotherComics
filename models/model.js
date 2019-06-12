// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax - formats "?" better: ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
};

// MODEL Object with MySQL methods
// =============================
var model = {

    getBulletin: (cb) => {

        var queryString = `SELECT * FROM bigbrot1_db.bulletins ORDER BY posted DESC LIMIT 1;`;

        connection.query(queryString, function (err, res) {
            if (err) throw err;
            // Callback
            cb(res);
        });
    },

    createBulletin: (tableName, vals, cb) => {

        var queryString = `INSERT INTO ${tableName} SET ?`;

        connection.query(queryString, {title: vals[0], author: vals[1], imgurl: vals[2], body: vals[3]}, function (err, res) {
            if (err) throw err;
            // Callback
            cb(res);
        });
    },

    hideBulletin: (tableName, cb) => {

        var queryString = `INSERT INTO ${tableName} SET ?`;

        connection.query(queryString, {hiddenbulletin: 1}, function (err, res) {
            if (err) throw err;
            // Callback
            cb(res);
        });
    }

};
// =============================

// Export the orm object
module.exports = model;