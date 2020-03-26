function sendResponse(res, statusCode, jsonData) {
 res.status(statusCode)
 res.json(jsonData)
}

module.exports.sendResponse = sendResponse