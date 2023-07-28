const meGusta = require('../models/me_gusta.js');

const meGustaQueries = {
    all_meGusta : async () => {
        const meGustas = await meGusta.find({});
        return meGustas;
    },
    buscarMeGustaId : async (root, args) => {
        const meGusta = await meGusta.findById(args.id);
        return meGusta;
    },
    buscarMeGustaTipo : async (root, args) => {
        const meGusta = await meGusta.find({ tipo: args.tipo });
        return meGusta;
    },
    buscarMeGustaUsuario : async (root, args) => {
        const meGusta = await meGusta.find({ usuario: args.usuario });
        return meGusta;
    },
    buscarMeGustaPublicacion : async (root, args) => {
        const meGusta = await meGusta.find({ publicacion: args.publicacion });
        return meGusta;
    }

}

module.exports = { meGustaQueries }