const Usuario = require('../models/usuario.js');

const usuarioQueries = {
    all_usuarios: async () => {
        const usuarios = await Usuario.find({});
        return usuarios;
    },
    buscarUsuario: async (root, args) => {
        const usuario = await Usuario.find({
            $or: [
                { nombre: { $regex: args.buscar, $options: 'i' } },
                { apellido: { $regex: args.buscar, $options: 'i' } },
                { nombre_usuario: { $regex: args.buscar, $options: 'i' } },
                { correo: { $regex: args.buscar, $options: 'i' }},
            ]
        });
        return usuario;
    },
    buscarUsuarioActual: async (root, args, { usuarioActual }) => {
        if (!usuarioActual) {
          throw new Error('Usuario no autenticado');
        }
    
        // Realiza la búsqueda del usuario actual en la base de datos
        const usuario = await Usuario.findById(usuarioActual.id);
    
        if (!usuario) {
          throw new Error('No se encontró el usuario actual');
        }
    
        return usuario;
    },
    buscarUsuarioId: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        return usuario;
    },
    buscarUsuarioCorreo: async (root, args) => {
        const usuario = await Usuario.find({ correo: args.correo });
        return usuario;
    },
    
    buscarUsuarioFechaNacimiento: async (root, args) => {
        const usuario = await Usuario.find({ fecha_nacimiento: args.fecha_nacimiento });
        return usuario;
    },
    buscarUsuarioCarrera: async (root, args) => {
        if (args.carrera == 'Todas') {
            const usuario = await Usuario.find({});
            return usuario;
        }
        const usuario = await Usuario.find({ carrera: args.carrera });
        return usuario;
    },
    buscarUsuarioEstado: async (root, args) => {
        const usuario = await Usuario.find({ estado: args.estado });
        return usuario;
    },
    buscarUsuarioRol: async (root, args) => {
        const usuario = await Usuario.find({ rol: args.rol });
        return usuario;
    },
    cantidadAmigosUsuario: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        return usuario.amigos.length;
    },
    cantidadPublicacionesUsuario: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        return usuario.publicaciones.length;
    },
    cantidadComentariosUsuario: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        return usuario.comentarios.length;
    },
    cantidadMeGustaUsuario: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        return usuario.me_gusta.length;
    }
}

module.exports = { usuarioQueries };
