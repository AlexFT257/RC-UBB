const Horario = require('../models/horario');
const { UserInputError } = require('apollo-server-errors'); // importar la excepción de error de entrada de usuario


const mutations = {
    crearHorario: async (root, args) => {
        const horario = new Horario({ ...args });
        try {
            await horario.save();
            return horario;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarHorario: async (root, args) => {
        try {
            const horario = await Horario.findByIdAndUpdate({ _id: args.id }, { ...args }, { new: true });
            return horario;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarHorario: async (root, args) => {
        try {
            const horario = await Horario.findByIdAndRemove({ _id: args.id });
            return horario;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    }
};
module.exports = mutations;