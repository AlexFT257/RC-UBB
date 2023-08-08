const { UserInputError } = require('apollo-server');
const reporte = require('../models/reporte.js');

const reporteMutation = {

    crearReporte: async (root, args) => {
        const { titulo, descripcion, fecha, usuario, tipo, estado, id_elemento } = args;

        const nuevoReporte = new reporte({
            titulo,
            descripcion,
            usuario,
            fecha,
            tipo,
            estado,
            id_elemento,
        });

        try {
            await nuevoReporte.save();
            return nuevoReporte;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    editarReporte: async (root, args) => {
        try {
            let editreporte = await reporte.findByIdAndUpdate({ _id: args.id }, { ...args });
            return editreporte;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
    eliminarReporte: async (root, args) => {
        try {
            const deletedreporte = await reporte.findByIdAndRemove({ _id: args.id });
            return deletedreporte;
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            });
        }
    },
}


module.exports = reporteMutation;