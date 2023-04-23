const { UserInputError } = require("apollo-server")
const Comentario = require("../models/comentario.js")

const mutations = {
    crearComentario: async (root, args) => {
        const comentario = new Comentario({ ...args })
        try {
            await comentario.save()
            return comentario
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    editarComentario: async (root, args) => {
        let comentario = await Comentario.findById(args.id)
        if (!comentario) {
            return null
        }
        comentario = new Comentario({ ...args })
        try {
            await comentario.save()
            return comentario
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    eliminarComentario: async (root, args) => {
        const comentario = await Comentario.findById(args.id)
        try {
            await Comentario.findByIdAndDelete(args.id)
            return comentario
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    }
};

module.exports = mutations