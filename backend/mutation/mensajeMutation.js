const { UserInputError } = require("apollo-server")
const Mensaje = require("../models/mensaje.js")

const mutations = {
    crearMensaje: async (root, args) => {
        const mensaje = new Mensaje({ ...args })
        try {
            await mensaje.save()
            return mensaje
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    editarMensaje: async (root, args) => {
        let mensaje = await Mensaje.findById(args.id)
        if (!mensaje) {
            return null
        }
        mensaje = new Mensaje({ ...args })
        try {
            await mensaje.save()
            return mensaje
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    eliminarMensaje: async (root, args) => {
        const mensaje = await Mensaje.findById(args.id)
        try {
            await Mensaje.findByIdAndDelete(args.id)
            return mensaje
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    }
};
