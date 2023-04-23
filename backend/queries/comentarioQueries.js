const Comentario = require('../models/comentario.js');

const comentarioQueries = {
    all_comentarios: async () => {
        const comentarios = await Comentario.find({});
        return comentarios;
    },
    buscarComentario: async (root, args) => {
        const comentario = await Comentario.findById(args.id);
        return comentario;
    },
    buscarComentarioId : async (root, args) => {
        const comentario = await Comentario.findById(args.id);
        return comentario;
    },
    buscarComentarioUsuario : async (root, args) => {
        const comentario = await Comentario.find({ usuario: args.usuario });
        return comentario;
    },
    buscarComentarioPublicacion : async (root, args) => {
        const comentario = await Comentario.find({ publicacion: args.publicacion });
        return comentario;
    }
}

module.exports = { comentarioQueries };