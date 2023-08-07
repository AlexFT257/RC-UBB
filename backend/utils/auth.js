const jwt = require('jsonwebtoken');

const auth = (value) => {
  try {
    // Verificar la validez del token y decodificarlo
    const decoded = jwt.verify(value, 'SUPER_HYPER_MEGA_PALABRA_SECRETA'); // Reemplaza 'clave-secreta' con tu clave secreta real

    // Devolver los datos del usuario extraídos del token
    return decoded.usuario;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

module.exports = { auth };
