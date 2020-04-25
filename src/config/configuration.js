let Config = function () {
	return {
		dbPath: process.env.NODE_ENV == 'test' ? "mongodb://localhost/BikerStopTest" : process.env.MONGODB_URL || 'mongodb://localhost/BikerStop',
	};
};

module.exports = Config();
