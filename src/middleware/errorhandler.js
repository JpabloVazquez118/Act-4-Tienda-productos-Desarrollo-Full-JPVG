const errorhandler = (err, req, res, next) => {
  console.error(err.stack);

  const statuscode = err.statuscode || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(statuscode).json({
    error: true,
    mensaje: mensaje,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorhandler;