module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = err.errors[0].message || 'Email sudah terdaftar';
  } else if (err.name === 'SequelizeValidationError') {
    status = 400;
    message = err.errors[0].message;
  } 
  
  else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Token tidak valid';
  } else if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token sudah kadaluarsa';
  }

  if (status === 500) {
    console.error('FATAL ERROR:', err);
  }

  res.status(status).json({ 
    success: false,
    message 
  });
};