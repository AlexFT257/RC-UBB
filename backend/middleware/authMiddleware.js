const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuarioActual = decoded;
      next();
    } catch (error) {
      res.status(401).json({ mensaje: 'Token inválido' });
    }
  } else {
    res.status(401).json({ mensaje: 'No se proporcionó un token de autorización' });
  }
};

module.exports = authMiddleware;
