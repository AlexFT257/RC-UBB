const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const idAdmin = require('../models/idAdmin.js');
const JWT_SECRET = process.env.JWT_SECRET;
const mutations = {

    crearIdAdmin: async (root, args) => {
        const idAdminTemp = new idAdmin({ ...args });
        try {
            await idAdminTemp.save();
            return idAdminTemp;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    }
    ,
    eliminarIdAdmin: async (root, args) => {
        const idAdminEliminado = await idAdmin.findByIdAndDelete(args.id);
        return idAdminEliminado;
    }
};

module.exports = mutations;
