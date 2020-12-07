const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  // Error handling
  let { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    statusCode = 400;
    message = 'Invalid input. Data validation error.';
  }
  res.status(statusCode).send({
    message: (statusCode === 500) ? 'Server error' : message,
  });
};
