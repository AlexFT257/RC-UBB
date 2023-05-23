const Horario = require('../models/horario');
const enviarCorreo = require('../utils/enviarCorreo');
const Usuario = require('../models/usuario');

const horarioQueries = {
    buscarHorarioUsuario: async (parent, args, context, info) => {
        const { usuario } = args;
        try {
           console.log(usuario);
            const horarios = await Horario.find({ usuario: usuario });
            return horarios;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    enviarCorreoUsuario: async (parent, args, context, info) => {
        const { usuario } = args;
        try {
            const horarios = await Horario.find({ usuario: usuario });
            const usuarioEncontrado = await Usuario.findById(usuario);
            await enviarCorreo(usuarioEncontrado, horarios);
            return horarios;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = { horarioQueries };
