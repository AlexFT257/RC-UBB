const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const authMiddleware = (req, res, next) => {
  const value = req.headers.authorization;
  console.log("el valor del encabezado Authorization:", value);

  const usuarioActual = verifyToken(value);
  console.log("usuario actual:", usuarioActual);

  if (usuarioActual) {
    req.usuarioActual = usuarioActual;
  }

  next();
};

module.exports = auth;
