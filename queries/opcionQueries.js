const Opcion = require('../models/opcion.js');

const opcionQueries = {
    all_opciones : async () => {
        const opciones = await Opcion.find({});
        return opciones;
    },
    buscarOpcion : async (root, args) => {
        const opcion = await Opcion.find({texto: {$regex: buscar, $options: 'i'}});
        return opcion;
    },
    buscarOpcionId : async (root, args) => {
        const opcion = await Opcion.findById(args.id);
        return opcion;
    },
    buscarOpcionUsuario : async (root, args) => {
        const opcion = await Opcion.find({usuario: args.usuario});
        return opcion;
    }
}

module.exports = { opcionQueries };