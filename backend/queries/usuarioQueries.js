const Usuario = require('../models/usuario.js');
const { io } = require('socket.io-client');
const JWT_SECRET = "SUPER_HYPER_MEGA_PALABRA_SECRETA";
const socket = io('http://localhost:3001/', { transports: ['websocket'] });
const jwt = require('jsonwebtoken');

const usuarioQueries = {
    all_usuarios: async () => {
        const usuarios = await Usuario.find({});
        return usuarios;
    },
    logOut: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        socket.emit('disconnect friend', usuario.id, usuario.amigos.map((friend)=> friend.toString() ));
        return usuario;
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
    buscarUsuarioId: async (root, args) => {
        const usuario = await Usuario.findById(args.id);
        console.log("BUSCANDO USUARIO",usuario);
        return usuario;
    }
    ,buscarUsuarioCorreo: async (root, args) => {
        const usuario = await Usuario.find({ correo: args.correo });
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
    descUsuario: async(root,args)=>{
     
        try {
            // Verificar la validez del token y decodificarlo
            const decoded = jwt.verify(args.token, 'SUPER_HYPER_MEGA_PALABRA_SECRETA'); // Reemplaza 'clave-secreta' con tu clave secreta real
            const usuario = await Usuario.findById(decoded.id);
            
              // Devolver los datos del usuario extraídos del token
            return usuario;
          } catch (error) {
            throw new Error('Token inválido o expirado');
          }

    },

    
    gruposUsuario: async (root, args) => {
        const usuario = await Usuario.findById(args.id).populate('grupos');
        const grupos = usuario.grupos;
        console.log("GRUPOS",grupos);
        return grupos;
    }
}

module.exports = { usuarioQueries };
