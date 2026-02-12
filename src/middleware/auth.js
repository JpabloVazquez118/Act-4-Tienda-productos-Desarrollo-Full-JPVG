const jwt = require('jsonwebtoken');

const verificartoken = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token' });
    }

    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificartoken;