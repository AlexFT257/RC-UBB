const { UserInputError } = require("apollo-server")
const Chat = require("../models/chat.js")

const mutations = {
    crearChat: async (root, args) => {
        const chat = new Chat({ ...args })
        try {
            await chat.save()
            return chat
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    },
    eliminarChat: async (root, args) => {
        const chat = await Chat.findById(args.id)
        try {
            await Chat.findByIdAndDelete(args.id)
            return chat
        } catch (error) {
            throw new UserInputError(error.message, {
                invalidArgs: args,
            })
        }
    }
};

module.exports = mutations