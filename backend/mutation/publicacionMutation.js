const { UserInputError } = require('apollo-server-express');
const Publicacion = require('../models/publicacion.js');

const mutations = {
    crearPublicacion: async (root, args) => {
        const publicacion = new Publicacion({ ...args });
        try {
            await publicacion.save();
            return publicacion;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarPublicacion: async (root, args) => {
        let publicacion = await Publicacion.findById(args.id);
        if (!publicacion) {
            return null;
        }
        publicacion = new Publicacion({ ...args });
        try {
            await publicacion.save();
            return publicacion;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarPublicacion: async (root, args) => {
        const publicacion = await Publicacion.findById(args.id);
        try {
            await Publicacion.findByIdAndDelete(args.id);
            return publicacion;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    }
};

module.exports = mutations;
