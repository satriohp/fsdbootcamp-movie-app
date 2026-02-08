const multer = require('multer');

module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  if (err.name === 'ZodError') {
    status = 400;
    message = 'Validation Error';
    errors = (err.issues || err.errors || []).map(e => e.message);
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = err.errors[0].message || 'Email sudah terdaftar';
  } else if (err.name === 'SequelizeValidationError') {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Token tidak valid';
  } else if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token sudah kadaluarsa';
  } else if (err instanceof multer.MulterError) {
    status = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Ukuran file terlalu besar. Maksimal 5MB.';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'Field name untuk upload harus "file".';
    } else {
      message = `Upload error: ${err.message}`;
    }
  }

  if (status === 500) {
    console.error('FATAL ERROR:', err);
  }

  res.status(status).json({
    success: false,
    message,
    ...(errors.length > 0 && { errors }),
  });
};