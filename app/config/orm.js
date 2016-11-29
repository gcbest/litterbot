var connection = require('./connection.js');

// ORM 
// =============================================================

var tableName = "cleanupSites";
var userTable = "userProfiles";

var orm = {

    // Here our ORM is creating a simple method for performing a query of the entire table.
    // We make use of the callback to ensure that data is returned only once the query is done.
    cleanups: function(callback) {
        var s = 'SELECT * FROM ' + tableName;

        connection.query(s, function(err, result) {

            callback(result);

        });
    },

    // Here our ORM is creating a simple method for performing a query of a single character in the table.
    // Again, we make use of the callback to grab a specific character from the database. 

    searchCleanups: function(name, callback) {
        var s = 'select * from ' + tableName + ' where routeName=?';

        connection.query(s, [name], function(err, result) {

            callback(result);
        });

    },

    // Here our ORM is creating a simple method for adding characters to the database
    // Effectively, the ORM's simple addCharacter method translates into a more complex SQL INSERT statement. 

    addCleanup: function(cleanup, callback) {

        var location = cleanup.location.replace(/\s+/g, '').toLowerCase();
        var description = cleanup.description.replace(/\s+/g, '').toLowerCase();

        var s = "INSERT INTO " + tableName + " (routeName, userName) VALUES (?,?)";

        connection.query(s, [location, description], function(err, result) {
            console.log("Successfully pushed to database");
            callback(result);

        });

    },

    addEvent: function(event, callback) {

        connection.query('INSERT INTO cleanupEvents (eventName, userName, addressOne, addressTwo, city, state, zipCode, cleanupDate, cleanupTime, eventDescription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [event.eventName, event.userName, event.addressOne, event.addressTwo, event.city, event.state, event.zipCode, event.cleanupDate, event.cleanupTime, event.eventDescription], function(err, result) {
            if (err) throw err;

            callback(result)
        });
    },

    addUser: function(newUser) {
        var userName = newUser.user_name.replace(/\s+/g, '').toLowerCase();
        var fname = newUser.first_name.replace(/\s+/g, '').toLowerCase();
        var lname = newUser.last_name.replace(/\s+/g, '').toLowerCase();
        var email = newUser.email.replace(/\s+/g, '').toLowerCase();
        var pwrd = newUser.password.replace(/\s+/g, '').toLowerCase();

        var queryString = "INSERT INTO " + userTable + "(userName, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)";

        connection.query(queryString, [userName, fname, lname, email, pwrd], function(err, result) {
            if (err) {
                throw err;
            }
        })
    },

    findUser: function(username, callback) {

        var queryString = "SELECT * FROM " + userTable + " WHERE (username) = ?";
        connection.query(queryString, [username], function(err, result) {
            if (err) {
                throw err;
            }

            console.log(result[0]);
            callback(result[0]);
        });

        

    }


};

module.exports = orm;
