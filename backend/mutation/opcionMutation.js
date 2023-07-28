const { UserInputError } = require('apollo-server-express');
const Opcion = require('../models/opcion.js');

const mutations = {
    crearOpcion: async (root, args) => {
        const opcion = new Opcion({ ...args });
        try {
            await opcion.save();
            return opcion;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarOpcion: async (root, args) => {
        let opcion = await Opcion.findById(args.id)
        if (!opcion) {
            return null;
        }
        opcion = new Opcion({ ...args });
        try {
            await opcion.save();
            return opcion;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarOpcion: async (root, args) => {
        const opcion = await Opcion.findById(args.id);
        try {
            await Opcion.findByIdAndDelete(args.id);
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    }
};

module.exports = mutations;