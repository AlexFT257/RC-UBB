const { UserInputError } = require('apollo-server-express');
const MeGusta = require('../models/me_gusta.js');

const mutations = {
    crearMeGusta: async (root, args) => {
        const meGusta = new MeGusta({ ...args });
        try {
            await meGusta.save();
            return meGusta;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarMeGusta: async (root, args) => {
        let meGusta = await MeGusta.findById(args.id)
        if (!meGusta) {
            return null;
        }
        meGusta = new MeGusta({ ...args });
        try {
            await meGusta.save();
            return meGusta;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarMeGusta: async (root, args) => {
        const meGusta = await MeGusta.findById(args.id);
        try {
            await MeGusta.findByIdAndDelete(args.id);
            return meGusta;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    }
};

module.exports = mutations;