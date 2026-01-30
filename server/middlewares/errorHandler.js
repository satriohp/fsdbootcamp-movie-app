module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = 'Email sudah terdaftar';
  } else if (err.name === 'SequelizeValidationError') {
    status = 400;
    message = err.errors[0].message;
  }

  res.status(status).json({ message });
};