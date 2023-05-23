const nodemailer = require('nodemailer');

const enviarCorreo = async (usuarioEncontrado, horarios) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'edison.munoz1901@alumnos.ubiobio.cl',
      pass: 'wxgymfxpzyebloqu'
    }
  });


  const mensaje = {
    from: 'Decanatura',
    to: usuarioEncontrado.correo,
    subject: 'Recordatorio de horario',
    html: `
      <h1>Estimado/a ${usuarioEncontrado.nombre},</h1>

      <p>Te recordamos tus próximas clases:</p>
      ${horarios.map((horario) => `
        <p>
        - ${horario.asignatura}: ${horario.dia} (${horario.hora_inicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${horario.hora_termino.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}), Sala ${horario.sala}
        </p>
      `).join('')}

      <p>Esperamos verte allí a tiempo.</p>
      <p>Atentamente,</p>
      <p>El equipo de gestión de horarios</p>
    `
  };

  await transporter.sendMail(mensaje);
};

module.exports = enviarCorreo;
