const nodemailer = require('nodemailer');

const enviarCorreo = async (correoDestino, horario) => {
    console.log(correoDestino)

  // Crear un objeto de transporte para enviar el correo electrónico
  const transporter = nodemailer.createTransport({
    // Configuración del servicio de correo electrónico (Gmail en este caso)
    service: 'gmail',
    auth: {
      user: 'edison.munoz1901@alumnos.ubiobio.cl',
      pass: 'wxgymfxpzyebloqu'
    }
  });

  // Configurar el mensaje de correo electrónico
  const mensaje = {
    from: 'Decanatura',
    to: correoDestino.correo,
    subject: 'Recordatorio de horario',
    html:`
    <h1>Estimado/a ${correoDestino.nombre}, </h1>

    <p>Te recordamos que tienes una clase el día ${horario.dia} de ${horario.hora_inicio} hasta ${horario.hora_termino} para la asignatura de ${horario.asignatura}, (${horario.acronimo}) en la sala ${horario.sala}.</p>
    
    <p>Esperamos verte allí a tiempo.</p>
    
    <p> Atentamente,</p>
    <p>  El equipo de gestión de horarios </p>`  };

  // Enviar el correo electrónico
  await transporter.sendMail(mensaje);
};

module.exports = enviarCorreo;