module.exports = (message, errorResponse = {}) => ({
 message,
 status: 'error',
 response: errorResponse
})