const Publicacion = require('../models/publicacion.js');

const publicacionQueries = {
    all_publicaciones : async () => {
        const publicaciones = await Publicacion.find({});
        return publicaciones;
    },

    buscarPublicacion : async (root, args) => {
        const publicacion = await Publicacion.find({ texto: { $regex: buscar, $options: 'i' } });
        return publicacion;
    },
    buscarPublicacionId : async (root, args) => {
        const publicacion = await Publicacion.findById(args.id);
        return publicacion;
    },

    buscarPublicacionUsuario : async (root, args) => {
        const publicacion = await Publicacion.find({ usuario: args.usuario });
        return publicacion;
    },
    buscarPublicacionHora : async (root, args) => {
        const publicacion = await Publicacion.find({ hora: args.hora });
        return publicacion;
    }
}



module.exports = { publicacionQueries };
