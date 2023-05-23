const { UserInputError } = require("apollo-server")
const Chat = require("../models/chat.js")
const Mensaje = require("../models/mensaje.js")


const mutations = {
    crearChat: async (_, { usuarios, nombre, mensajes }) => {
        try {
            const chat = new Chat({
                usuarios: usuarios,
                nombre: nombre
            });

            const mensaje = new Mensaje({ mensajes }); //PUEDE FGALLAR POR NO SER ...mensajes o quitar las llaves

            chat.mensajes.push(mensaje);

            await Promise.all([chat.save(), mensaje.save()]);
            
            await Usuario.updateMany(
                { _id: { $in: usuarios } },
                { $push: { chats: chat._id } }
            );


            return chat;
        } catch (error) {
            console.log('Error creating chat with mensaje:', error);
            throw error;
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
    },

    addMensaje: async (_, { chatId, mensaje }) => {
        try {
            // Create a new mensaje document
            const newMensaje = new Mensaje({
                fecha: mensaje.fecha,
                usuario: mensaje.usuarioId,
                texto: mensaje.texto,
                imagenes: mensaje.imagenes,
                visto: mensaje.visto
            });

            // Save the new mensaje document
            await newMensaje.save();

            // Find the chat by chatId and update the mensajes array
            const chat = await Chat.findById(chatId);
            if (!chat) {
                throw new Error('Chat not found');
            }

            chat.mensajes.push(newMensaje);

            // Save the updated chat document
            await chat.save();

            return chat;
        } catch (error) {
            console.log('Error adding message:', error);
            throw error;
        }
    },
    addUsuariosToChat: async (_, { chatId, usuarioIds }) => {
        try {
            // Find the chat by chatId
            const chat = await Chat.findById(chatId);
            if (!chat) {
                throw new Error('Chat not found');
            }

            // Add the usuarioIds to the chat's usuarios field
            chat.usuarios = [...chat.usuarios, ...usuarioIds];

            // Save the updated chat document
            await chat.save();

            return chat;
        } catch (error) {
            console.log('Error adding usuarios to chat:', error);
            throw error;
        }
    }

};

module.exports = mutations