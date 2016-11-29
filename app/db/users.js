var orm = require("../config/orm.js");


exports.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}


exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
        orm.findUser(username, function(data) {
        	console.log("Record prints: " + data.userName);
            if (data.userName === username) {
                return cb(null, data);
            }
            return cb(null, null);
        });

        
    });

}
