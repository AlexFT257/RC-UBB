const calendario = require('../models/calendario.js');
const { UserInputError } = require('apollo-server-errors');

const mutations = {
    crearEvento: async (root, args) => {
        try {
            const evento = new calendario({ ...args })
            await evento.save()
            return evento
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args
            })
        }
    },
    editarEvento: async (root, args) => {
        try {
            const evento = await calendario.findById(args.id)
            if( !evento ) {
                return null
            }
            evento.titulo = args.titulo
            evento.fecha_inicio = args.fecha_inicio
            evento.fecha_fin = args.fecha_fin
            evento.descripcion = args.descripcion
            evento.usuario = args.usuario
            await evento.save()
            return evento
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args
            })
        }
},
    eliminarEvento: async (root, args) => {
        const evento = await calendario.findById(args.id)
        try {
            await calendario.findByIdAndDelete(args.id)
            return evento
        }catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args
            })
        }
},
}

module.exports = mutations;