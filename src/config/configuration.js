let Config = function () {
	return {
		dbPath: process.env.MONGODB_URL || 'mongodb://localhost/BikerStop',
	};
};

module.exports = Config();
