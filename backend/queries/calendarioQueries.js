const Calendario = require('../models/calendario.js');

const calendarioQueries = {
    all_eventos: async () => {
        const evento = await Calendario.find({});
        return evento || [];
    },
    buscarEventoId: async (root, args) => {
        const evento = await Calendario.findById(args.id);
        return evento;
    },
    buscarEventoUsuario: async (root, args) => {
        const evento = await Calendario.find({ creador: args.creador });
        return evento || []; 
    },
}

module.exports = { calendarioQueries };