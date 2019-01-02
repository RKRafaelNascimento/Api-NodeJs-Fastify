const HTTPStatus = require('http-status')

exports.defaultResponse = (data, statusCode = HTTPStatus.OK) => ({
  data,
  statusCode
})

exports.errorResponse = (
  error_message = '',
  friendly_message = '',
  statusCode = HTTPStatus.BAD_REQUEST
) =>
  exports.defaultResponse(
    {
      friendly_message,
      error: error_message
    },
    statusCode
  )
