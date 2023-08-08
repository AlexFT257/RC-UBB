const { UserInputError } = require('apollo-server');
const idAdmin = require('../models/idAdmin.js');

const idAdminQueries = {

    obtenerIdAdmin: async (root, args) => {
        const idAdminObtenido = await idAdmin.findById(args.id);
        return idAdminObtenido;
    },
    all_idAdmin: async () => {
        const idAdminsObtenidos = await idAdmin.find({});
        return idAdminsObtenidos;
    },
    verifyAdmin: async (root, args) => {
        const idAdminObtenido = await idAdmin.findOne({ idAdmin: args.idAdmin });
        return idAdminObtenido;
    }
}

module.exports = { idAdminQueries };
