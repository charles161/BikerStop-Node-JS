const mongoose = require("mongoose"),
	config = require("../config/configuration.js");

// Function to establish connection for the Database
exports.connectToDb = function (callback) {
	// If the connection is already established, Then don't create one more connection
	if (mongoose.connection.readyState) {
		callback(undefined, { msg: "connected", code: 200 });
		return;
	}
	// Establish the DB connection
	mongoose.connect(config.dbPath, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
	// Event for successfully connecting database
	mongoose.connection.on("connected", function () {
		callback(undefined, { msg: "connected", code: 200 });
	});
	// Event when there is an error connecting for database
	mongoose.connection.on("error", function (err) {
		callback(err);
	});
};