const nodemailer = require("nodemailer");

async function sendPasswordResetEmail(email, temporalKey) {
  // Configurar el transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
  auth: {
    user: 'bvalenzuelamelo6@gmail.com',
    pass: 'tvls tdte auuw hvrk',
  },
  });

  // Configurar el contenido del correo electrónico
  const mailOptions = {
    from: "automatizado@alumnos.ubiobio.cl",
    to: email,
    subject: "Restablecimiento de contraseña",
    text: `Se ha solicitado un restablecimiento de contraseña. Utilice la siguiente clave temporal: ${temporalKey}`,
  };

  // Enviar el correo electrónico
  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendPasswordResetEmail,
};
