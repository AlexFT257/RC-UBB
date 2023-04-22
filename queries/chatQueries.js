const Usuario = require('../models/chat.js');

const chatQueries = {
    all_chats: async () => {
        const chats = await Chat.find({});
        return chats;
    },
    buscarChat: async (root, args) => {
        const chat = await Chat.findById(args.id);
        return chat;
    }
}

module.exports = { chatQueries };